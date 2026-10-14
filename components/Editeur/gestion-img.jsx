"use client"
import Image from "next/image"
import { useTransfereDonnees } from "../../context/transfere-donnees-context"
import { useRef, useState, } from "react"
import { supabase } from "@/utils/supabase/client"
import verifierTailleImageAction from "@/actions/verifier-taille-image"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"

 
export default function GestionImage({functionAfficherBlocGestionImg,afficherGestionImg}){

  const {data,setData}= useTransfereDonnees()
  const [erreurFicher,setErreurFicher]=useState("")
  const inputPhotoRef=useRef(null)
  const {data:session, status} = useSession()
  const params = useParams()
  const slug=params.slug
  
  const handleAddImg=()=>{
    inputPhotoRef.current.click()
  }




 const handleImg = async (e) => { // 1. On passe handleImg en async
  const fichier = e.target.files[0];
  if (!fichier) return;

  // 3. Appel de la Server Action (on l'attend avec await)
  const tailleValide = await verifierTailleImage(fichier);
  if (!tailleValide) return; // Si c'est invalide, on arrête tout ici

  // 4. Création de l'URL temporaire (pour affichage immédiat côté client)
  const urlTemporaire = URL.createObjectURL(fichier);
  setData(prev => ({
    ...prev,
    imgProfil: { ...prev.imgProfil, srcPreview: urlTemporaire }
  }));

  if(status !=="authenticated") return
  // 5. Génération du chemin et envoi sur Supabase
  const chemin = `avatars/${session.user.id}/${slug}/photo.jpg`;
  await stockeImageSupabase(fichier, chemin);
};


// --- FONCTIONS CORRIGÉES ET SORTIES DU CORPS DE HANDLEIMG ---

async function verifierTailleImage(fichier) {

  try {
    const reponse = await verifierTailleImageAction(fichier);
    if (!reponse.success) {
      setErreurFicher(reponse.error);
      return false; // L'image n'est PAS valide
    }
    return true; // L'image EST valide
  } catch (error) {
    console.error("Erreur vérification taille:", error);
    setErreurFicher("Impossible de vérifier la taille de l'image.");
    return false;
  }
}

async function stockeImageSupabase(fichier, chemin) {
  try {
    const { data: uploadData, error } = await supabase.storage
      .from("images-cv-edition")
      .upload(chemin, fichier, {
        upsert: true,
        contentType: fichier.type,
      });

    if (error) {
      console.error("Erreur d'upload Supabase:", error.message);
      setErreurFicher("Échec de l'envoi de l'image.");
      return;
    }

    // Générer l'URL publique
    const { data: urlData } = supabase.storage
      .from("images-cv-edition")
      .getPublicUrl(uploadData.path);

    const urlPhoto = urlData.publicUrl;
    if (!urlPhoto) return;

    // Enregistrer l'URL finale provenant de la base de données
    setData(prev => ({
      ...prev,
      imgProfil: { ...prev.imgProfil, srcDb: urlPhoto }
    }));
    
  } catch (error) {
    console.error("Erreur stockage Supabase:", error);
  }
}






  return(
       <section
            className={`${!afficherGestionImg && "transform translate-x-[-100%]"} duration-500 bg-white p-[20px]  h-full w-[80%] shadow-[1px_0px_11px_0px_#adacac] absolute z-10 inset-0 `}
            >
              <div className="flex flex-col items-center gap-15">
          
                  <div  className="flex flex-col items-center">
                      <div onClick={handleAddImg} className="border-2 border-dashed border-[#a9a9a9] w-[70px] cursor-pointer">
                        <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} alt="avatar" width={70} height={70}/>
                      </div>
                      <span className="#555252">(Cliquez pour importer une image) <br /> L'image ne dois pas depasser 2 Mo.</span>
                      {erreurFicher !== "" && <span className="text-red-600">{erreurFicher}</span>}
                  </div>
                  <input onChange={handleImg} ref={inputPhotoRef} type="file" hidden/>

                  <div className="w-full">
                    <span className="text-[1.3rem]">Taille</span>
                    <div className="relative w-full">
                        <input defaultValue={data.tailleImg} onChange={(e)=>{setData(prev=>({...prev,tailleImg:e.target.value}))}} className="w-full  shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="number" placeholder="Taille" />
                    </div>
                  </div>

                  <div className="w-full">
                      <span className="text-[1.3rem]">Coins arrondis</span>
                        <div >
                          <input defaultValue={data.borderRadiusImg} onChange={(e)=>{setData(prev=>({...prev,borderRadiusImg:e.target.value}))}} className="w-full border border-1 border-gray-200 outline-none px-[10px] py-[5px] rounded-[7px] bg-[#f5f5f5] text-[1.2rem] font-semibold" type="number" />
                        </div>

                    </div>


                    <div className="w-[90%] absolute bottom-[20px]">
                      <button onClick={()=>{functionAfficherBlocGestionImg(false)}} className="w-full cursor-pointer border border-1 border-gray-200 px-[10px] py-[5px] rounded-[7px] text-white bg-red-500 text-[1.3rem] font-semibold" >Fermer</button>
                    </div>

              </div>
   </section>
  )
}
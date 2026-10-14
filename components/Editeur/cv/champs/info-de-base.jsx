"use client"

import {CircleOff,Circle,EyeOff,Settings2,UserPen,Eye} from "lucide-react"
import Image from "next/image";
import  {   useRef, useState  }  from  'react' ;
import Champ_personnalise from "@/components/Editeur/cv/champs/champs-perso/champ-perso-infoDeBase"
import GestionImage from "../../gestion-img.jsx";
import { useTransfereDonnees } from "../../../../context/transfere-donnees-context.jsx";
import { useOnClickOutside } from "usehooks-ts";



export default function InfosDeBase(){

  const {data,setData}= useTransfereDonnees()
  const [instanceChampPers, setInstanceChampPers] = useState([]);
  const [afficherGestionImg,setAfficherGestionImg]=useState(false);
  const BlocGestionImageRef=useRef(null)

  const [seeBlocInfosBase,setSeeBlocInfosBase]=useState(false)

    const handleBlocInfosBase=()=>{
    setSeeBlocInfosBase(prev=>!prev)
  }
  


  const handleAffichageGestionImage=()=>{
    setAfficherGestionImg(prev=>!prev)
  }

  

   


  useOnClickOutside(BlocGestionImageRef, () => {
    if (afficherGestionImg) setAfficherGestionImg(false);
  });

   const addinstanceChampPers=()=>{
      const NewId=Date.now()
      setInstanceChampPers([...instanceChampPers,NewId])
      setData(prev=>({...prev,champPerso:[...prev.champPerso,{id:NewId,iconeWeb:"",iconePdf:"",content:"",url:""}]}))
   }

   const deleteInstanceChampPers=(id_delete)=>{
      setInstanceChampPers(instanceChampPers.filter(id=> id !== id_delete ))
      setData(prev=>({...prev,champPerso:[...prev.champPerso.filter(el=>el.id !== id_delete)]}))
   }


  return(
    
    <>
      <div className="rounded-[10px] flex flex-col gap-[30px] border boder-1 border-gray-200 p-[10px]">

          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-[10px]">
                <UserPen color="#000000"/>
                <span className="text-[1.8rem] font-medium">Informations de base</span>
              </div>
              {seeBlocInfosBase ? <EyeOff onClick={handleBlocInfosBase} size={20} className="cursor-pointer" color="#5e5e5e"/> : <Eye onClick={handleBlocInfosBase} size={20} className="cursor-pointer" color="#5e5e5e"/> }
          </div>

          <div className={`${seeBlocInfosBase ? "block" : "hidden"}`}>

            <div className="flex flex-col gap-10">

              <div ref={BlocGestionImageRef}>
              {<GestionImage functionAfficherBlocGestionImg={setAfficherGestionImg} afficherGestionImg={afficherGestionImg} />}

                <div>
                  <span className="text-[1.8rem]">photo</span>
                  <div className="rounded-[10px] flex justify-between items-start border boder-1 border-gray-200 p-[10px]">
                    <Image onClick={handleAffichageGestionImage} className="cursor-pointer duration-300 hover:shadow-[0px_0px_4px_0px_gray]"  src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} alt="avatar" width={70} height={70}/>
                    <div className="flex gap-5 items-center">
                      <Settings2 onClick={handleAffichageGestionImage} size={20} className="cursor-pointer" color="#5e5e5e"/>
                      {data.imgProfil.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,imgProfil:{...prev.imgProfil,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                        <Circle onClick={()=>setData(prev=>({...prev,imgProfil:{...prev.imgProfil,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>}  
                    </div>
                  </div>
                </div>
              </div>




              <div>
                <div className="flex flex-col gap-15 ">
                  <div className="flex items-center gap-10">
                    <span className="font-medium text-[1.3rem]">Nom</span>
                    <input  defaultValue={data.nom} onChange={(e)=>setData(prev=>({...prev,nom:e.target.value}))} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                  </div>

                  <div className="flex items-center gap-10">
                    <span className="font-medium text-[1.3rem]">Poste</span>
                    <input  defaultValue={data.poste}  onChange={(e)=>setData(prev=>({...prev,poste:e.target.value}))} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                  </div>


                  <div className="flex flex-col gap-5">
                    <span className="font-medium text-[1.3rem]">Profil</span>
                    <textarea  defaultValue={data.profil}  onChange={(e)=>setData(prev=>({...prev,profil:e.target.value}))} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[200px] border border-1 border-gray-200 outline-[#5c5792]"></textarea>
                  </div>

                  <div className="flex gap-10 items-center">
                    <div className="text-[17px]"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                      <path d="M0 0h20v20H0z" fill="none" />
                      <path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                      </svg>
                    </div>
                    <span className="font-medium text-[1.3rem]">Email</span>
                    <input defaultValue={data.email} onChange={(e)=>setData(prev=>({...prev,email:e.target.value}))} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                  </div>

                  <div className="flex gap-10 items-center">
                      <div className="text-[17px]">      
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                      </svg>
                    </div>
                    <span className="font-medium text-[1.3rem]">Telephone</span>
                    <input defaultValue={data.phone}  onChange={(e)=>setData(prev=>({...prev,phone:e.target.value}))} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                  </div>

                  <div className="flex gap-10 items-center">
                      <div className="text-[17px]">      
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                      </svg>
                    </div>
                    <span className="font-medium text-[1.3rem]">Adresse</span>
                    <input defaultValue={data.adresse} onChange={(e)=>setData(prev=>({...prev,adresse:e.target.value}))} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                  </div>


                  <div>
                    <span className="text-[1.8rem]">Champs personnalisés</span>
                    <div className="border border-1 border-gray-200 p-[10px] flex flex-col gap-15 rounded-[5px]">
                        {instanceChampPers.map(id=>{
                          return <Champ_personnalise key={id} id={id} functionDelete={deleteInstanceChampPers}/>
                        })}

                        <button onClick={addinstanceChampPers} className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter un champ</button>
                    </div>
                  </div>

                </div>
                </div>

            </div>

          </div>

      </div>
    </>
  )
}


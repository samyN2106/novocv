"use client"
import Header from "@/components/Editeur/Header"
import InfosDeBase from "@/components/Editeur/cv/champs/info-de-base"
import CompetencesLanguesLoisirs from "@/components/Editeur/cv/champs/competences-langues-loisirs"
import "@/app/styles/style-barre-progress.css"
import {ArrowLeft,ArrowRight,ShieldAlert,CircleX} from "lucide-react" 
import { useTransfereDonnees } from "@/context/transfere-donnees-context"
import { Suspense, useEffect, useState,use, useRef } from "react"
import Experiences from "@/components/Editeur/cv/champs/experience"
import Formations from "@/components/Editeur/cv/champs/formation"
import Projet from "@/components/Editeur/cv/champs/projet"
import useWindowSize from "@/hooks/useWindowSize"
import { useSession } from "next-auth/react"
import CvAutoScaledContainerEditeur from "@/components/Editeur/cvAutoScaledContainerEditeur"
import { motion } from "motion/react"
import Loading from "@/components/loading"
import Chat from "@/components/Editeur/chat"
import NewSection from "@/components/Editeur/cv/champs/champs-perso/newSection"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Template from "@/components/Editeur/cv/TemplateChoose"

export default function EditeurComponent({ slug }){

  const {data,setData,dataLoaded}=useTransfereDonnees() 
  const [isPending,setIsPending]=useState(true)

  const [errorTimeout, setErrorTimeout] = useState(false);

  useEffect(()=>{
  if(data && dataLoaded){
    setIsPending(false)
  }else{
    setIsPending(true)
  }
},[data])



  const [seeBlocEdition,setSeeBlocEdition]=useState(false)
  
  const {widthScreen} = useWindowSize()
   const [seeBlockAlert,setSeeBlockAlert]=useState(true)


   const { status} = useSession()

   const hasInitialized = useRef(false);
  

    useEffect(()=>{
      if(widthScreen>=900){
      setSeeBlocEdition(false)
    }else{
      setSeeBlocEdition(true)
    }
    },[widthScreen])


  useEffect(()=>{
    if(status === "authenticated" ){
      setSeeBlockAlert(false)
    }
  },[status])



const [itemsSection, setItemsSection] = useState([]);

const componentRegistry = {
  experiences: Experiences,
  projets: Projet,
  formations: Formations
};


useEffect(()=>{


const componentToStringRegistry = new Map([
  [Experiences, "experiences"],
  [Projet, "projets"],
  [Formations, "formations"]
]);

  
  const tableForDatabase = itemsSection.map(el => {
    // Si l'élément a un composant, on cherche son nom textuel dans la Map
    if (el.component) {
      const stringName = componentToStringRegistry.get(el.component);
      return { 
        id: el.id, 
        component: stringName // Sécurité au cas où le composant n'est pas reconnu
      };
    } 
    
    // Si c'est une "newSection" (sans composant encore assigné)
    return { 
      id: el.id, 
      type: el.type 
    };
  });
 

  if(tableForDatabase.length ===0 )return

  setData(prev=>({...prev,ordreSectionsSecondaires:tableForDatabase}))

},[itemsSection])



useEffect(()=>{
  if(!data || hasInitialized.current)return
  
   const newSections = data.ordreSectionsSecondaires.map(el => {
    const Component = componentRegistry[el.component];
    if (Component) {
      return { id: el.id, component: Component };
    } else {
      return { id: el.id, type: "newSection" };
    }
  });


setItemsSection(newSections);
hasInitialized.current = true;

},[data])





function deleteSection(idSection) {
  setData(prev => ({
          ...prev,
          newsSections: prev.newsSections.filter(section => section.id !== idSection)
        }));

  setItemsSection((prev) =>
    prev.filter((section) => section.id != idSection)
  );
};


function handleDragEnd(result) {
  // Vérifier qu'un élément a bien été déposé
  if (!result.destination) return;

  // Copier le tableau actuel
  const next = [...itemsSection];

  // Retirer l'élément de son ancienne position
  const [moved] = next.splice(result.source.index, 1);

  // L'insérer à sa nouvelle position
  next.splice(result.destination.index, 0, moved);

  // Mettre à jour l'état React
  setItemsSection(next);
}


    const addNewSection=()=>{
      const id=Date.now()
      setData(prev=>({...prev,newsSections:[...prev.newsSections,{
        id:id,nom:"",seeInstance:true,champs:[{
          id:Date.now(),seeInstance:true,organisme:"",plateforme:"",intitule:"",
          dateDebut:"",dateFin:""
        }]
      }]}))
      setItemsSection(prev=>([...prev,{id:String(id),type:"newSection"}]))
    }


useEffect(() => {
  const timeout = setTimeout(() => {
    if (!data && !dataLoaded) {
      setErrorTimeout(true);
    }
  }, 7000);

  return () => clearTimeout(timeout);
}, [data, dataLoaded]);





  if(isPending){
    if(!errorTimeout){
      return  <div className="flex flex-col items-center justify-center h-screen">
      <Loading/>
      <p className="text-xl mt-[10px]">Preparation des donnees............</p>
    </div>}else{
       return  <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl mt-[10px] text-center text-red-600">Erreur de recuperation des donnees........... <br/>Veuillez reessayer !</p>
    </div>

    }
    }



    
    return(

      <div className="flex flex-col h-screen">
          <Header/>
          <section className="flex-1 relative">
              {seeBlockAlert && <motion.div   initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }} className="flex relative rounded-[10px] border border-1 border-[#ffa600] items-center bg-[#f9e4bd] text-[15px] p-[12px] gap-5">
                    <ShieldAlert className="shrink-0" size={35} color="#ffa600" />
                    <p>Connectez vous ou creez un compte afin que vos données soient sauvegardées lorsque vous quitterez la page</p>
                    <CircleX onClick={()=>setSeeBlockAlert(false)} color="#a76c00" className="absolute right-0 top-[-12px] cursor-pointer " />
              </motion.div>}


              {/* <Chat/> */}



            <div className="flex">

                    <div className={`${seeBlocEdition ? "transform translate-x-[-100%]" : ""} duration-400 w-[35vw] max-[900px]:shadow-[7px_9px_16px_0px_#d3d3d3] max-[900px]:w-[80%] max-[530px]:w-[90%] max-[900px]:absolute max-[900px]:z-10 bg-white  border-r relative border-gray-200 p-[20px] bloc`} style={{height: "calc(100vh - 55px)"}}>
                        <div onClick={()=>setSeeBlocEdition(prev=>!prev)} className="bg-[#5c5792] max-[900px]:block hidden absolute right-[-30px] px-[7px] py-[13px] rounded-[0_10px_10px_0] top-[50%] transform translate-y-[-50%] ">
                          {
                            seeBlocEdition ? <ArrowRight className="cursor-pointer" color="#ffffff" size={18} /> : <ArrowLeft className="cursor-pointer" color="#ffffff" size={18} />
                          }
                        </div>
                        <div className="h-full overflow-y-auto  w-full flex flex-col gap-[40px] bloc">
                              <InfosDeBase/>
                            <CompetencesLanguesLoisirs/>  


                            
                          <DragDropContext onDragEnd={handleDragEnd}>
    
                            <Droppable droppableId="sections">


                            {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="w-full flex flex-col gap-[40px] "
                            >

                                {itemsSection?.map((item, index) => {
                                  if(!item.type){
                                    const Component = item.component;
                                    return (
                                              <Draggable
                                                  key={item.id}
                                                  draggableId={item.id}
                                                  index={index}
                                                >
                                                  {(drag) => (
                                                    <div
                                                      ref={drag.innerRef}
                                                      {...drag.draggableProps}
                                                      {...drag.dragHandleProps}
                                                      className="w-full"
                                                    >
                                                      <Component/>
                                                    </div>
                                                  )}
                                              </Draggable>
                                          );
                                        }else{
                                          
                                            return (
                                              <Draggable
                                                  key={item.id}
                                                  draggableId={item.id}
                                                  index={index}
                                                >
                                                  {(drag) => (
                                                    <div
                                                      ref={drag.innerRef}
                                                      {...drag.draggableProps}
                                                      {...drag.dragHandleProps}
                                                      className="w-full"
                                                    >
                                                      <NewSection deleteSection={deleteSection} sectionId={item.id}/>
                                                    </div>
                                                  )}
                                              </Draggable>
                                          )
                                        }
                                    })}


                                    {provided.placeholder}
                                  </div>
                                )}

                            </Droppable>

                            </DragDropContext>  


                                  <button onClick={addNewSection}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter une section</button>
              
                        </div>  
                    </div>

                    <div style={{height: "calc(100vh - 55px)"}}   className="bloc max-[900px]:w-full  w-[65vw] bg-[#e8e8e8] relative overflow-y-auto">
                      <CvAutoScaledContainerEditeur >
                        <Suspense fallback={<Loading/>}>
                          <Template slug={slug} />
                        </Suspense>
                      </CvAutoScaledContainerEditeur>
                    </div> 

              </div>
            </section>
          </div>
      
    )

  
    

  
    
}
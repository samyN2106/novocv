"use client"


import { useEffect, useRef, useState } from "react"
import { useTransfereDonnees } from "../../../../context/transfere-donnees-context"
import {EyeOff,Eye,CircleOff,Circle,Toolbox} from "lucide-react"
import ChampPersonnaliseCompetenceLangue from "@/components/Editeur/cv/champs/champs-perso/champPerso-Competences-Langue"
import dynamic from 'next/dynamic';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const EditeurQuillSansSSR = dynamic(
  () => import('@/components/Editeur/quill-editeur'),
  { 
    ssr: false,
  }
);



  function Interets(){
      const {data,setData}= useTransfereDonnees()

      const [valeurChampInteret,setValeurChampInteret]=useState(data.interets.content)


       useEffect(()=>{
        setData(prev=>({...prev,interets:{...prev.interets,content:valeurChampInteret}}))
      },[valeurChampInteret])


      const [seeEditeurInteret,setSeeEditeurInteret]=useState(false)

      const handleEditeurInterets=()=>{
        setSeeEditeurInteret(prev=>!prev)
      }

      return(
               <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px] cursor-grab">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                            <span className="text-[17px]">
                              ⠿
                            </span>
                            <span className="font-medium text-[1.3rem]">Intérêts</span>
                          </div>
                          <div className="flex items-center gap-[20px]">
                            {seeEditeurInteret ?  <EyeOff onClick={handleEditeurInterets} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurInterets} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                                {data.interets.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,interets:{...prev.interets,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                            <Circle onClick={()=>setData(prev=>({...prev,interets:{...prev.interets,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>} 
                          </div>
                        </div>
                        {seeEditeurInteret && <EditeurQuillSansSSR  valeurChamp={valeurChampInteret} SetValueChamp={setValeurChampInteret}/>}
                      </div>
                    </div>
      )
      
    }


  function Competences(){
    const {data,setData}= useTransfereDonnees()

     const [seeEditeurCompetence,setSeeEditeurCompetence]=useState(false)

      const [valeurChampCompetence,setValeurChampCompetence]=useState(data.competences.content)

       const handleEditeurCompetences=()=>{
    setSeeEditeurCompetence(prev=>!prev)
  }

        useEffect(()=>{
    setData(prev=>({...prev,competences:{...prev.competences,content:valeurChampCompetence}}))
  },[valeurChampCompetence])


  


    return(
           <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px] cursor-grab">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[17px]">
                              ⠿
                            </span>
                            <span className="font-medium text-[1.3rem]">Competences</span>
                          </div>
                          <div className="flex items-center gap-[20px]">
                            {seeEditeurCompetence ?  <EyeOff onClick={handleEditeurCompetences} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurCompetences} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                            {data.competences.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,competences:{...prev.competences,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                            <Circle onClick={()=>setData(prev=>({...prev,competences:{...prev.competences,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>}  
                          </div>
                        </div>
                        {seeEditeurCompetence && <EditeurQuillSansSSR  valeurChamp={valeurChampCompetence} SetValueChamp={setValeurChampCompetence}/>}
                      </div>
                    </div>
    )

  }

  function Langues(){
     const {data,setData}= useTransfereDonnees()

  const [valeurChampLangue,setValeurChampLangue]=useState(data.langues.content)
 
  const [seeEditeurLangue,setSeeEditeurLangue]=useState(false)

  const handleEditeurLangues=()=>{
    setSeeEditeurLangue(prev=>!prev)
  }

  useEffect(()=>{
    setData(prev=>({...prev,langues:{...prev.langues,content:valeurChampLangue}}))
  },[valeurChampLangue])


    return(

                    <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px] cursor-grab">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                            <span className="text-[17px]">
                              ⠿
                            </span>
                            <span className="font-medium text-[1.3rem]">Langues</span>
                          </div>
                          <div className="flex items-center gap-[20px]">
                            {seeEditeurLangue ?  <EyeOff onClick={handleEditeurLangues} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurLangues} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                            {data.langues.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,langues:{...prev.langues,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                            <Circle onClick={()=>setData(prev=>({...prev,langues:{...prev.langues,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>} 
                          </div>
                        </div>
                        {seeEditeurLangue && <EditeurQuillSansSSR  valeurChamp={valeurChampLangue} SetValueChamp={setValeurChampLangue}/>}
                      </div>
                    </div>

    )
  }



export default function CompetencesLanguesLoisirs(){


  const hasInitialized = useRef(false);

  const {data,setData}= useTransfereDonnees()

    const [items, setItems] = useState([]);

   const [instanceChampPers, setInstanceChampPers] = useState([]);

   const componentRegistry = {
     competences: Competences,
     langues: Langues,
     interets: Interets
   };



   useEffect(()=>{
     // return console.log(itemsSection);
     // 1. On crée le dictionnaire inverse (Composant -> Chaîne de caractères)
   const componentToStringRegistry = new Map([
     [Competences, "competences"],
     [Langues, "langues"],
     [Interets, "interets"]
   ]);

   
     
     const tableForDatabase = items.map(el => {
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
   
     setData(prev=>({...prev,ordreSectionsPrincipales:tableForDatabase}))
   
   },[items])




   useEffect(()=>{

    if(!data || hasInitialized.current)return
      const newChamp = data.ordreSectionsPrincipales.map(el => {
       const Component = componentRegistry[el.component];
   
       if (Component) {
         return { id: el.id, component: Component };
       } else {
         return { id: el.id, type: "newChamp" };
       }
     });
   
   setItems(newChamp);
   hasInitialized.current = true;
   
   },[data])


    





    const addinstanceChampPers=()=>{
      const NewId=Date.now()
      setInstanceChampPers([...instanceChampPers,NewId])
      setData(prev=>({...prev,champPersoBlocCompetenceLangue:[...prev.champPersoBlocCompetenceLangue,{id:NewId,display:true,titre:"",content:""}]}))
      setItems(prev=>([...prev,{id:String(NewId),type:"newChamp"}]))
   }

    const deleteInstanceChampPers=(id_delete)=>{
      setInstanceChampPers(instanceChampPers.filter(id=> id != id_delete ))

      setData(prev=>({...prev,champPersoBlocCompetenceLangue:[...prev.champPersoBlocCompetenceLangue.filter(el=>el.id != id_delete)]}))

      setItems((prev) =>
        prev.filter((champ) => champ.id != id_delete)
      );
   }

   const [seeBlocCompetencesLangueLoisirs,setSeeBlocCompetences]=useState(false)
    const handleBlocCompetencesLangueLoisirs=()=>{
    setSeeBlocCompetences(prev=>!prev)
    }
  


 



    function handleDragEnd(result) {
  // Vérifier qu'un élément a bien été déposé
  if (!result.destination) return;

  // Copier le tableau actuel
  const next = [...items];

  // Retirer l'élément de son ancienne position
  const [moved] = next.splice(result.source.index, 1);

  // L'insérer à sa nouvelle position
  next.splice(result.destination.index, 0, moved);

  // Mettre à jour l'état React
  setItems(next);
}



  

  return (

     <div className="rounded-[10px] flex flex-col gap-[30px] border boder-1 border-gray-200 p-[10px]">

       <div className="flex items-center justify-between ">
          <div className="flex items-center gap-[10px]">
              <Toolbox className="shrink-0" color="#000000"/>
              <span className="text-[1.8rem] font-medium">Competences, Langues, Loisirs ....</span>
          </div>

          {seeBlocCompetencesLangueLoisirs ? <EyeOff onClick={handleBlocCompetencesLangueLoisirs} size={20} className="cursor-pointer shrink-0" color="#5e5e5e"/> : <Eye onClick={handleBlocCompetencesLangueLoisirs} size={20} className="cursor-pointer shrink-0" color="#5e5e5e"/> }
        </div>

        <div className={`${seeBlocCompetencesLangueLoisirs ? "block" : "hidden"}`}>

            <div className="flex flex-col gap-15 ">


                  <DragDropContext onDragEnd={handleDragEnd}>

                    <Droppable droppableId="champs">

                       {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="w-full flex flex-col gap-[40px] "
                          >

                            {items.map((item, index) => {
                              if(!item.type ){
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
                                                  <ChampPersonnaliseCompetenceLangue id={item.id} deleteInstanceChampPers={deleteInstanceChampPers}/>
                                                </div>
                                              )}
                                          </Draggable>
                                      );
                                      
                                    }
                                })}



                            {provided.placeholder}
                          </div>

   
                          )}




                    </Droppable>

                  </DragDropContext>



                    <button onClick={addinstanceChampPers}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter un champ</button>




            </div>
          
         </div>

     </div>                 

  )
}
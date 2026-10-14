"use client"

import { useState } from "react"
import { useTransfereDonnees } from "../../../../context/transfere-donnees-context"
// import EditeurQuill from "@/components/Editeur/quill-editeur"
import {EyeOff,Eye,Trash2,Toolbox,CircleOff,Circle} from "lucide-react"
import * as motion from "motion/react-client"
import {convertToInputFormat,convertToDataFormat} from "@/lib/traitementDate.js"
import dynamic from 'next/dynamic';

const EditeurQuillSansSSR = dynamic(
  () => import('@/components/Editeur/quill-editeur'),
  { 
    ssr: false,

  }
);

export default function Projet(){

  const {data,setData}= useTransfereDonnees()
  const [seeBlocProjet,setSeeBlocProjet]=useState(false)


     const container = {
    width: 50,
    height: 4,
    backgroundColor: "#9d9da0",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    position:"relative"
}

const handle = {
    width: 20,
    height: 20,
    backgroundColor: "#5c5792",
    borderRadius: "50%",
    position:"absolute",
    top:0
}




    const handleBlocProjet=()=>{
    setSeeBlocProjet(prev=>!prev)
    }

  const addProjet=()=>{
   setData(prev=>({...prev,projets:{...prev.projets,content:[...prev.projets.content,{
    id:Date.now(),nomProjet:"", roleIntoProject:"",lien:"",texteLien:"",dateDebut:"",dateFin:"",description:"",seeInstance:true
   }]}}))
   }

   const handleEditeurProjet=(id_elToHide)=>{
      setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(el=>{
        if(el.id===id_elToHide){
          return {...el,seeInstance:!el.seeInstance}
        }
        return el
      })}}))
    }

        const deleteInstanceChampPers=(id_delete)=>{
      setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.filter(el=>el.id !== id_delete)}}))      
   }

  return(
    <>
   
    <div className="rounded-[10px] flex flex-col gap-[30px]  border boder-1 border-gray-200 p-[10px]">
      

           <div className="flex items-center justify-between ">
                <div className="flex items-center gap-[10px]">
                  <Toolbox color="#000000"/>
                  <span className="text-[1.8rem] font-medium">Projets</span>
                </div>

                <div className="flex items-center gap-[20px]">
                    {seeBlocProjet ? <EyeOff onClick={handleBlocProjet} size={20} className="cursor-pointer" color="#5e5e5e"/> : <Eye onClick={handleBlocProjet} size={20} className="cursor-pointer" color="#5e5e5e"/> }

                      {data.projets.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,projets:{...prev.projets,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                      <Circle onClick={()=>setData(prev=>({...prev,projets:{...prev.projets,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>} 

                </div>
            </div>


     <div className={`flex flex-col gap-15 ${seeBlocProjet ? "block" : "hidden"}`}>


      { 
      data.projets.content.lenght !== 0  && data.projets.content.map((el)=>{

        return(
                <div key={el.id}  className={`rounded-[10px] border boder-1 border-gray-200 p-[15px]`}>  
                                    <div className="flex flex-col gap-5">
                
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium text-[1.3rem]">{el.nomProjet && el.nomProjet}</span>
                                        <div className="flex items-center gap-[20px]">
                                              {el.seeInstance ?  <EyeOff onClick={()=>handleEditeurProjet(el.id)} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={()=>handleEditeurProjet(el.id)} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                                              <Trash2 size={17} className="cursor-pointer" color="#f25353" onClick={()=>deleteInstanceChampPers(el.id)}/>
                                        </div>
                                      </div>
                
                
                                       <div className={`${el.seeInstance ? "block" : "hidden"} w-full flex flex-col gap-5 `}>

                                        <div className="flex w-full max-[1150px]:flex-col items-center gap-5">
                                          <div className="w-full">
                                            <span className="text-[13px] font-semibold">Nom du projet</span>
                                            <input  value={el.nomProjet} onChange={(e)=>{
                              setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                if(element === el){
                                  return {...element,nomProjet:e.target.value}
                                }
                                return element
                              })}}))
                            }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                          </div>
                                          
                                          <div className="w-full">
                                            <span className="text-[13px] font-semibold">Rôle dans le projet</span>
                                              <input value={el.roleIntoProject} onChange={(e)=>{
                              setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                if(element === el){
                                  return {...element,roleIntoProject:e.target.value}
                                }
                                return element
                              })}}))
                            }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                          </div>
                                        </div>




                                        <div className="w-full">
                                          <span className="text-[13px] font-semibold" >Lien vers le projet (facultatif)  </span>
                                          <div className="flex w-full flex-col gap-4 mt-[5px] rounded-[10px] border boder-1 border-gray-300 p-[5px]">
                                            <div className="flex w-full max-[1150px]:flex-col items-center gap-5 ">
                                              <div className="w-full">
                                                <span className="text-[13px]">Lien vers le projet</span>
                                                <input value={el.lien} onChange={(e)=>{
                              setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                if(element === el){
                                  return {...element,lien:e.target.value}
                                }
                                return element
                              })}}))
                            }}   placeholder="https://......." className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                              </div>
                                              <div className="w-full">
                                                <span className="text-[13px]">Texte du lien</span>
                                                  <input value={el.texteLien} onChange={(e)=>{
                              setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                if(element === el){
                                  return {...element,texteLien:e.target.value}
                                }
                                return element
                              })}}))
                            }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                              </div>
                                            </div>
                                              <span className="text-[11px] text-gray-500">Si le champ de texte affiché est laissé vide,le lien complet s'affichera automatiquement.</span>
                                          </div>
                                        </div>




                
                                        <div className="flex max-[1150px]:flex-col gap-5 justify-between">
                                            <div className="w-full">
                                              <span className="text-[13px] font-semibold">Date debut</span>
                                              <input  onChange={(e)=>{
                                                    setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                                      if(element === el){
                                                        return {...element,dateDebut:convertToDataFormat(e.target.value)}
                                                      }
                                                      return element
                                                    })}}))
                                            }}  defaultValue={convertToInputFormat(el.dateDebut)}    className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="month" />
                                            </div>
                                            <div className="w-full">
                                              <span className="text-[13px] font-semibold">Date Fin</span>
                                              <input  onChange={(e)=>{
                                                    setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                                      if(element === el){
                                                        return {...element,dateFin:convertToDataFormat(e.target.value)}
                                                      }
                                                      return element
                                                    })}}))
                                            }}  defaultValue={convertToInputFormat(el.dateFin)}   className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="month" />
                                              <div className="flex flex-col items-end">
                                                <span className="font-semibold text-[13px]">Actuel</span>
                                                  <button
                                                    className="toggle-container px-[2px] py-[10px]"
                                                  style={{
                                                      ...container,
                                                      justifyContent: "flex-" + (( el.dateFin === "ACTUEL") ? "end" : "start"),
                                                  }}

                                                  onClick={()=>{
                                                    // setIsOn(!isOn)
                                                    if(el.dateFin ==="ACTUEL"){
                                                        setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                                        if(element === el){
                                                          return {...element,dateFin: "" }
                                                        }
                                                        return element
                                                      })}}))
                                                    }else{
                                                            setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(element=>{
                                                        if(element === el){
                                                          return {...element,dateFin: "ACTUEL" }
                                                        }
                                                        return element
                                                      })}}))
                                                    }
                                                  }}
                                                    
                                                >
                                                    <motion.div
                                                        className="toggle-handle"
                                                        style={handle}
                                                        layout
                                                        transition={{
                                                            type: "spring",
                                                            visualDuration: 0.2,
                                                            bounce: 0.2,
                                                        }}
                                                    />
                                                </button>
                                              </div>
                                            </div>
                                        </div>
                                      <EditeurQuillSansSSR section={"projets"}  valeurChamp={el.description}  id={el.id} />
                                      </div>
                                    </div>
                                  </div>

                    )
                })
            }

        </div>

    </div>

                  


     <button onClick={addProjet} className="border border-1 border-gray-300 px-[15px] py-[5px] bg-black cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter un projet</button>
    
    </>
  )
}
"use client"
// import EditeurQuill from "@/components/Editeur/quill-editeur"
import { useEffect, useState } from "react"
import { useTransfereDonnees } from "../../../../context/transfere-donnees-context"
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

export default function Experiences(){
    const {data,setData}= useTransfereDonnees()
    const [seeBlocExperiences,setSeeBlocExperiences]=useState(false)
    const handleBlocExperiences=()=>{
    setSeeBlocExperiences(prev=>!prev)
    }


    



    const addExperience=()=>{
      setData(prev=>({...prev,experiences:{...prev.experiences,content:[...prev.experiences.content,{
        seeInstance:true,id:Date.now(),nomEntreprise:"",poste:"",dateDebut:"",dateFin:"",content:""
      }]}}))
   }
  


  
    const handleEditeurExperience=(id_elToHide)=>{
      setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(el=>{
        if(el.id===id_elToHide){
          return {...el,seeInstance:!el.seeInstance}
        }
        return el
      })}}))
    }

     const deleteInstanceChampPers=(id_delete)=>{
      setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.filter(el=>el.id !== id_delete)}}))      
   }

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



  return(


            <div className="rounded-[10px] flex flex-col gap-[30px] border boder-1 border-gray-200 p-[10px] cursor-grab">
              
                  <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-[10px]">
                          <span className="text-[17px]">
                            ⠿
                          </span>
                        <Toolbox color="#000000"/>
                        <span className="text-[1.8rem] font-medium">Experiences</span>
                      </div>

                      <div className="flex items-center gap-[20px]">
                      {seeBlocExperiences ? <EyeOff onClick={handleBlocExperiences} size={20} className="cursor-pointer" color="#5e5e5e"/> : <Eye onClick={handleBlocExperiences} size={20} className="cursor-pointer" color="#5e5e5e"/> }

                      {data.experiences.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,experiences:{...prev.experiences,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                      <Circle onClick={()=>setData(prev=>({...prev,experiences:{...prev.experiences,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>} 
                      </div>

                  </div>
                     

        <div className={`flex flex-col gap-15  ${seeBlocExperiences ? "block" : "hidden"}`}>
      {
    data.experiences.content.map((el)=>{


      return( 
                   <div key={el.id} className={`rounded-[10px] border boder-1 border-gray-200 p-[15px]`}>  
                    <div className="flex flex-col gap-5">

                      <div className="flex  justify-between items-center">
                        <span className="font-medium text-[1.3rem]">{el.poste}</span>
                        <div className="flex items-center gap-[20px]">
                          {el.seeInstance ?  <EyeOff onClick={()=>handleEditeurExperience(el.id)} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={()=>handleEditeurExperience(el.id)} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                          <Trash2 size={17} className="cursor-pointer" color="#f25353" onClick={()=>deleteInstanceChampPers(el.id)}/>
                        </div>
                      </div>


                      <div className={`${el.seeInstance ? "block" : "hidden"} flex w-full  flex-col gap-5 `}>
                        <div className="flex w-full max-[1150px]:flex-col items-center gap-5">
                          <div className="w-full">
                            <span className="text-[13px] font-semibold">Nom de l'entreprise</span>
                            <input value={el.nomEntreprise} onChange={(e)=>{
                              setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(element=>{
                                if(element === el){
                                  return {...element,nomEntreprise:e.target.value}
                                }
                                return element
                              })}}))
                            }} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                          </div>
                          <div className="w-full">
                            <span className="text-[13px] font-semibold">Poste occupé</span>
                              <input value={el.poste} onChange={(e)=>{
                              setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(element=>{
                                if(element === el){
                                  return {...element,poste:e.target.value}
                                  
                                }
                                return element
                              })}}))
                            }} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                          </div>
                        </div>

                        <div className="flex max-[1150px]:flex-col gap-5 justify-between">
                            <div className="w-full">
                              <span className="text-[13px] font-semibold">Date debut</span>
                              <input onChange={(e)=>{
                                     setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(element=>{
                                        if(element === el){
                                          return {...element,dateDebut:convertToDataFormat(e.target.value)}
                                        }
                                        return element
                                      })}}))
                              }}  defaultValue={convertToInputFormat(el.dateDebut)} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="month" />
                            </div>
                            <div className="w-full">
                              <span className="text-[13px] font-semibold">Date Fin</span>
                              <input onChange={(e)=>{
                                     setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(element=>{
                                        if(element === el){
                                          return {...element,dateFin:convertToDataFormat(e.target.value)}
                                        }
                                        return element
                                      })}}))
                              }} defaultValue={convertToInputFormat(el.dateFin)} className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="month" />
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
                                          setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(element=>{
                                          if(element === el){
                                            return {...element,dateFin: "" }
                                          }
                                          return element
                                        })}}))
                                      }else{
                                              setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(element=>{
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
                      <EditeurQuillSansSSR section={"experience"}  valeurChamp={el.content}  id={el.id} />
                      </div>
                    </div>
                  </div>
      )

    })
}
             <button onClick={addExperience}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter une experience</button>
                  
        </div>

     </div>
  )

  
}
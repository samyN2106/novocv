"use client"

import { useTransfereDonnees } from "@/context/transfere-donnees-context"
import { convertToDataFormat, convertToInputFormat } from "@/lib/traitementDate"
import {EyeOff,Eye,Trash2,Toolbox,CircleOff,Circle} from "lucide-react"
import * as motion from "motion/react-client"
import { useEffect } from "react"


export default function NewSection({sectionId,deleteSection}){

    const {data,setData}= useTransfereDonnees()


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





      const addChamp=(idSection)=>{

          setData(prev => ({
          ...prev,
          newsSections: prev.newsSections.map(section => {
            if (section.id === idSection) {
              return {
                ...section,
                champs: [...section.champs, {
        id:Date.now(),seeInstance:true,organisme:"",plateforme:"",intitule:"",
        dateDebut:"",dateFin:""
      }] 
              };
            }
            return section;
          })
        }));
  


      }



    const deleteInstanceChamp=(idChamp,idSection)=>{
              setData(prev => ({
          ...prev,
          newsSections: prev.newsSections.map(section => {
            if (section.id === idSection) {
              return {
                ...section,
                // .filter() supprime l'élément qui correspond à l'idChamp
                champs: section.champs.filter(chmp => chmp.id !== idChamp)
              };
            }
            return section;
          })
        }));
      
   }



    const handleSection=(id_elToHide)=>{
          setData(prev=>({...prev,newsSections:[...prev.newsSections.map(el=>{
          if(el.id===id_elToHide){  
            return {...el,seeInstance:!el.seeInstance}
          }
          return el
        })]}))
        
    }
    const handleEditeurChamp=(idChamp,idSection)=>{
          setData(prev=>({...prev,newsSections:[...prev.newsSections.map(section=>{
          if(section.id===idSection){ 
            return{ 
              ...section,
            champs: section.champs.map(chmp=>{
              if(chmp.id===idChamp){
                  return {
                  ...chmp,
                    seeInstance:!chmp.seeInstance
                  }
              }
              return chmp;
            })
          }
        }
          return section
        })]}))
    }


    return(

      <>
      {  
          data.newsSections
      .filter(section => section.id == sectionId)
      .map(section => {

          return (
            
            <div key={section.id} className="rounded-[10px] flex flex-col gap-[30px] border boder-1 border-gray-200 p-[10px] cursor-grab">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[17px]">
                        ⠿
                      </span>
                      <Toolbox color="#000000"/>
                      <span className="text-[1.8rem] font-medium">{section.nom}</span>
                    </div>

                    <div className="flex items-center gap-[20px]">
                      {section.seeInstance ? <EyeOff onClick={()=>handleSection(section.id)} size={20} className="cursor-pointer" color="#5e5e5e"/> : <Eye onClick={()=>handleSection(section.id)} size={20} className="cursor-pointer" color="#5e5e5e"/> } 
                        <Trash2 size={17} className="cursor-pointer" color="#db2f2f" onClick={()=>deleteSection(section.id)}/>               
                    </div>
                </div>


                  <div className={`flex flex-col gap-15  ${section.seeInstance ? "block" : "hidden"}`}>

                        <div className="w-full">
                                      <span className="text-[13px] font-semibold">Nom de la section</span>
                                      <input value={section.nom} onChange={(e)=>{
                                              setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                            if(sect.id===section.id){ 
                                              return{ 
                                                ...sect,
                                                nom:e.target.value,
                                            }
                                          }
                                            return sect
                                          })]}))
                                    }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                              </div>

                    { section.champs.map(champ=>{
                      return(
                        <div key={champ.id}  className={`rounded-[10px] border boder-1 border-gray-200 p-[15px]`}>
                          <div className="flex flex-col gap-5">



                              <div className="flex justify-between items-center">
                                <span className="font-medium text-[1.3rem]">{champ.intitule}</span>
                                  <div className="flex items-center gap-[20px]">
                                    {champ.seeInstance ?  <EyeOff onClick={()=>handleEditeurChamp(champ.id,section.id)} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={()=>handleEditeurChamp(champ.id,section.id)} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                                    <Trash2 size={17} className="cursor-pointer" color="#db2f2f" onClick={()=>deleteInstanceChamp(champ.id,section.id)}/>
                                  </div>
                              </div>


                              <div className={`${champ.seeInstance ? "block" : "hidden"} flex flex-col gap-5 `}>

                                  <div className="flex max-[1150px]:flex-col items-center gap-5">
                                    <div className="w-full">
                                      <span className="text-[13px] font-semibold">organisme ou emetteur</span>
                                      <input value={champ.organisme} onChange={(e)=>{
                                              setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                            if(sect.id===section.id){ 
                                              return{ 
                                                ...sect,
                                              champs: sect.champs.map(chmp=>{
                                                if(chmp.id===champ.id){
                                                    return {
                                                    ...chmp,
                                                      organisme:e.target.value
                                                    }
                                                }
                                                return chmp;
                                              })
                                            }
                                          }
                                            return sect
                                          })]}))
                                    }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                    </div>


                                    <div className="w-full">
                                      <span className="text-[13px] font-semibold">lieu ou plateforme</span>

                                        <input  value={champ.plateforme} onChange={(e)=>{
                                    setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                            if(section.id===sect.id){ 
                                              return{ 
                                                ...sect,
                                              champs: sect.champs.map(chmp=>{
                                                if(chmp.id===champ.id){
                                                    return {
                                                    ...chmp,
                                                      plateforme:e.target.value
                                                    }
                                                }
                                                return chmp;
                                              })
                                            }
                                          }
                                            return sect
                                          })]}))
                                  }} placeholder="Cocody, Abidjan" className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                    </div>
                                  </div>


                                    <div>
                                          <span className="text-[13px] font-semibold">intitule ou titre</span>
                                            <input value={champ.intitule} onChange={(e)=>{
                                      setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                            if(section.id===sect.id){ 
                                              return{ 
                                                ...sect,
                                              champs: sect.champs.map(chmp=>{
                                                if(chmp.id===champ.id){
                                                    return {
                                                    ...chmp,
                                                      intitule:e.target.value
                                                    }
                                                }
                                                return chmp;
                                              })
                                            }
                                          }
                                            return sect
                                          })]}))
                                  }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                                  </div>


                                      <div className="flex max-[1150px]:flex-col gap-5 justify-between">

                                        <div className="w-full">
                                            <span className="text-[13px] font-semibold">Date debut</span>

                                                <input onChange={(e)=>{
                                                  setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                                if(section.id===sect.id){ 
                                                  return{ 
                                                    ...sect,
                                                  champs: sect.champs.map(chmp=>{
                                                    if(chmp.id===champ.id){
                                                        return {
                                                        ...chmp,
                                                          dateDebut:convertToDataFormat(e.target.value)
                                                        }
                                                    }
                                                    return chmp;
                                                  })
                                                }
                                              }
                                                return sect
                                              })]}))
                                  
                                              }}  defaultValue={convertToInputFormat(champ.dateDebut)}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="month" />
                                          </div>


                                          <div className="w-full">
                                              <span className="text-[13px] font-semibold">Date Fin</span>
                                              <input onChange={(e)=>{setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                                if(section.id===sect.id){ 
                                                  return{ 
                                                    ...sect,
                                                  champs: sect.champs.map(chmp=>{
                                                    if(chmp.id===champ.id){
                                                        return {
                                                        ...chmp,
                                                          dateFin:convertToDataFormat(e.target.value)
                                                        }
                                                    }
                                                    return chmp;
                                                  })
                                                }
                                              }
                                                return sect
                                              })]}))
                                  
                                              }} defaultValue={convertToInputFormat(champ.dateFin)}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="month" />
                                              <div className="flex flex-col items-end">
                                                <span className="font-semibold text-[13px]">Actuel</span>
                                                  <button
                                                    className="toggle-container px-[2px] py-[10px]"
                                                  style={{
                                                      ...container,
                                                      justifyContent: "flex-" + (( champ.dateFin === "ACTUEL") ? "end" : "start"),
                                                  }}

                                                    onClick={()=>{
                                        // setIsOn(!isOn)
                                        if(champ.dateFin ==="ACTUEL"){
                                          setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                                if(section.id===sect.id){ 
                                                  return{ 
                                                    ...sect,
                                                  champs: sect.champs.map(chmp=>{
                                                    if(chmp.id===champ.id){
                                                        return {
                                                        ...chmp,
                                                          dateFin:""
                                                        }
                                                    }
                                                    return chmp;
                                                  })
                                                }
                                              }
                                                return sect
                                              })]}))
                                        }else{
                                          setData(prev=>({...prev,newsSections:[...prev.newsSections.map(sect=>{
                                                if(section.id===sect.id){ 
                                                  return{ 
                                                    ...sect,
                                                  champs: sect.champs.map(chmp=>{
                                                    if(chmp.id===champ.id){
                                                        return {
                                                        ...chmp,
                                                          dateFin:"ACTUEL"
                                                        }
                                                    }
                                                    return chmp;
                                                  })
                                                }
                                              }
                                                return sect
                                              })]}))
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

                              </div>

                          </div>
                        </div>  
                      )
                    })}

                        <button onClick={()=>addChamp(section.id)}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-black cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter un champ</button>

                  </div>

              </div>
          
        )
        
      })  
      }
      </>
 
    )




}
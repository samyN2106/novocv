"use client"
import {Trash2,CircleOff} from "lucide-react"
import { motion } from "motion/react"
import ListIcones from "../../../list-icones"
import { useEffect, useRef, useState } from "react"
import { useTransfereDonnees } from "../../../../../context/transfere-donnees-context"

export default function Champ_personnalise({id,functionDelete}){
  const [seeIcones,setSeeIcones]=useState(false)
  const BlocIcone=useRef(null)
   const {data,setData}= useTransfereDonnees()

  const handleBlocIcones=()=>{
    setSeeIcones((prev)=>{
      return !prev
    })
    
  }


  useEffect(()=>{

    const cacheBlocIcones=(e)=>{
      if(BlocIcone.current && !BlocIcone.current.contains(e.target)){
        setSeeIcones(false)
      }
  }
      document.addEventListener("click",cacheBlocIcones)
      return ()=>{
        document.removeEventListener("click",cacheBlocIcones)
      }

  },[])
  
  return(
    <motion.div transition={{
                duration: 0.4,
            }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <div className="flex items-center gap-15 ">
                <div ref={BlocIcone} className="relative">
                  {seeIcones && <ListIcones id={id}/>}
                  <div>
                    <span>Choisir icone</span>
                    {
                      (()=>{
                         const currentChamp=data.champPerso.find(el=>el.id===id)
                         if(currentChamp.iconeWeb){
                          return <div className="text-[17px] cursor-pointer" onClick={handleBlocIcones} >{currentChamp.iconeWeb}</div>
                         }else{
                            return <CircleOff strokeWidth={3} color="#f25353" onClick={handleBlocIcones} className="cursor-pointer" size={17}/>
                         }  
                      })()
                      }
                  </div>
                </div>
                <div className="w-full">
                    <input onChange={(e)=>setData(prev=>({...prev,champPerso:[...prev.champPerso.map(el=>{
                      if(el.id === id){
                        return {...el,content:e.target.value}
                      }
                      return el
                    })]}))}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] mb-[10px] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                    <div className="flex items-center gap-2 ">
                      <label htmlFor="text-lien" >(facultatif)</label>
                      <input onChange={(e)=>setData(prev=>({...prev,champPerso:[...prev.champPerso.map(el=>{
                      if(el.id === id){
                        return {...el,url:e.target.value}
                      }
                      return el
                    })]}))} placeholder="ajouter un lien" className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" id="text-lien" type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                  <Trash2 size={17} className="cursor-pointer" color="#db2f2f" onClick={()=>functionDelete(id)}/>
                </div>
            </div>
      </motion.div>
  )
}
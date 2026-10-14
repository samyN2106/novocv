"use client"
// import EditeurQuill from "@/components/Editeur/quill-editeur"
import { motion } from "motion/react"
import {EyeOff,Eye,Trash2} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTransfereDonnees } from "../../../../../context/transfere-donnees-context"
import dynamic from 'next/dynamic';

const EditeurQuillSansSSR = dynamic(
  () => import('@/components/Editeur/quill-editeur'),
  { 
    ssr: false,
  }
);

export default function ChampPersonnaliseCompetenceLangue({id,deleteInstanceChampPers}){

  const {data,setData}= useTransfereDonnees()
   const [seeEditeurChampPerso,setSeeEditeurChampPerso]=useState(true)

const [valeurChampPerso, setValeurChampPerso] = useState(
  data.champPersoBlocCompetenceLangue.find(el => el.id == id)?.content ?? ""
);





    const handleEditeurChampPerso=()=>{
    setSeeEditeurChampPerso(prev=>!prev)
    }
    


  useEffect(()=>{
    
    setData(prev=>({...prev,champPersoBlocCompetenceLangue:[...prev.champPersoBlocCompetenceLangue.map((el)=>{
      if(el.id==id){
        return {...el,content:valeurChampPerso}
      }
      return el
    })]}))
  },[valeurChampPerso])


  
  
  return(
    <motion.div transition={{
                duration: 0.4,
            }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px] cursor-grab">
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[17px]">
                              ⠿
                            </span>
                            <span className="font-medium text-[1.3rem]">{(()=>{
                              const currentChamp=data.champPersoBlocCompetenceLangue.find(el=>el.id==id)
                              return currentChamp?.titre
                                })()}</span>
                          </div>
                        <div className="flex items-center gap-[20px]">
                        {seeEditeurChampPerso ?  <EyeOff onClick={handleEditeurChampPerso} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurChampPerso} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/> }
                          <Trash2   color="#f25353" className="cursor-pointer" size={15} onClick={()=>deleteInstanceChampPers(id)}/> 
                        </div>
                      </div>

                      {seeEditeurChampPerso && 
                      <div className="flex flex-col gap-[15px]">
                        <div className="flex items-center">
                            <span>Titre du champ</span>
                            <input value={(()=>{
                            const currentChamp=data.champPersoBlocCompetenceLangue.find(el=>el.id==id)
                            return currentChamp?.titre
                            })()} onChange={(e)=>{
                              setData(prev=>({...prev,champPersoBlocCompetenceLangue:[...prev.champPersoBlocCompetenceLangue.map(el=>{
                                if(el.id==id){
                                  return {...el,titre:e.target.value}
                                }
                                return el
                              })]}))
                            }}  className="w-full shadow-[0px_0px_4px_0px_#e2e2e2] p-[10px] text-xl rounded-[5px] h-[30px] border border-1 border-gray-200 outline-[#5c5792]" type="text" />
                        </div>
                        <EditeurQuillSansSSR  valeurChamp={valeurChampPerso} SetValueChamp={setValeurChampPerso} /> 
                      </div>
                          
                      }
                    </div>
                  </div>
      </motion.div>
  )
}
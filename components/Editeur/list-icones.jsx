"use client"
import {CircleOff} from "lucide-react"
import { motion } from "motion/react"
import { useTransfereDonnees } from "../../context/transfere-donnees-context";
import { iconesWeb,iconesPdf } from "./Icones";



export default function ListIcones({id}){




  const {setData}=useTransfereDonnees()

  const AjouterIcone=(ObjetIcone)=>{
      setData(prev=>({...prev,champPerso:[...prev.champPerso.map(el=>{
        if(el.id==id){
          const iconePdf=iconesPdf.find(item=>item.nom === ObjetIcone.nom)
          return {...el,iconeWeb:ObjetIcone.nom,iconePdf:iconePdf.nom}
        }
        return el
      })]}))
      
  }



  return(
      <motion.div className="p-[20px] bg-[#ebebeb] absolute bottom-[20px] shadow-[0px_0px_6px_0px_#b7b7b7] rounded-[10px] " transition={{
                duration: 0.4,
            }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <div className="gap-[20px]" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}>
              <CircleOff strokeWidth={3} onClick={()=>  setData(prev=>({...prev,champPerso:[...prev.champPerso.map(el=>{
                            if(el.id==id){
                              return {...el,iconeWeb:"",iconePdf:""}
                            }
                          })]}))} className="cursor-pointer" color="#f25353" size={17}/>
              {iconesWeb.map((icone,index)=>{
                return <div onClick={()=>AjouterIcone(icone)} key={index} className="cursor-pointer text-[18px] text-[#404040]"> {icone.svg} </div>
              })}
            </div>
      </motion.div>
  )
}

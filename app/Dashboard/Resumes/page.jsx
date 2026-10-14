"use client"
import {FileText,ShieldAlert,CircleX,Pen,Trash,TriangleAlert,X,CloudCheck,CloudAlert} from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { templates } from "../../../lib/detail-templates"
import CvAutoScaledContainerDashboard from "@/components/Editeur/cvAutoScaledContainerDashboard"
import { SupprimerCvAction } from "@/actions/SupprimerCv"



export default function resumesPage(){
  const [seeBlockAlert,setSeeBlockAlert]=useState(false)
  const { status} = useSession()
  const [cvs,setCvs]=useState(null) 
  const [idCvDelete,setIdCvDelete]=useState(null)
  const [messageErreur,setMessageErreur]=useState("")
  const [messageSucces,setMessageSucces]=useState("")
  const [seeBlocErreur,setSeeBlocErreur]=useState(false)

  useEffect(()=>{
    if(status === "authenticated"){
      setSeeBlockAlert(false)
    }else{
      setSeeBlockAlert(true)
    }

    async function recuperation(){
      if(status !== "authenticated") return
        const reponse=await fetch("/api/recuperation-cvs")
        const res= await reponse.json()
        if(!reponse.ok){
          if(res.error){ 
            setSeeBlocErreur(true)
            return setMessageErreur(res.error) }
        }
        setCvs(res.data) 
    }
    recuperation()
  },[status,cvs])

  const [seeBlocDeleteCv,setSeeBlocDeleteCv]=useState(false)



const deleteCv=async (idCv)=>{
  if(!idCv)return
  const reponse=await SupprimerCvAction(idCv)
  if(!reponse.success){
    setSeeBlocErreur(true)
    setSeeBlocDeleteCv(false)
    return setMessageErreur(reponse.error)
  }

    setMessageSucces(reponse.message)
    setSeeBlocDeleteCv(false)
   
}



  return(
 
     <main className="flex flex-col gap-[40px]">

     { seeBlocDeleteCv && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">

        <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl bg-white transform transition-all animate-fade-in">
          
        
          <button onClick={()=>setSeeBlocDeleteCv(false)} type="button" className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 rounded-lg p-1.5 inline-flex items-center justify-center">
            <X size={14}/>
          </button>


          <div className="text-center">

            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <TriangleAlert size={18} color="#e7000b" />
            </div>


            <h3 className="mb-2 text-2xl font-semibold text-gray-900  ">
              Confirmer la suppression
            </h3>
            <p className="mb-6 text-[13px] text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible et toutes les données associées seront définitivement perdues.
            </p>

      
            <div className="flex items-center justify-center space-x-3">
      
              <button onClick={()=>setSeeBlocDeleteCv(false)} type="button" className="cursor-pointer py-2.5 px-4 text-xl font-medium text-gray-700 bg-[#000000] border border-gray-300 rounded-xl hover:bg-gray-50  text-white dark:hover:bg-gray-700  transition duration-200">
                Non, annuler
              </button>
              
        
              <button onClick={()=>deleteCv(idCvDelete)}  type="button" className="cursor-pointer py-2.5 px-4 text-xl font-medium text-white bg-red-600 rounded-xl hover:bg-red-700   shadow-sm shadow-red-600/20 transition duration-200">
                Oui, supprimer
              </button>
            </div>
          </div>

        </div>
    </div>
  }
      
      {seeBlocErreur && messageErreur !== "" ? <motion.div   initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    duration: 0.7,
    ease: "easeOut",
  }} className="flex relative rounded-[10px] border border-1 border-[#ffa600] items-center bg-[#f9e4bd] text-[15px] p-[12px] gap-5">
        <CloudAlert className="shrink-0" size={35} color="#93532c" />
        <p>{messageErreur}</p>
        <CircleX onClick={()=>setSeeBlocErreur(false)} color="#7e5304" className="absolute right-[-10px] top-[-10px] " />
          </motion.div>: 
      messageSucces !=="" ? <motion.div   initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }} className="flex relative rounded-[10px] border border-1 border-[#bbd5bb] items-center bg-[#eeffee] text-[15px] p-[12px] gap-5">
            <CloudCheck className="shrink-0" size={35} color="#5daa5d" />
            <p>{messageSucces}</p>
            <CircleX onClick={()=>setMessageSucces("")} color="#203325" className="absolute right-[-10px] top-[-10px] " />
          </motion.div> : "" }



      {seeBlockAlert && <motion.div   initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    duration: 0.7,
    ease: "easeOut",
  }} className="flex relative rounded-[10px] border border-1 border-[#ffa600] items-center bg-[#f9e4bd] text-[15px] p-[12px] gap-5">
        <ShieldAlert className="shrink-0" size={35} color="#ffa600" />
        <p>Connectez vous ou creez un compte afin que vos redactions soient sauvegardees</p>
        <CircleX onClick={()=>setSeeBlockAlert(false)} color="#a76c00" className="absolute right-[-10px] top-[-10px] " />
      </motion.div>}

        <div className="flex justify-between items-center">
            <h1 className="text-[3rem] font-semibold">Mes redactions</h1>
            {/* <Link className="border border-1 border-gray-300 px-[15px] py-[5px] text-black rounded-[7px] flex gap-2 hover:border-2 font-semibold" href={"Inscription"}><FileText size={18} color="Red" /> Importer</Link> */}
        </div>

        <section className="grid grid-cols-4 max-[1200px]:grid-cols-3 gap-5 justify-items-center max-[960px]:grid-cols-2 max-[500px]:grid-cols-1">
            <Link href={"/Dashboard/Modeles-cv"} className="flex cursor-pointer group hover:scale-[1.03] hover:bg-[#fcfbfb] duration-500 flex-col items-center justify-center border border-dashed border-1 border-[#b9b7b7] rounded-[10px] p-[20px] h-[350px]  gap-4 w-[220px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-20 bg-gray-200 p-[10px] rounded-[50%] group-hover:rotate-180 duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <h4 className="text-gray-600 text-[1.7rem] font-medium text-center">Commencer une nouvelle redaction</h4>
            </Link>

          {
          cvs && cvs.map(el=>{
             const template=templates.find(element=>element.genre===el.genre)
              const Cv=template.ficher
            return( 
                <div key={el.id} className="flex group hover:scale-[1.03] hover:bg-[#fcfbfb] duration-500 flex-col items-center justify-center border border-dashed border-1 border-[#b9b7b7] rounded-[10px] h-[350px]  w-[220px]">
                    <CvAutoScaledContainerDashboard>
                      <Cv data={el.content} /> 
                    </CvAutoScaledContainerDashboard>
                  <div className="w-full p-[5px]">
                    <p className="truncate font-semibold text-xl mb-[5px]">{el.genre}</p>
                    <div className="flex items-center justify-between ">
                      <div ><Link href={`/editeur-cv/${el.slug}`} className="flex items-center font-semibold" ><Pen size={15} /> <span>Editier</span></Link></div>
                      <div className="cursor-pointer" onClick={()=>{setSeeBlocDeleteCv(true); setIdCvDelete(el.id)}} ><div className="flex items-center font-semibold text-red-600"><Trash size={15} /> <span>Supprimer</span ></div></div>
                    </div>
                  </div>
                </div>
              )
          })
        }
        </section>
 

     </main>

  )
}


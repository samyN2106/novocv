"use client"
import Header from "@/components/Editeur/Header"
import InfosDeBase from "../../../components/Editeur/cv/champs/info-de-base"
import CompetencesLanguesLoisirs from "../../../components/Editeur/cv/champs/competences-langues-loisirs"
import Experiences from "../../../components/Editeur/cv/champs/experience"
import "@/app/styles/style-barre-progress.css"
import {ArrowLeft,ArrowRight,ShieldAlert,CircleX} from "lucide-react" 
import { useTransfereDonnees } from "../../../context/transfere-donnees-context"
import { Suspense, useEffect, useState,use } from "react"
import Formations from "../../../components/Editeur/cv/champs/formation"
import Projet from "../../../components/Editeur/cv/champs/projet"
import useWindowSize from "../../../hooks/useWindowSize"
import { templates } from "@/lib/detail-templates"
import { useSession } from "next-auth/react"
import CvAutoScaledContainerEditeur from "@/components/Editeur/cvAutoScaledContainerEditeur"
import { motion } from "motion/react"
import Loading from "@/components/loading"





function Template({slug}){
  const {data,setData,dataLoaded}=useTransfereDonnees() 
    const template=templates.find(el=>el.slug===slug)
    const { data: session ,status} = useSession()
    
  useEffect(() => {
  if (status === "authenticated") return;

  function handleBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = "";
  }

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [status]);


     const Cv=template.ficher

    return <Cv data={data}  dataLoaded={dataLoaded}/>

}





export default function Editeur({ params }){

  const { slug } = use(params) 
  const { status} = useSession()

  const [seeBlocEdition,setSeeBlocEdition]=useState(false)

  const {widthScreen} = useWindowSize()
   const [seeBlockAlert,setSeeBlockAlert]=useState(true)
  

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



  
  return(
    <>

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
                        
                  <Experiences/>
                  
                  <Formations/>

                  <Projet/>

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

    </>
  )
}
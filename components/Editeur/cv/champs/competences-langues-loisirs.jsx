"use client"

// import EditeurQuill from "@/components/Editeur/quill-editeur"
import { useEffect, useState } from "react"
import { useTransfereDonnees } from "../../../../context/transfere-donnees-context"
import {EyeOff,Eye,CircleOff,Circle,Toolbox} from "lucide-react"
import ChampPersonnaliseCompetenceLangue from "@/components/Editeur/cv/champs/champs-perso/champPerso-Competences-Langue"
import dynamic from 'next/dynamic';


const EditeurQuillSansSSR = dynamic(
  () => import('@/components/Editeur/quill-editeur'),
  { 
    ssr: false,
  }
);


export default function CompetencesLanguesLoisirs(){
  const {data,setData}= useTransfereDonnees()

  const [valeurChampCompetence,setValeurChampCompetence]=useState(data.competences.content)
  const [valeurChampLangue,setValeurChampLangue]=useState(data.langues.content)
  const [valeurChampInteret,setValeurChampInteret]=useState(data.interets.content)


  const [seeEditeurCompetence,setSeeEditeurCompetence]=useState(false)
  const [seeEditeurLangue,setSeeEditeurLangue]=useState(false)
  const [seeEditeurInteret,setSeeEditeurInteret]=useState(false)

  const handleEditeurCompetences=()=>{
    setSeeEditeurCompetence(prev=>!prev)
  }

  const handleEditeurLangues=()=>{
    setSeeEditeurLangue(prev=>!prev)
  }

  const handleEditeurInterets=()=>{
    setSeeEditeurInteret(prev=>!prev)
  }

  useEffect(()=>{
    setData(prev=>({...prev,competences:{...prev.competences,content:valeurChampCompetence}}))
  },[valeurChampCompetence])


  useEffect(()=>{
    setData(prev=>({...prev,langues:{...prev.langues,content:valeurChampLangue}}))
  },[valeurChampLangue])


  useEffect(()=>{
    setData(prev=>({...prev,interets:{...prev.interets,content:valeurChampInteret}}))
  },[valeurChampInteret])

   const [instanceChampPers, setInstanceChampPers] = useState([]);


    const addinstanceChampPers=()=>{
      const NewId=Date.now()
      setInstanceChampPers([...instanceChampPers,NewId])
      setData(prev=>({...prev,champPersoBlocCompetenceLangue:[...prev.champPersoBlocCompetenceLangue,{id:NewId,display:true,titre:"",content:""}]}))
   }

    const deleteInstanceChampPers=(id_delete)=>{
      setInstanceChampPers(instanceChampPers.filter(id=> id !== id_delete ))
      setData(prev=>({...prev,champPersoBlocCompetenceLangue:[...prev.champPersoBlocCompetenceLangue.filter(el=>el.id !== id_delete)]}))
   }

   const [seeBlocCompetencesLangueLoisirs,setSeeBlocCompetences]=useState(false)
    const handleBlocCompetencesLangueLoisirs=()=>{
    setSeeBlocCompetences(prev=>!prev)
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


                    <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px]">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[1.3rem]">Competences</span>
                          <div className="flex items-center gap-[20px]">
                            {seeEditeurCompetence ?  <EyeOff onClick={handleEditeurCompetences} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurCompetences} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                            {data.competences.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,competences:{...prev.competences,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                            <Circle onClick={()=>setData(prev=>({...prev,competences:{...prev.competences,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>}  
                          </div>
                        </div>
                        {seeEditeurCompetence && <EditeurQuillSansSSR  valeurChamp={valeurChampCompetence} SetValueChamp={setValeurChampCompetence}/>}
                      </div>
                    </div>


                    <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px]">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[1.3rem]">Langues</span>
                          <div className="flex items-center gap-[20px]">
                            {seeEditeurLangue ?  <EyeOff onClick={handleEditeurLangues} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurLangues} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                            {data.langues.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,langues:{...prev.langues,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                            <Circle onClick={()=>setData(prev=>({...prev,langues:{...prev.langues,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>} 
                          </div>
                        </div>
                        {seeEditeurLangue && <EditeurQuillSansSSR  valeurChamp={valeurChampLangue} SetValueChamp={setValeurChampLangue}/>}
                      </div>
                    </div>


                    <div className="rounded-[10px] border boder-1 border-gray-200 p-[15px]">
                      <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[1.3rem]">Intérêts</span>
                          <div className="flex items-center gap-[20px]">
                            {seeEditeurInteret ?  <EyeOff onClick={handleEditeurInterets} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>  : <Eye onClick={handleEditeurInterets} color="#5e5e5e" strokeWidth={3} className="cursor-pointer" size={15}/>   }
                                {data.interets.display ?  <CircleOff  onClick={()=>setData(prev=>({...prev,interets:{...prev.interets,display:false}}))}  strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/> : 
                            <Circle onClick={()=>setData(prev=>({...prev,interets:{...prev.interets,display:true}}))} strokeWidth={3} color="#f25353" className="cursor-pointer" size={15}/>} 
                          </div>
                        </div>
                        {seeEditeurInteret && <EditeurQuillSansSSR  valeurChamp={valeurChampInteret} SetValueChamp={setValeurChampInteret}/>}
                      </div>
                    </div>

                      {instanceChampPers.map(id=>{
                          return <ChampPersonnaliseCompetenceLangue key={id} id={id} functionDelete={deleteInstanceChampPers}/>
                        })}



                    <button onClick={addinstanceChampPers}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] cursor-pointer text-[1.3rem] text-white rounded-[7px] font-semibold" >+ Ajouter un champ</button>




            </div>
          
         </div>

     </div>                 

  )
}
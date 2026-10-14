"use client"

import { ArrowDownToLine,MoveVertical,Settings2,Fullscreen } from 'lucide-react';
import Link from "next/link";
import logo from "@/public/Images/logo.png";
import Image from "next/image"
import "@/app/styles/header-editeur.css"
import {Sketch } from '@uiw/react-color';
import "@/app/styles/sketch.css"
import { useRef, useState } from 'react';
import {  motion } from "motion/react"
import {useRouter, useParams, usePathname } from 'next/navigation'
import { useTransfereDonnees } from '../../context/transfere-donnees-context';
import { useOnClickOutside } from 'usehooks-ts';
import dynamic from "next/dynamic";

const BoutonTelechargerCv = dynamic(
  () => import('./ButtonTelechargerCv'),
  { 
    ssr: false,
  }
);



export default function DashboardHeader(){
  const [chooseColorPrimaire,setChooseColorPrimaire]=useState(false)
  const [chooseColorSecondaire,setChooseColorSecondaire]=useState(false)
  const [chooseColorTertiaire,setChooseColorTertiaire]=useState(false)
  const [seeBarMenu,setSeeBarMenu]=useState(false)
  const containerCoolorPrincipaleRef=useRef(null)
  const containerBarMenuref=useRef(null)
  const containerCoolorSecondaireRef=useRef(null)
  const containerCoolorTertiaireRef=useRef(null)
  const {data,setData}=useTransfereDonnees()
  const params = useParams()
  const slug=params.slug
    const router = useRouter(); 
    const pathname = usePathname();

  const family=[
    'Helvetica',
    'Helvetica-Bold',
    'Helvetica-Oblique',
    'Helvetica-BoldOblique',
    'Courier',
    'Courier-Bold',
    'Courier-Oblique',
    'Courier-BoldOblique',
    'Times-Roman',
    'Times-Bold',
    'Times-Italic',
    'Times-BoldItalic',
  ]


    useOnClickOutside(containerCoolorPrincipaleRef, () => {
      if (chooseColorPrimaire) setChooseColorPrimaire(false);
    });

    useOnClickOutside(containerCoolorPrincipaleRef, () => {
      if (chooseColorSecondaire) setChooseColorSecondaire(false);
    });

    useOnClickOutside(containerCoolorTertiaireRef, () => {
      if (chooseColorTertiaire) setChooseColorTertiaire(false);
    });

    useOnClickOutside(containerBarMenuref, () => {
      if (seeBarMenu) setSeeBarMenu(false);
    });


    function handleAuthentification(path) {
     router.push( `/${path}?callbackUrl=${encodeURIComponent(pathname)}` );
  }




  
  return(
    <header className='flex justify-between items-center w-full p-[10px] h-[55px] z-10   border-b border-gray-300'>

      <div className='shrink-0'>
        <Link href={"/"}>
            <Image alt='logo' src={logo} width={45}/>
        </Link>
      </div>

      <div className='flex items-center gap-15 max-[840px]:gap-[5px] max-[450px]:gap-[15px]'>
      
          <div ref={containerCoolorPrincipaleRef} className='relative'>
                <div onClick={()=>setChooseColorPrimaire((prev)=>!prev)} className="w-[25px] h-[25px] rounded-[50%] cursor-pointer" style={{background:data.miseEnPage.colorPrincipale}}></div>
                  {
                    chooseColorPrimaire &&   <motion.div className='absolute top-[35px] max-[450px]:left-[-150px]' transition={{
                      duration: 0.4,
                  }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Sketch className='sketch'
                    color={data.miseEnPage.colorPrincipale}
                    onChange={(color) => {
                      setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,colorPrincipale:color.hex}}))
                    }}
                  />
                  </motion.div>
                  }
          </div>

          <div ref={containerCoolorSecondaireRef} className='relative'>
                <div onClick={()=>setChooseColorSecondaire((prev)=>!prev)} className="w-[25px] h-[25px] rounded-[50%] cursor-pointer" style={{background:data.miseEnPage.colorSecondaire}}></div>
                 
                  {
                    chooseColorSecondaire &&   <motion.div className='absolute top-[35px] max-[450px]:left-[-150px]' transition={{
                      duration: 0.4,
                  }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Sketch className='sketch'
                    color={data.miseEnPage.colorSecondaire}
                    onChange={(color) => {
                      setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,colorSecondaire:color.hex}}))
                    }}
                  />
                  </motion.div>
                  }
          </div>


          <div ref={containerCoolorTertiaireRef} className='relative'>
                <div onClick={()=>setChooseColorTertiaire((prev)=>!prev)}  className="w-[25px] h-[25px] rounded-[50%] cursor-pointer" style={{background:data.miseEnPage.colorTertiaire}}></div>
                 
                  {
                    chooseColorTertiaire &&   <motion.div className='absolute top-[35px] max-[450px]:left-[-150px]' transition={{
                      duration: 0.4,
                  }} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Sketch className='sketch'
                    color={data.miseEnPage.colorTertiaire}
                    onChange={(color) => {
                      setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,colorTertiaire:color.hex}}))
                    }}
                  />
                  </motion.div>
                  }
          </div>



        <div className='flex items-center gap-15 max-[840px]:gap-[5px] max-[450px]:hidden'>

          <select className='text-[1.3rem] border border-1 border-gray-300 rounded-[5px] py-[5px]  outline-none focus:border-2 hover:border-[#5c5792] px-[10px]' >
            {
              family.map((el,index)=>{
                return <option onClick={()=>{
                   setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,family:el}}))
                }} key={index}>{el}</option>
              })
            }
          </select>
          

          <select className='text-[1.3rem] border border-1 border-gray-300 rounded-[5px] py-[5px]  outline-none focus:border-2 hover:border-[#5c5792] px-[10px]' >
            <option onClick={()=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,taille:14}}))} >L</option>
            <option onClick={()=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,taille:15.5}}))} >XL</option>
            <option  onClick={()=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,taille:16.5}}))}>XXL</option>
          </select>


          <section className='flex items-center gap-[5px]'>
            <MoveVertical  size={16}  />
            <input className='text-[1.3rem] w-[80px] border border-1 border-gray-300 rounded-[5px] py-[5px]  outline-none focus:border-2 hover:border-[#5c5792] px-[10px]' type="number" step={0.5} value={data.miseEnPage.margeReference } onChange={(e)=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,margeReference:e.target.value}}))} />
          </section>

          </div>


      </div>


      <div className='flex items-center gap-[3px] max-[860px]:hidden'>
   
          <BoutonTelechargerCv slug={slug} />
          <button onClick={()=>handleAuthentification("Connexion")}  className="border border-1 cursor-pointer border-gray-300 px-[15px] py-[5px] rounded-[7px] font-semibold">Connexion</button>
          <button onClick={()=>handleAuthentification("Inscription")} className="border border-1 cursor-pointer border-gray-300 px-[15px] py-[5px] rounded-[7px] font-semibold">Inscription</button>
      </div>
   




    <div className="max-[860px]:block hidden" ref={containerBarMenuref}>

        <div onClick={()=>setSeeBarMenu((prev)=>!prev)} >
            <Settings2  size={20} className="cursor-pointer" color="#3c3c3c"/>
        </div>


        <div className={` ${seeBarMenu ? "block" : "hidden"} shadow-[-2px_4px_7px_0px_gray] p-[15px] rounded-[0_0_10px_10px] bg-white absolute top-[55px] right-0`}>
              
          <div className='flex flex-col items-center gap-[10px]  '>

            <div className='max-[450px]:block hidden '>
              <div className='flex flex-col items-center gap-[10px]'>
              <select className='text-[1.3rem] border border-1 border-gray-300 rounded-[5px] py-[5px]  outline-none focus:border-2 hover:border-[#5c5792] px-[10px]' >
                {
                  family.map((el,index)=>{
                    return <option onClick={()=>{
                      setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,family:el}}))
                    }} key={index}>{el}</option>
                  })
                }
              </select>
              

              <section className='flex items-center gap-[5px]'>
                <MoveVertical  size={16}  />
                <input className='text-[1.3rem] w-[80px] border border-1 border-gray-300 rounded-[5px] py-[5px]  outline-none focus:border-2 hover:border-[#5c5792] px-[10px]' type="number" step={0.5} value={data.miseEnPage.margeReference } onChange={(e)=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,margeReference:e.target.value}}))} />
              </section>
              

              <select className='text-[1.3rem] border border-1 border-gray-300 rounded-[5px] py-[5px]  outline-none focus:border-2 hover:border-[#5c5792] px-[10px]' >
                <option onClick={()=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,taille:14}}))} >L</option>
                <option onClick={()=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,taille:15.5}}))} >XL</option>
                <option  onClick={()=>setData(prev=>({...prev,miseEnPage:{...prev.miseEnPage,taille:16.5}}))}>XXL</option>
              </select>
            </div>

            </div>
        
        
              <BoutonTelechargerCv slug={slug} />
              <button onClick={()=>handleAuthentification("Connexion")}  className="border border-1 cursor-pointer border-gray-300 px-[15px] py-[5px] rounded-[7px] font-semibold" href={"services"}>Connexion</button>
              <button onClick={()=>handleAuthentification("Inscription")}  className="border border-1 cursor-pointer border-gray-300 px-[15px] py-[5px] rounded-[7px] font-semibold" href={"services"}>Inscription</button>


          </div>

        </div>
    </div>



    </header>
  )
}
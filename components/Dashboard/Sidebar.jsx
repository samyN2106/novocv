"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link"
import icone_espace_travail from "@/public/Images/espace-de-travail.png"
import icone_template from "@/public/Images/icone-template.png"
import logo from  "@/public/Images/logo.png"
import Image from "next/image"
import usePageName from '../../hooks/usePageName';
import { PanelLeftClose } from 'lucide-react';
import { useState, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export default function DashboardSidebar({seeSidebar,setSeeSidebar,widthScreen}){

  const {namePage}=usePageName(usePathname())
   const sidebarRef=useRef(null)

  useOnClickOutside(sidebarRef, () => {
    if(widthScreen >=960)return
    if (seeSidebar) setSeeSidebar(false);
  });


  
  return(
    <aside ref={sidebarRef} className={`  ${!seeSidebar && "transform translate-x-[-220px]"} duration-500 max-[960px]:z-30  max-[960px]:shadow-[4px_8px_7px_0px_#cbcbcb]  border-r-1 border-gray-100 fixed  w-[210px] pr-[10px] h-screen bg-[#fdfdfd] shrink-0`}>
        <div className="mb-[20px] p-[10px] border-b border-b-1 border-gray-100 max-[960px]:flex items-center justify-between">
           <PanelLeftClose onClick={()=>setSeeSidebar(false)} className='cursor-pointer min-[960px]:hidden' strokeWidth={2} size={20} />
 
          <Link href={'/'}  className=""> <Image src={logo} className="mx-auto" alt="logo" width={45}/> </Link>
        </div>

        <div className="flex flex-col gap-4">
            <Link href={'/Dashboard/Resumes'} className={`flex items-center font-semibold rounded-[10px] p-[8px] gap-4 ${namePage=='Resumes'? 'bg-gray-200' : " "}`}> 
              <Image src={icone_espace_travail} alt="icone_espace_travail" width={20}/>
              Mon espace
            </Link>

            <Link href={'/Dashboard/Modeles-cv'} className={`flex items-center font-semibold hover:bg-gray-100  rounded-[10px] p-[8px] gap-4  ${namePage=='Modeles-cv'? 'bg-gray-200' : " "}`}> 
              <Image src={icone_template} alt="icone modeles de template" width={20}/>
              Modeles de CV
            </Link>

            {/* <Link href={'Dashboard/Resumes'} className="flex items-center font-semibold  hover:bg-gray-100  rounded-[10px] p-[8px] gap-4"> 
              <Image src={icone_template} alt="icone modeles de template" width={20}/>
              Modeles de Lettre de motivation
            </Link> */}
        </div>
    </aside>
  )
}
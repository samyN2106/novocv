"use client"
import { useSession } from "next-auth/react"
import { PanelLeftClose } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react"
export default function DashboardHeader({setSeeSidebar,widthScreen}){
  const { data: session,status } = useSession()

   const router = useRouter(); 
   const pathname = usePathname();

  function handleAuthentification(path) {
     router.push( `/${path}?callbackUrl=${encodeURIComponent(pathname)}` );
  }


  return(
    <header className='flex justify-between min-[960px]:justify-end items-center mb-20'>
      { 
       widthScreen<=960 && <PanelLeftClose onClick={()=>setSeeSidebar(true)} className='cursor-pointer shrink-0' strokeWidth={2} size={20} />
      }
      { !session ?
        <div className='flex gap-5'>
          <button onClick={()=>handleAuthentification("Inscription")} className="border border-1 border-gray-300 cursor-pointer px-[15px] py-[5px] bg-[#5c5792] text-white rounded-[7px] font-semibold" href={"Inscription"}>Inscription</button>
          <button onClick={()=>handleAuthentification("Connexion")} className="border border-1 cursor-pointer border-gray-300 px-[15px] py-[5px] bg-[#5c5792] text-white rounded-[7px] font-semibold" href={"Inscription"}>Connexion</button>
        </div>
        :
        <div className="flex items-center font-medium text-black"> 
                <span className="text-[#00c300] text-[20px]">•</span> {session.user.email} <span className="mx-3">/</span> <button onClick={() => signOut()} className="font-semibold underline cursor-pointer">deconnexion</button>
                </div>
      }
    </header>
  )
}
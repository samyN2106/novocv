'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/Images/logo.png"
import { motion } from "motion/react"
import {TextAlignJustify} from "lucide-react"
import {  useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react"
import { useOnClickOutside } from 'usehooks-ts';
export default function Header(){
  const { data: session,status } = useSession()


  const router = useRouter(); 
  const pathname = usePathname();

   const [seeNavbar,setSeeNavbar]=useState(false)
   const containerNavbar=useRef(null)



  function handleAuthentification(path) {
     router.push( `/${path}?callbackUrl=${encodeURIComponent(pathname)}` );
  }


   useOnClickOutside(containerNavbar, () => {
    if (seeNavbar) setSeeNavbar(false);
  });




  return(
    <header  className="max-w-[1200px] w-[80vw] bg-[#ffffffdb] fixed z-50 left-[50%]  backdrop-blur-[20px] translate-x-[-50%] top-[20px] rounded-[10px] p-[10px] shadow-[0px_0px_5px_0px_#bebebe] text-gray-700"> 
      <nav className="flex justify-between w-full items-center relative">
          <div className="shrink-0">
             <Link href={"/"}><Image src={logo} width={40} alt="logo"/></Link>
          </div>

          <div className="flex items-center gap-15 max-[700px]:hidden">
              <ul  className="flex items-center gap-[2.5rem] text-[1.3rem]  ">
                {/* <Link className="border border-1 border-gray-300 px-[15px] py-[5px] rounded-[7px] font-semibold" href={"Blog"}>Blog</Link> */}

                { status !=="authenticated" ? <div className="flex items-center gap-[2.5rem]"><button className="border border-1 border-gray-300 cursor-pointer px-[15px] py-[5px] bg-[#5c5792] text-white rounded-[7px] font-semibold" onClick={()=>handleAuthentification("Connexion")}>Connexion</button> 

                <button onClick={()=>handleAuthentification("Inscription")} className="border border-1 border-gray-300 cursor-pointer px-[15px] py-[5px] bg-[#5c5792] text-white rounded-[7px] font-semibold" >Inscription</button> </div>  :

                <div className="flex items-center font-medium text-black"> 
                <span className="text-[#00c300] text-[20px]">•</span> {session.user.email} <span className="mx-3">/</span> <button onClick={() => signOut()} className="font-semibold underline cursor-pointer">deconnexion</button>
                </div>
                }
              </ul>
              
          </div>
      



      <div className="max-[700px]:block hidden" ref={containerNavbar}>
          <div onClick={() => setSeeNavbar((prev) => !prev)} className="cursor-pointer">
            <TextAlignJustify size={20} />
          </div>


        {seeNavbar && <motion.div  className="absolute top-[38px] bg-white p-[20px] right-0 rounded-[0_0_10px_10px] shadow-[0px_3px_6px_0px_#616161]" transition={{
                duration: 0.4,
            }} initial={{ scale: 0 }} animate={{ scale: 1 }}>

            <div className="flex flex-col items-center gap-[15px] text-[1.3rem]">
              {/* <Link className="border border-1 border-gray-300 px-[15px] py-[5px] rounded-[7px] font-semibold" href={"Blog"}>Blog</Link> */}
              { status !=="authenticated" ?
              <div className="flex flex-col items-center gap-[15px]"> <button onClick={()=>handleAuthentification("Connexion")}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] text-white rounded-[7px] font-semibold cursor-pointer" href={"Inscription"}>Connexion</button>
              <button onClick={()=>handleAuthentification("Inscription")}  className="border border-1 border-gray-300 px-[15px] py-[5px] bg-[#5c5792] text-white rounded-[7px] font-semibold cursor-pointer" href={"Inscription"}>Inscription</button> </div>
              :
                <div className="flex flex-col items-center font-medium text-black"> 
                <div><span className="text-[#00c300] text-[20px]">•</span> {session.user.email} </div>  <button onClick={() => signOut()} className="font-semibold underline cursor-pointer">deconnexion</button>
                </div>
              }
            </div>
         </motion.div>}

         </div>

        </nav>
    </header>
  )
}
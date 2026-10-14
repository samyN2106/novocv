"use client"
import Link from "next/link"
import Image from "next/image"
import useWindowSize from "@/hooks/useWindowSize"
import { templates } from "@/lib/detail-templates"



export default function ModelesCvComponent(){
  const {widthScreen} = useWindowSize()


  return(
        <main className="flex flex-col gap-[40px]  max-w-[1200px]  mx-auto">
          <div>
            <h1 className="text-[3rem] font-semibold">Modeles de cv</h1>
          </div>

          <div className="grid grid-cols-4 justify-items-center gap-8 max-[1250px]:grid-cols-3  max-[1020px]:grid-cols-2 max-[530px]:grid-cols-1 ">
            {
              templates.map((modele)=>{
               return (
                <div key={modele.nom} className="shrink-0 flex flex-col items-center  pb-[7px] w-[250px]  shadow-[0px_0px_7px_0px_#b6b6b6] hover:scale-[1.04] duration-500 relative cursor-pointer max-[530px]:w-[340px]">
                  <Link href={`/editeur-cv/${modele.slug}`} className="w-full h-full absolute"></Link>
                    <Image className="border-b border-b-gray-200" src={modele.src} width={ (widthScreen && widthScreen) <=530 ? 340 : 250}    alt="modele cv"/> 
                    <div   className="flex flex-col items-center text-center gap-2 w-full">
                      <p className="text-[17px] font-semibold">{modele.genre}</p>
                      <span className="text-[14px] font-bold text-[#808080]">{modele.type}</span>
                      <Link className="border z-10 shadow-[0px_0px_7px_0px_#b6b6b6]  border-1 border-gray-300 px-[20px] py-[9px] bg-[#5c5792] text-white rounded-[7px] font-semibold" href={`/editeur-cv/${modele.slug}`}>Utiliser ce modele</Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
          
        </main>
    // </section>
  )
}
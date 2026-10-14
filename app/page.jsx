import Image from "next/image";
import Header from "@/components/layout/Header";
import Cercles from "@/components/layout/Cercles"
import stripes from "@/public/Images/stripes.svg"
import Link from "next/link";
import EmblaCarousel from "@/components/carousel";





export default function Home() {
  return (
    <>
    <Cercles/>
    <Header/>
    <main>
          <div className="relative -z-[100] flex justify-center after:absolute">
            <Image src={stripes} width={800} className="" alt="stripes"/>
            <div className="w-full h-[450px] absolute bottom-[-200px]  shadow-[0_0_20px_6px_#F5F5F5] bg-[#F5F5F5] filter blur-[95px] rounded-[50%]"></div>
          </div>
          <section className="max-w-[1200px] w-[90vw] absolute top-[180px] left-[50%] translate-x-[-50%] flex flex-col items-center gap-[20px]">
            <h1 className="text-[6rem] text-center font-bold text-[#141414] leading-[1.1] max-[445px]:text-[50px]">
                Transforme tes candidatures en
                <br/>opportunités.
            </h1>
            <p className="text-gray-600 text-center text-[1.9rem] font-medium ">Simplifie la rédaction, maximise tes chances d’embauche.</p>
            <div className="flex items-center">
               <Link href={'Dashboard/Resumes'} className="bg-[#5c5792] hover:bg-[#5f5b89] group shadow-[0px_0px_7px_0px_#a3a3a3]  px-[20px] py-[9px] text-[1.4rem] font-semibold text-[#fffdfdde] rounded-[7px]">
                Commencer <span className="group-hover:ml-[5px] duration-75"> -&gt;</span>
               </Link>
            </div>
            
            <EmblaCarousel/>
          </section>
    </main>
    </>
  );
}

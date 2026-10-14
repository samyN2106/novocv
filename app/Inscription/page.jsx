import InscriptionComponent from "@/components/Inscription"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export async function generateMetadata(){
  return{
    title: "Inscription | novocv",
  }
}

export default async function InscriptionPage(){
      const session= await  auth();

      if(session){
        return redirect('/')
      }

   return <InscriptionComponent/>
}
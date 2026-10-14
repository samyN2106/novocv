import ConnexionComponent from "@/components/Connexion";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export async function generateMetadata(){
  return{
    title: "Connexion | novocv",
  }
}

export default async function ConnexionPage(){
   const session = await  auth();
  
        if(session){
          return redirect('/')
        }
   return <ConnexionComponent/>
}
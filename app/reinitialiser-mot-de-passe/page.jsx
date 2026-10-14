import ReinitisalisationPwdComponent from "@/components/ReinitialiserPassword";


export async function generateMetadata(){
  return{
    title: "Reinitialiser-mot-de-passe | novocv",
  }
}


export default function ReinitisalisationPwdPage(){
   return <ReinitisalisationPwdComponent/>
}
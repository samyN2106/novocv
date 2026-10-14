import ModelesCvComponent from "@/components/Dashboard/Modeles-cv";

export async function generateMetadata(){
  return{
    title: "Modeles-cv | Dashboard | novocv",
  }
}


export default function ModelesCvPage(){
  return <ModelesCvComponent/>
}
import EditeurComponent from "@/components/Editeur";


export async function generateMetadata({params}){
  const { slug } = await params
  return{
    title: `${slug} | Editeur | novocv`,
  }
}


export  default async function Editeur({ params }){

  const { slug } = await params
 
  return (<EditeurComponent slug={slug}/>)
}
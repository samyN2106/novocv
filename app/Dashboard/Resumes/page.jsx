
import ResumesPageComponent from "@/components/Dashboard/Resumes"


export async function generateMetadata(){
  return{
    title: "Resumes | Dashboard | novocv",
  }
}


export default function ResumesPage(){
  return <ResumesPageComponent/>

}
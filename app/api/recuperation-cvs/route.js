import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"
export  async function GET(){
  const session = await auth()
  if(!session) return Response.json({status:401})

  try{

    const cvs = await prisma.CV.findMany({
      where:{
        userId:session.user.id
      }
    })

    return Response.json({
      data:cvs
    },{status:200})
    

  }catch(err){
    console.log("erreur de recuperaion des cv:",err);
    return Response.json({error:"Internal Server Error !"},{status:500})
  }

}
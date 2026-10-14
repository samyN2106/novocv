"use server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;
import { headers } from "next/headers";


const redis = Redis . fromEnv (); 
const rateLimiter = new  Ratelimit ({ 
redis, 
limiter : Ratelimit . slidingWindow ( 3 , '60 s' ), 
​​}); 
export async function SupprimerCvAction(CvId){
  try{

     const header = await headers();
      const ip = header.get("x-forwarded-for") || "127.0.0.1";
      const {success}=await rateLimiter.limit(ip)
      if(!success){
      return{
        success:false,
        error:"Trop d'actions effectuées. Patientez réessayez dans un  instant ! "
      }
    }

  if(!CvId) return {success:false,error:"Erreur de recuperation du cv"}

  const session=await auth()

  if(!session?.user)return {success:false,error:"authentifiez-vous"}


     

    const cvDelete=await prisma.CV.delete({
      where:{
        id:CvId
      }
    })

    const cheminImage = cvDelete.imgProfil?.srcDb;

     if (cheminImage) {
    
    const { data, error } = await supabase
      .storage
      .from('images-cv-edition') 
      .remove([cheminImage]); 

    if (error) {
      console.error("Erreur Supabase Storage :", error.message);
    } else {
      console.log("Image supprimée du Storage avec succès :", data);
    }
  }

    return {message:"success",success:true}


  }catch(err){
    console.error("erreur de suppression du cv:",err)
    return {success:false,error:"Erreur du serveur !!"}
  }

}
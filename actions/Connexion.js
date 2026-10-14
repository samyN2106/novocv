"use server"
import { ConnexionFormSchema } from "@/lib/zod";
import { signIn } from "@/lib/auth"; 
import { getSafeCallbackUrl } from "@/lib/callbackUrl";
import DOMPurify from 'isomorphic-dompurify'
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;
import { headers } from "next/headers";
import { redirect } from "next/navigation";


function sanitizeInput(rawText) {
  return DOMPurify.sanitize(rawText, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }).trim();
}

const redis = Redis . fromEnv (); 
const rateLimiter = new  Ratelimit ({ 
redis, 
limiter : Ratelimit . slidingWindow ( 3 , '60 s' ), 
​​}); 

export async function ConnexionAction(state,formData){
  const email = formData.get("email");
  const password = formData.get("password");
  const tmcValue = formData.get("tmc");
  const callbackUrl = getSafeCallbackUrl(
      formData.get("callbackUrl")
    );

  


  try{

    const header = await headers();
    const ip = header.get("x-forwarded-for") || "127.0.0.1";

    const {success}=await rateLimiter.limit(ip)
    
    if(!success){
      return{
        type:"erreur",
        message:"Trop d'actions effectuées. Patientez réessayez dans un  instant ! "
      }
    }

  

   const validatedFields = ConnexionFormSchema.safeParse({
     Email:email,
     Password:password,
  })            


  if(!validatedFields.success){
    return {
      type: "erreur",
      message: "Impossible de finaliser l'inscription avec les informations fournies.",
      values: { email:email, password:password, tmc:tmcValue },
    }
  }
 

 

   const { Email, Password } = validatedFields.data



   const cleanEmail=sanitizeInput(Email)
   const cleanPassword=sanitizeInput(Password)



    await signIn("credentials",{
      email:cleanEmail,
      password:cleanPassword,
      rememberMe:tmcValue == 'true',
      redirect: false,
    })


      return {
        type:"success",
    }

  

  }catch(Err){

    return {
      type:"erreur",
      message:"Impossible de finaliser l'inscription avec les informations fournies.",
    }
  }





}
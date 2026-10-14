"use server"
import { ConnexionFormSchema } from "@/lib/zod";
import { signIn } from "@/lib/auth"; 
import { getSafeCallbackUrl } from "@/lib/callbackUrl";
import DOMPurify from 'isomorphic-dompurify'
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;
import { headers } from "next/headers";


 function sanitizeInput(rawHtml) {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [], // Autorise uniquement le formatage de base
    ALLOWED_ATTR: [], // Bloque tous les attributs (comme 'onerror', 'onload', 'href' suspects)
    KEEP_CONTENT: false
  });
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
    email: email,
    password: password,
  })

  if(!validatedFields.success){
    return {
      type: "erreur",
      message: "Erreur connexion.",
      values: { email:email, password:password, tmc:tmcValue },
    }
  }

      const callbackUrl = getSafeCallbackUrl(
      formData.get("callbackUrl")
    );

   const { Email, Password } = validatedFields.data
   const cleanEmail=sanitizeInput(Email)
   const cleanPassword=sanitizeInput(Password)



    await signIn("credentials",{
      email:cleanEmail,
      password:cleanPassword,
      rememberMe:tmcValue == 'true',
      redirectTo: encodeURIComponent(callbackUrl),
    })

  }catch(Err){

  if (Err?.type === "CredentialsSignin") {
    return {
      type: "erreur",
      message: "Erreur de connexion",
      values: { email, password, tmc:tmcValue}, 
    };
  }

    console.error("erreur du serveur lors de la connnexion:",Err)

    return {
      type:"erreur",
      message:"Erreur du serveur"

    }

  }



}
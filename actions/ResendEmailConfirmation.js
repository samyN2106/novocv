 "use server"
 
 import { Ratelimit } from  '@upstash/ratelimit' ; 
 import { Redis } from  '@upstash/redis' ;
 import { headers } from "next/headers";
 import prisma from "@/lib/prisma"; 
 import { getSafeCallbackUrl } from "@/lib/callbackUrl";
 import DOMPurify from 'isomorphic-dompurify'
 import { randomBytes, createHash } from "crypto";
 import { Resend } from 'resend';
 import * as z from 'zod'
import ConfirmEmail from '@/components/email/confirmEmail';
 
function sanitizeInput(rawText) {
  return DOMPurify.sanitize(rawText, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }).trim();
}

const schema = z.object({
  email: z.string().email(),
  callbackUrl: z.string().optional(),
});



const redis = Redis . fromEnv (); 
const rateLimiter = new  Ratelimit ({ 
redis, 
limiter : Ratelimit . slidingWindow ( 3 , '60 s' ), 
​​}); 

export async function ResendEmailConfirmationAction(setResendEmail,formData){

  try{
     const header = await headers();
      const ip = header.get("x-forwarded-for") || "127.0.0.1";
  
      const {success}=await rateLimiter.limit(ip)
      
      if(!success){
        return{
          type:"erreur",
          message:"Trop d'actions effectuées. Patientez réessayez dans un  instant !  "
        }
      }


        const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

        
       if(!parsed.success){
        return {
          type:"erreur",
          message:"Impossible de finaliser l'inscription avec les informations fournies."
        }
       }

       const cleanEmail=sanitizeInput(parsed.data.email)


        const user=await prisma.user.findFirst({
                 where:{
                   email:cleanEmail.trim()
                 }
               })
               

        if(!user){
          return{
            type:"erreur",
            message:"Impossible de finaliser l'inscription avec les informations fournies."
          }
        }

         const oldToken=await prisma.emailVerificationToken.findFirst({
                 where:{
                   userId:user.id
                 }
               })

               if(!oldToken){
                    return{
                    type:"erreur",
                    message:"Impossible de finaliser l'inscription avec les informations fournies."
                  }
               }


            const callbackUrl = sanitizeInput(getSafeCallbackUrl(
            parsed.data.callbackUrl))
          const raw = randomBytes(32).toString("base64url");
          const newTokenHash = createHash("sha256").update(raw).digest("hex");

          await prisma.emailVerificationToken.update({
            where:{
              tokenHash:oldToken.tokenHash
            },
            data:{
              tokenHash:newTokenHash,
              expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
          })
              
           const resetUrl = `${process.env.APP_URL}/confirmer-email?raw=${raw}&callbackUrl=${encodeURIComponent(callbackUrl)}` 

           const resend = new Resend(process.env.RESEND_API_KEY);

               const { data, error } = await resend.emails.send({
                 from: 'Novocv <support@novocv.space>',
                 to: `${cleanEmail}`,
                 subject: "Confirmation d'email",
                 react: <ConfirmEmail url={resetUrl} />,
               });

                if (error) {
                  console.error("Erreur lors de l'envoi de l'e-mail de vérification du compte. :",error)
                  return Response.json({ type:"erreur",message:"Erreur lors de l'envoi de l'e-mail de vérification du compte. " });
                }


                 return({
                  type:"email send"
                })


  }catch(Err){

        console.error("Une erreur est survenue du serveur lors de l'inscription :", Err);

    return{
      type:"erreur",
      message:"Une erreur est survenue lors de l'inscription."
    }

  }


}
"use server"
import DOMPurify from 'isomorphic-dompurify'
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;
import { headers } from "next/headers"; 
import * as z from 'zod'
import prisma from '@/lib/prisma';
import { randomBytes, createHash } from "crypto";
import { Resend } from 'resend';
import ResetPasswordEmail from '@/components/email/resetPassword';
import { getSafeCallbackUrl } from "@/lib/callbackUrl";

 
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

const schema = z.object({
  email: z.string().email(),
  callbackUrl: z.string().optional(),
});

export async function ForgotPasswordAction(stateForgotPwd,formData){

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

       const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

       if(!parsed.success){
        return {
          type:"erreur",
          message:"Entrez un email valide"
        }
       }

       const cleanEmail=sanitizeInput(parsed.data.email)
       const callbackUrl=sanitizeInput(getSafeCallbackUrl(encodeURIComponent(parsed.data.callbackUrl)))


        const user=await prisma.user.findFirst({
          where:{
            email:cleanEmail.trim()
          }
        })

        if(!user){
          return{
            type:"erreur",
            message:"Erreur au niveau de l'email"
          }
        }


        const raw = randomBytes(32).toString("base64url");
        const tokenHash = createHash("sha256").update(raw).digest("hex");

      await prisma.passwordResetToken.create({
          data:{
            userId:user.id,
            tokenHash:tokenHash,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
          }
      })


        const resetUrl = `${process.env.APP_URL}/reinitialiser-mot-de-passe?raw=${raw}&&callbackUrl=${callbackUrl}` 


           const resend = new Resend(process.env.RESEND_API_KEY);
            
            const { data, error } = await resend.emails.send({
              from: 'Novocv <support@novocv.space>',
              to: `${cleanEmail}`,
              subject: "Confirmation d'email",
              react: <ResetPasswordEmail url={resetUrl} />,
            });

            if(error){
                console.error("erreur d'envoi de l'email de reinitialisation:",error)
              return{
                type:"erreur",
                message:"Erreur d'envoi de l'email de reinitialisation"
              }
            }

            return{
              type:"email send"
            }



  }catch(Err){

    console.error("Une erreur est survenue du serveur :", Err);

    return{
      type:"erreur",
      message:"Erreur serveur."
    }

  }

}
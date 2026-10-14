"use server"
import { InscriptionFormSchema } from "@/lib/zod";
import prisma from "@/lib/prisma"; 
import bcrypt from "bcrypt"
import { getSafeCallbackUrl } from "@/lib/callbackUrl";
import DOMPurify from 'isomorphic-dompurify'
import { randomBytes, createHash } from "crypto";
import { Resend } from 'resend';
import ConfirmEmail from "@/components/email/confirmEmail";
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;
import { headers } from "next/headers";

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

export async function InscriptionAction(state,formData){

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

   const validatedFields = InscriptionFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  const callbackUrl = sanitizeInput(getSafeCallbackUrl(
  formData.get("callbackUrl"))
);

  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      type: "erreur champ",
      values: { email:formData.get("email"), password:formData.get("password")}
    }
  }

   const { email, password } = validatedFields.data

   const cleanEmail=sanitizeInput(email).toLowerCase()
   const cleanPassword=sanitizeInput(password)



  const user = await prisma.user?.findUnique({
    where: {email:cleanEmail}
  })


  if(user){
    return {
      type:"erreur",
      message:"Impossible de finaliser l'inscription avec les informations fournies.",
       values: { email:formData.get("email"), password:formData.get("password"), tmc:formData.get("tmc") },
    }
  }

  const hashedPassword = await bcrypt.hash(cleanPassword, 10)


   const raw = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(raw).digest("hex");

    const newUser=await prisma.user.create({
      data:{
        email:cleanEmail,
        password:hashedPassword,
      }
    })

  await prisma.emailVerificationToken.create({
      data:{
        tokenHash:tokenHash,
        userId:newUser.id,
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
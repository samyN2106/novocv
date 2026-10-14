"use server"
import * as z from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import bcrypt from "bcrypt"
import prisma from '@/lib/prisma';
import { randomBytes, createHash } from "crypto";
import { headers } from "next/headers";
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;

const schema = z.object({
    raw: z.string().optional(),
    password: z
      .string()
      .min(8, { error: 'Le mot de passe doit contenir au moins 8 caractères' })
      .regex(/[a-zA-Z]/, { error: 'Le mot de passe doit contenir au moins une lettre' })
      .regex(/[0-9]/, { error: 'Le mot de passe doit contenir au moins un chiffre.' })
      .trim(),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});


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

export async function ReinitialisationPwdAction(state,formData){
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
    
  const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      type: "erreur champ",
      values: {password:formData.get("password")}
    }
  }

   const { password,raw } = validatedFields.data
   const cleanPassword=sanitizeInput(password)

   const hashedPassword = await bcrypt.hash(cleanPassword, 10)
   const tokenHash=createHash("sha256").update(raw).digest("hex")
   



  const row = await prisma.passwordResetToken.findFirst({
    where: {
      tokenHash: tokenHash,
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
  });


  if(!row){
    return {
     type:"erreur",
     message:"Ce lien de reinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien de reinitialisation."
  }}


    await prisma.passwordResetToken.update({
      where: {
        id: row.id,
      },
      data: {
        usedAt: new Date(),
        user: {
          update: {
            password: hashedPassword,
          },
        },
      },
    });

    return {
      type:"success"
    }

  }catch(err){
    console.error("erreur de modification de mot de passe:",err)
    return {type:"erreur",erreur:"erreur serveur"}
  }






}
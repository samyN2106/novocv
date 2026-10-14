import prisma from "@/lib/prisma"
import { randomBytes, createHash } from "crypto";
import { Ratelimit } from  '@upstash/ratelimit' ; 
import { Redis } from  '@upstash/redis' ;
import { headers } from "next/headers"; 


const redis = Redis . fromEnv (); 
const rateLimiter = new  Ratelimit ({ 
redis, 
limiter : Ratelimit . slidingWindow ( 3 , '60 s' ), 
​​}); 
export async function POST(req){
  const body=await req.json()
  try{
    const ip=req.headers.get("x-forwarded-for") || "127.0.0.1";

    const {success}=await rateLimiter.limit(ip)

    if(!success){
      return Response.json({error:"Trop d'actions effectuées. Patientez un instant."},{status:400})
    }

  const token=body.raw || null

  
  if(!token){
    return Response.json(
      {error:"Le lien de vérification est invalide ou incomplet. Veuillez utiliser le lien reçu par e-mail."},
      { status: 400 }
    )
  }
  
  const tokenHash=createHash("sha256").update(token).digest("hex");


  const row = await prisma.emailVerificationToken.findFirst({
    where: {
      tokenHash: tokenHash,
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
  });

  if(!row)return Response.json({
     error:"Ce lien de vérification est invalide ou a expiré. Veuillez demander un nouveau lien de confirmation."
  },{status:400})


    await prisma.emailVerificationToken.update({
      where: {
        id: row.id,
      },
      data: {
        usedAt: new Date(),
        user: {
          update: {
            emailVerified: new Date(),
          },
        },
      },
    });

    return Response.json({ok:true},{status:200})

  }catch(err){
    console.error("erreur de validation de l'email:",err)
    return Response.json({error:"erreur serveur"},{status:500})
  }



}
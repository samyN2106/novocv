"use server"
export default async function verifierTailleImageAction(ficher){

  if(!ficher)return{success:false,error:"Aucun ficher trouvé !"}

  const TAILLE_MAX = 2 * 1024 * 1024;

  if (ficher.size > TAILLE_MAX) {
    return{success:false ,error:"La taille du ficher depasse les 2 Mo !"}
  }

  return{success:true}


}
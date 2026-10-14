"use client"
import { ReinitialisationPwdAction } from "@/actions/ReinitialisationPwd";
import Loading from "@/components/loading";
import { CloudCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";

function FomulaireReinitialisation(){

    const searchParams = useSearchParams();
     const callbackUrl = searchParams.get("callbackUrl") || "/";
     const raw=searchParams.get("raw")

      const [state, action, pending] = useActionState(ReinitialisationPwdAction, undefined)

  return(

     <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">

        <div className="max-w-[400px] flex flex-col items-center justify-center   w-full">
            <div
               className="p-6 rounded-[10px] bg-white flex flex-col items-center justify-center  border border-slate-300 shadow-xs md:p-6 text-[14px]">
               <h1 className="text-slate-900 text-center text-4xl font-bold">Reinitialisation de mot de passe</h1>
                

                    {
                        state?.type==="erreur" && state?.message && (
                        <p className="text-red-500 text-[12px] mt-[15px]">{state.message}</p>
                        )
                     } 
          


            { state?.type==="success" ?
             <div className="flex flex-col items-center bg-white rounded-[10px] p-10 shadow-[1px_1px_13px_1px_gray] w-[80%] max-w-[400px]">
                  <CloudCheck color="#0cad0c" size={30} />
                  <p className="text-gray-800   text-2xl mt-[15px]">Mot de passe reinitialisé avec succes</p>
                  <Link  href={`/Connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                     className="w-full mt-[20px] py-2 px-3.5 text-center  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">Se connecter</Link>
               </div>
            :

                <form action={action} className="space-y-6 mt-10">

                  <input type="hidden" name="raw" value={raw} />
                  
                  <div>
                     <label htmlFor="password"
                        className="mb-2 text-slate-900 font-medium inline-block">Mot de passe</label>
                     <input defaultValue={state?.values?.password || ""}  type="password" id="password" name="password" placeholder="••••••••" required
                        className="px-3 py-2.5 text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />  
                        {
                            state?.type==="erreur champ" && state?.errors?.password && (
                              <p className="text-red-500 text-[10px] mt-0.5">{state.errors.password}</p>
                            )
                          }   
                  </div>

                  <div>
                     <label htmlFor="confirm-password"
                        className="mb-2 text-slate-900 font-medium  inline-block">Confirmez le mot de passe</label>
                     <input type="password" id="confirm-password" name="confirmPassword" placeholder="••••••••" required
                        className="px-3 py-2.5  text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />
                        {
                          state?.type==="erreur champ" && state?.errors?.confirmPassword && (
                            <p className="text-red-500 text-[10px] mt-0.5">{state.errors.confirmPassword}</p>
                          )
                        }  
                  </div>

                  <button type="submit" disabled={pending}  
                     className="w-full py-2 px-3.5  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">
                     {pending ? "Reinitialisation...." : "Reinitialiser"}</button>
               </form>
               }


              </div>
          </div>
     </main>

  )

}

export default function ReinitisalisationPwd(){


   return(
      <Suspense fallback={<Loading/>}>
         <FomulaireReinitialisation/>
      </Suspense>
   )

  
    
}
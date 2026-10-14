"use client"
import { InscriptionAction } from "@/actions/Inscription";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {MailCheck}from "lucide-react"
import { Suspense } from "react";
import Loading from "@/components/loading";
import { ResendEmailConfirmationAction } from "@/actions/ResendEmailConfirmation";
import Link from "next/link";


function FormulaireInscription(){
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/";
   const [state, action, pending] = useActionState(InscriptionAction, undefined)

   const [stateResendEmail, actionResendEMail, pendingResendEmail] = useActionState(ResendEmailConfirmationAction, undefined)
   const [resendEmail,setResendEmail]=useState(false)

      function handleGoogleLogin() { 
        signIn("google", { callbackUrl: callbackUrl || "/", }); 
     }


      return (
      <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
         { !resendEmail ?( (state?.type ==="email send" || stateResendEmail?.type ==="email send") ?
             <div className="flex flex-col items-center bg-white rounded-[10px] p-10 shadow-[1px_1px_13px_1px_gray] w-[80%] max-w-[400px]">
                  <MailCheck color="#0cad0c" size={30} />
                  <p className="text-gray-800   text-2xl mt-[15px]">Un e-mail de validation vient de s'envoler vers votre messagerie. Ouvrez-le et cliquez sur le bouton de confirmation pour activer votre compte et commencer l'aventure avec nous ! <span className="font-semibold">Veuillez confirmer votre compte pour pouvoir vous connecter. </span></p>

                    <div class="border-t border-slate-100 mt-5 pt-6 text-center">
                        <p class="text-xl text-slate-500 mb-2">Vous n'avez rien reçu ?</p>
                        <button onClick={()=>setResendEmail(true)} class="text-xl cursor-pointer font-semibold text-[#5c5792] hover:text-[#5c5792] hover:underline transition-colors focus:outline-none">
                        Renvoyer l'e-mail de confirmation
                        </button>
                     </div>

                  <Link href={`/Connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                     className="w-full text-center mt-[20px] py-2 px-3.5  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">Continuer</Link>
               </div>
             : 

         <div className="max-w-[400px]  w-full  w-full">
            <div
               className="p-6 rounded-[10px] bg-white border border-slate-300 shadow-xs md:p-6 text-[14px]">
               <h1 className="text-slate-900 text-center text-4xl font-bold">Inscription</h1>
           
               
              
                          {state?.type==="erreur" && (
                           <p className="text-red-500 text-[14px] mt-[15px]">{state.message}</p>
                           )
                          }


               <form action={action} className="space-y-6 mt-10">
                  <input type="hidden" name="callbackUrl" value={callbackUrl} />
                  <div>
                     <label htmlFor="email"
                        className="mb-2 text-slate-900 font-medium  inline-block">Email</label>
                     <input defaultValue={state?.values?.email || "" } type="email" id="email" name="email" placeholder="john@readymadeui.com" required
                        className="px-3 py-2.5  text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />     
                          {
                            state?.type==="erreur champ" && state?.errors?.email && (
                              <p className="text-red-500 text-[10px] mt-0.5">{state.errors.email}</p>
                            )
                          }    
                  </div>
                  <div>
                     <label htmlFor="password"
                        className="mb-2 text-slate-900 font-medium inline-block">Mot de passe</label>
                     <input defaultValue={state?.values?.password || ""} type="password" id="password" name="password" placeholder="••••••••" required
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
                     {pending ? "insciription...." : "S'inscrire"}</button>
               </form>

               <div className="mt-6 text-slate-900 text-center">Vous avez deja un compte? <Link href={`/Connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                  className="text-[#5c5792] hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792] rounded">
                  Connexion</Link>
               </div>

              <button onClick={handleGoogleLogin} type="button" className="w-full cursor-pointer rounded-[10px] flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5  text-gray-800">
                  <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                  S'inscrire avec google
              </button>

            </div>
         </div>
      ): 


       stateResendEmail?.type ==="email send" ? setResendEmail(false)
         :
       <div className="max-w-[400px]  w-full  w-full">
            <div
               className="p-6 rounded-[10px] bg-white border border-slate-300 shadow-xs md:p-6 text-[14px]">
               <h1 className="text-slate-900 text-center text-4xl font-bold">Entrez l'email à nouveau</h1>

                    {stateResendEmail?.type==="erreur" && (
                           <p className="text-red-500 text-[14px] mt-[15px]">stateResendEmail.message</p>
                           )
                          }


               <form action={actionResendEMail}  className="space-y-6 mt-10">
                  <input type="hidden" name="callbackUrl" value={callbackUrl} />
                  <div>
                     <label htmlFor="email"
                        className="mb-2 text-slate-900 font-medium  inline-block">Email</label>
                     <input type="email" id="email" name="email" placeholder="john@readymadeui.com" required
                        className="px-3 py-2.5  text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />
                  </div>

                  <button type="submit" 
                     className="w-full py-2 px-3.5  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">{pendingResendEmail ?"Envoi......." : "Envoyer"}</button>
               </form>

                </div>
            </div>
         
      
      }
      </main>
   );




}
export default  function InscriptionComponent() {

  
return(
   <Suspense fallback={<Loading/>}>
      <FormulaireInscription/>
   </Suspense>
)

  

 


  
}
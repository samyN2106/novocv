"use client"

import { ConnexionAction } from "@/actions/Connexion";
import { Suspense, useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ForgotPasswordAction } from "@/actions/ForgotPassword";
import Loading from "@/components/loading";
import { MailCheck } from "lucide-react";
import Link from "next/link";

function FormulaireConnexion(){
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [state, action, pending] = useActionState(ConnexionAction, undefined)
    
    const [stateForgotPwd, actionForgetPwd, pendinForgotPwd] = useActionState(ForgotPasswordAction, undefined)
    const [passwordForgot,setPasswordForgot]=useState(false)


   function handleGoogleLogin() { 
      signIn("google", { callbackUrl: callbackUrl || "/", }); 
   }

   
   return (
      <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
         <div className="max-w-[400px]  w-full flex flex-col justify-center   w-full items-center">

               { passwordForgot ? (

                  stateForgotPwd?.type==="email send"  ?
                  (
                  <div className="flex flex-col items-center bg-white rounded-[10px] p-10 shadow-[1px_1px_13px_1px_gray] w-[80%] max-w-[400px]">
                  <MailCheck color="#0cad0c" size={30} />
                     <p className="text-gray-800   text-2xl mt-[15px]">Un e-mail de reinitialisation vient de s'envoler vers votre messagerie. Ouvrez-le et cliquez sur le bouton de reinitialisation afin de creer un autre mot de passe.</p>

                        <Link onClick={()=>setPasswordForgot(false)}  href={`/Connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                           className="w-full mt-[20px] py-2 px-3.5 text-center  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">Continuer</Link>
                     </div>
                  )

                 : 
              
                   <div
                     className="p-6 rounded-[10px] bg-white border border-slate-300 shadow-xs md:p-6 text-[14px]">
                        <h1 className="text-slate-900 text-center text-4xl font-bold">Entrez l'email à nouveau</h1>

                       { 
                           stateForgotPwd?.type==="erreur" && stateForgotPwd?.message && (
                              <p className="text-red-500 text-[12px] mt-[15px]">{stateForgotPwd.message}</p>
                           )
                        } 

                     <form action={actionForgetPwd}  className="space-y-6 mt-10">
                           <input type="hidden" name="callbackUrl" value={callbackUrl} />
                           <div>
                              <label htmlFor="email"
                                 className="mb-2 text-slate-900 font-medium  inline-block">Email</label>
                              <input type="email" id="email" name="email" placeholder="john@readymadeui.com" required
                                 className="px-3 py-2.5  text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />
                           </div>

                           <button type="submit" 
                              className="w-full py-2 px-3.5  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">{pendinForgotPwd ? "envoi...." : "Envoyer"}</button>
                        </form>
               </div>
                 )  
               
               :
                  

            <div
               className="p-6 rounded-[10px] bg-white border border-slate-300 shadow-xs md:p-6 text-[14px]">
               <h1 className="text-slate-900 text-center text-4xl font-bold">Connexion</h1>
              { 
                state?.type==="erreur" && state?.message && (
                  <p className="text-red-500 text-[12px] mt-[15px]">{state.message}</p>
                )
              } 
                     <form action={action}  className="space-y-6 mt-10">
                        <input type="hidden" name="callbackUrl" value={callbackUrl} />
                        <div>
                           <label htmlFor="email"
                              className="mb-2 text-slate-900 font-medium  inline-block">Email</label>
                           <input defaultValue={state?.values?.email || "" } type="email" id="email" name="email" placeholder="john@readymadeui.com" required
                              className="px-3 py-2.5  text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />
                        </div>
                        <div>
                           <label htmlFor="password"
                              className="mb-2 text-slate-900 font-medium inline-block">Mot de passe</label>
                           <input defaultValue={state?.values?.password || ""}  type="password" id="password" name="password" placeholder="••••••••" required
                              className="px-3 py-2.5 text-slate-900 rounded-[10px] bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5c5792]" />  
                              <div className="flex justify-end ">
                                 <span onClick={()=>setPasswordForgot(true)} className="ml-1 text-[11px] cursor-pointer font-medium text-[#5c5792] underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">mot de passe oublie ?</span>
                              </div>
                        </div>


                        <div className="flex items-start flex-wrap gap-2">
                           <label className="flex items-center group has-[input:checked]:text-[#5c5792]">
                              <input value="true" defaultChecked={state?.values?.tmc === true || state?.values?.tmc === 'true'} id="tmc" name="tmc" type="checkbox"  className="sr-only" />
                              {/* Custom box */}
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-[#5c5792] bg-white group-has-[input:checked]:bg-[#5c5792] group-has-[input:checked]:outline-[#5c5792] group-focus-within:outline-2 group-focus-within:outline-[#5c5792]" aria-hidden="true">
                                 {/* Checkmark */}
                                 <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10"
                                    fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 5l3 3 7-7" />
                                 </svg>
                              </span>
                              <span className="ml-3 text-[11px] text-slate-700">
                                 Se souvenir de moi
                              </span>
                           </label>
                        </div>

                        <button type="submit" disabled={pending}
                           className="w-full py-2 px-3.5  rounded-[10px] font-semibold cursor-pointer tracking-wide text-white border border-[#5c5792] bg-[#5c5792] hover:bg-[#5c5792] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792]">
                           {pending ? "Connexion...." : "Se connecter"}</button>

                           <div className=" text-slate-900 text-center">Vous n'avez pas  de compte? <a href={`/Inscription?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                              className="text-[#5c5792] hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c5792] rounded">
                              Inscription</a>
                           </div>

                        <button onClick={handleGoogleLogin} type="button" className="w-full cursor-pointer rounded-[10px] flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5  text-gray-800">
                              <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                              Se connecter avec google
                        </button>
                     </form>
               </div>
               
            }


         </div>
      </main>
   );


}


export default  function Connexion() {

 return(
   <Suspense fallback={Loading}>
      <FormulaireConnexion/>
   </Suspense>
 )

}
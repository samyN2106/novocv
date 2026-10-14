"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import Link from "next/link";


function ContentConfirmerPwd(){

  const searchParams = useSearchParams();
  const raw=searchParams.get("raw")
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [pending,setPending]=useState(true)
  const [message,setMessage]=useState("")



  useEffect(()=>{
    setPending(true)
    async function inscriptionUser(){
      const reponse =await fetch("/api/inscription",{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            raw: raw,
         })
      })

      const resultat=await reponse.json()
      

      if(!reponse.ok){
        return (setMessage(resultat.error),
        setPending(false))
      }

      setPending(false)
      setMessage("success")

    }

    inscriptionUser()

  },[])




  return(

    <div className="bg-[#f6f9fc] font-sans h-screen flex flex-col items-center justify-center p-4">

  {/* <!-- Main Card Container --> */}
  <div className="w-full max-w-md bg-white border border-solid border-[#f0f0f0] p-[45px] rounded-xl shadow-sm text-center">
    
    
    <div className="flex justify-center mb-6">
      {/* <!-- You can swap this block with your actual  */}
      <img src="/Images/logo.png" width="40" height="33" /> 
    </div>



{ pending ?(
    <div>
    <p className="text-[20px] font-light text-gray-900 leading-[26px] mb-8">Verification.......</p>
  </div>

): !pending && message !== "success" ? (

     <>
      <div>
        <p className="text-[16px] font-light text-red-700 leading-[26px] mb-8">
          {message}
        </p>
      </div>
      </>

  

) : !pending &&  message === "success" &&(
  <>
      {/* <!-- Success Icon --> */}
      <div className="w-12 h-12 bg-green-50 text-green-500 flex items-center justify-center rounded-full mx-auto mb-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" width="2" viewBox="0 0 24 24">
          <path  d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      {/* <!-- Message Headers --> */}
      <h1 className="text-2xl font-bold text-[#404040] mb-3">
        Compte confirmé !
      </h1>
      
      <p className="text-base font-light text-[#404040] leading-[26px] mb-8">
        Félicitations, votre adresse e-mail a été validée avec succès. Vous pouvez maintenant vous connecter et profiter pleinement de <strong>novocv</strong>.
      </p>

      {/* <!-- Action Button (Using your branding color #5c5792) --> */}
      <Link href={`/Connexion?callbackUrl/${encodeURIComponent(callbackUrl)}`}
        className="block w-full bg-[#5c5792] hover:bg-[#4b467a] text-white text-[15px] font-medium py-[14px] px-[7px] rounded-[10px] text-center no-underline transition-colors duration-200 shadow-sm">
          Continuer 
      </Link>
    </>
 ) }

    {/* <!-- Footer Links --> */}
    {/* <div className="mt-8 pt-6 border-t border-solid border-[#f0f0f0] flex flex-col gap-2">
      <span className="text-xl text-gray-400">
        Besoin d'aide ? <a href="/support" className="text-gray-500 hover:underline">Contacter le support</a>
      </span>
    </div> */}

  </div>

</div>
  )

}

export default  function ConfirmerPwd(){

  return <Suspense fallback={<Loading/>}>
    <ContentConfirmerPwd/>
  </Suspense>
  
}
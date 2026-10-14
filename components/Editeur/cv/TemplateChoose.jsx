"use client"

import { useTransfereDonnees } from "@/context/transfere-donnees-context";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { templates } from "@/lib/detail-templates"

export default function Template({slug}){
    const {data,setData,dataLoaded}=useTransfereDonnees() 
    const template=templates.find(el=>el.slug===slug)
    const { data: session ,status} = useSession()
    
  useEffect(() => {
  if (status === "authenticated") return;

  function handleBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = "";
  }

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [status]);


     const Cv=template.ficher

    return <Cv data={data}  dataLoaded={dataLoaded} slug={slug} />

}
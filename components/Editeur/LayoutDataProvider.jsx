
"use client"
import { TransfereDonneesProvider } from "@/context/transfere-donnees-context";
import { useParams } from "next/navigation";

export default function DataProvider({children}){

  const params = useParams()
  const slug=params.slug

  return( <TransfereDonneesProvider slug={slug}>
    {children}
  </TransfereDonneesProvider>)


}
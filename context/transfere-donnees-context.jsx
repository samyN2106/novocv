import { createContext, useContext, useState } from "react";
import useDonneesCv from "../hooks/use-donnees-cv"

const TransfereDonnees=createContext()

export const useTransfereDonnees=()=>useContext(TransfereDonnees)

export const TransfereDonneesProvider=({children,slug})=>{
   const useData=useDonneesCv(slug)
  

  return(
    <TransfereDonnees.Provider value={useData}>
      {children}
    </TransfereDonnees.Provider>
  )
}


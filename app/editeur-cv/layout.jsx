import DataProvider from "@/components/Editeur/LayoutDataProvider";

export default function layoutEditeur({children}){
    
return(
  <DataProvider>
    {children}
  </DataProvider>)

}
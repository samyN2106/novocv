"use client"

import  ReactQuill  from  'react-quill-new' ; 
import  'react-quill-new/dist/quill.snow.css' ;
import "@/app/styles/quill-editeur.css";
import { useEffect, useRef, useState } from 'react';
import { useTransfereDonnees } from '../../context/transfere-donnees-context';


export default function EditeurQuill({valeurChamp,SetValueChamp,id,section}){


  const [valueEditeur,setValueEditeur]=useState(valeurChamp)
  const {setData}= useTransfereDonnees()

useEffect(()=>{
  if(!id){
    SetValueChamp(valueEditeur) 
    
  }else{
    if(section==="experience"){ 
      setData(prev=>({...prev,experiences:{...prev.experiences,content:prev.experiences.content.map(el=>{
        if(el.id===id){
          return {...el,content:valueEditeur}
        }
        return el
      })}}))
    }else if(section === "projets"){
          setData(prev=>({...prev,projets:{...prev.projets,content:prev.projets.content.map(el=>{
        if(el.id===id){
          return {...el,description:valueEditeur}
        }
        return el
      })}}))
    }
  }
  
},[valueEditeur])
   

const quillRef = useRef(null);



useEffect(() => {
  if (quillRef.current) {
    const editor = quillRef.current.getEditor();


    const handleTextChange = (delta, oldDelta, source) => {
      if (source === 'user') {
        // 2. On récupère la sélection actuelle du curseur
        const range = editor.getSelection();
        
        if (range) {
          // 3. On récupère le texte de la ligne où se trouve le curseur
          const [line] = editor.getLine(range.index);
          const lineText = line ? line.length() : 0;

          // 💡 L'ASTUCE : Si la ligne est complètement vide (longueur <= 1 car Quill compte le \n),
          // on laisse l'utilisateur effacer tranquillement. On ne force la puce que s'il y a du texte !
          if (lineText > 1) {
            editor.formatLine(range.index, 1, 'list', 'bullet');
          }
        }
      }
    };

    editor.on('text-change', handleTextChange);

    return () => {
      editor.off('text-change', handleTextChange);
    };
  }
}, []);


   const  modules = {
    toolbar: false
  };


  return(
    < ReactQuill modules={modules} ref={quillRef}  theme = "snow"  value = { valueEditeur }  onChange = { setValueEditeur }  />
  )
}
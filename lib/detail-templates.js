import cv_1 from "@/public/Images/cv/cv-1.jpg"
import cv_3 from "@/public/Images/cv/cv-3.png"
import cv_4 from "@/public/Images/cv/cv-4.png"
import cv_5 from "@/public/Images/cv/cv-5.jpg"
import cv_6 from "@/public/Images/cv/cv-6.jpg"
import cv_7 from "@/public/Images/cv/cv-7.jpg"
import cv_8 from "@/public/Images/cv/cv-8.jpg"
import cv_9 from "@/public/Images/cv/cv-9.jpg"

import dynamic from "next/dynamic";

import Cv1Pdf from '@/templates/cv-1/cv-1-pdf';


export const templates=[
  { nom:"cv-1", 
    src:cv_1 ,
     type:"Modèles Modernes",
     genre:"Modèle Moderne Créatif",
     idType:"1",
     tailleImg:180,
     borderRadiusImg:100,
     slug:"modele-moderne-creatif",
     colorPrincipale:"#4172f4",
     colorSecondaire: "#111111",
     colorTertiaire:"#666666",
     ficher :dynamic(()=>import("@/templates/cv-1/cv-1.jsx"),{ ssr: false } ),
     ficherPdf :Cv1Pdf
    },


  {nom:"cv-3", src:cv_3,type:"Modèles Modernes",genre:"Modèle Moderne épuré",slug:"modele-moderne-epure",},

  {nom:"cv-4", src:cv_4,type:"Modèles Modernes",genre:"Modèle Professionnel Moderne",slug:"modele-professionnel-moderne",},

  {nom:"cv-5", src:cv_5,type:"Modèles Professionnels / Corporatifs",genre:"Modèle Technique Corporatif",slug:"modele-technique-corporatif",},
  
  
  {nom:"cv-6", src:cv_6,type:"Modèles Épurés",genre:"Modèle Minimaliste Esthétique",slug:"modele-minimaliste-esthetique",},

  {nom:"cv-7", src:cv_7,type:"Modèles Professionnels / Corporatifs",genre:"Modèle Chronologique Structuré",slug:"modele-chronologique-structure"},

  {nom:"cv-8", src:cv_8,type:"Modèles Épurés",genre:"Modèle-Classique-épuré",slug:"modele-classique-epure"},

  {nom:"cv-9", src:cv_9,type:"Modèles Épurés",genre:"Modèle-Minimaliste-contemporain",slug:"modele-minimaliste-contemporain"}

]
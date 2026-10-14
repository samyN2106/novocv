import cv_1 from "@/public/Images/cv/cv-1.jpg"
import cv_2 from "@/public/Images/cv/cv-2.png"
import cv_3 from "@/public/Images/cv/cv-3.png"
import cv_4 from "@/public/Images/cv/cv-4.png"
import cv_5 from "@/public/Images/cv/cv-5.png"
// import cv_6 from "@/public/Images/cv/cv-6.png"
import cv_7 from "@/public/Images/cv/cv-7.png"
// import cv_8 from "@/public/Images/cv/cv-8.jpg"
// import cv_9 from "@/public/Images/cv/cv-9.jpg"

import dynamic from "next/dynamic";

import Cv1Pdf from '@/templates/cv-1/cv-1-pdf';
import Cv2Pdf from '@/templates/cv-2/cv-2-pdf';
import Cv3Pdf from '@/templates/cv-3/cv-3-pdf';
import Cv4Pdf from '@/templates/cv-4/cv-4-pdf';
import Cv5Pdf from '@/templates/cv-5/cv-5-pdf';
// import Cv6Pdf from '@/templates/cv-6/cv-6-pdf';
import Cv7Pdf from '@/templates/cv-7/cv-7-pdf';


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
    {
      nom: "cv-2",
      src: cv_2,
      type: "Modèles Modernes",
      genre: "Modèle Moderne Épuré",
      idType: "1",
      tailleImg: 250,
      borderRadiusImg: 0,
      slug: "modele-moderne-epure",
      colorPrincipale: "#c82027",
      colorSecondaire: "#c82027",
      colorTertiaire: "#666666",
      ficher: dynamic(
        () => import("@/templates/cv-2/cv-2.jsx"),
        { ssr: false }
      ),
      ficherPdf: Cv2Pdf
    },

    {
      nom: "cv-3",
      src: cv_3,
      type: "Modèles Modernes",
      genre: "Modèle Professionnel Moderne",
      idType: "1",
      tailleImg: 250,
      borderRadiusImg: 0,
      slug: "modele-professionnel-moderne",
      colorPrincipale: "#1B2A52",
      colorSecondaire: "#1B2A52",
      colorTertiaire: "#666666",
      ficher: dynamic(
        () => import("@/templates/cv-3/cv-3.jsx"),
        { ssr: false }
      ),
      ficherPdf: Cv3Pdf
    },

    {
      nom: "cv-4",
      src: cv_4,
      type: "Modèles Épurés",
      genre: "Modèle-Classique-épuré",
      idType: "3",
      tailleImg: 180,
      borderRadiusImg: 100,
      slug: "modele-classique-epure",
      colorPrincipale: "#EBEAE6",
      colorSecondaire: "#1E1E1E",
      colorTertiaire: "#555555",
      ficher: dynamic(
        () => import("@/templates/cv-4/cv-4.jsx"),
        { ssr: false }
      ),
      ficherPdf: Cv4Pdf
    },


    {
      nom: "cv-5",
      src: cv_5,
      type: "Modèles Professionnels / Corporatifs",
      genre: "Modèle Technique Corporatif",
      idType: "2",
      tailleImg: 140,
      borderRadiusImg: 0,
      slug: "modele-technique-corporatif",
      colorPrincipale: "#71808A",
      colorSecondaire: "#1E1E1E",
      colorTertiaire: "#333333",
      ficher: dynamic(
        () => import("@/templates/cv-5/cv-5.jsx"),
        { ssr: false }
      ),
      ficherPdf: Cv5Pdf
    },

    // {
    //   nom: "cv-6",
    //   src: cv_6,
    //   type: "Modèles Professionnels / Corporatifs",
    //   genre: "Modèle Chronologique Structuré",
    //   idType: "2",
    //   tailleImg: 160,
    //   borderRadiusImg: 0,
    //   slug: "modele-chronologique-structure",
    //   colorPrincipale: "#1E1E1E",
    //   colorSecondaire: "#1E1E1E",
    //   colorTertiaire: "#555555",
    //   ficher: dynamic(
    //     () => import("@/templates/cv-6/cv-6.jsx"),
    //     { ssr: false }
    //   ),
    //   ficherPdf: Cv6Pdf
    // },


    {
  nom: "cv-7",
  src: cv_7,
  type: "Modèles Épurés",
  genre: "Modèle-Minimaliste-contemporain",
  idType: "3",
  tailleImg: 190,
  borderRadiusImg: 100,
  slug: "modele-minimaliste-contemporain",
  colorPrincipale: "#2c5282",
  colorSecondaire: "#1E1E1E",
  colorTertiaire: "#555555",
  ficher: dynamic(
    () => import("@/templates/cv-7/cv-7.jsx"),
    { ssr: false }
  ),
  ficherPdf: Cv7Pdf
},


  // {nom:"cv-5", src:cv_5,type:"Modèles Professionnels / Corporatifs",genre:"Modèle Technique Corporatif",slug:"modele-technique-corporatif",},
  
  
  // {nom:"cv-6", src:cv_6,type:"Modèles Épurés",genre:"Modèle Minimaliste Esthétique",slug:"modele-minimaliste-esthetique",},

  // {nom:"cv-7", src:cv_7,type:"Modèles Professionnels / Corporatifs",genre:"Modèle Chronologique Structuré",slug:"modele-chronologique-structure"},

  // {nom:"cv-8", src:cv_8,type:"Modèles Épurés",genre:"Modèle-Classique-épuré",slug:"modele-classique-epure"},

  // {nom:"cv-9", src:cv_9,type:"Modèles Épurés",genre:"Modèle-Minimaliste-contemporain",slug:"modele-minimaliste-contemporain"}

]
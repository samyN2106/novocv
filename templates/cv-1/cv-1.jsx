
"use client"
import { useEffect, useRef,useState } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation'
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react"
import RegisterCvAction from "@/actions/RegisterCv"
import { success } from "zod";





export default function Cv1({data,dataLoaded}){
    


    const params = useParams()
    const slug=params.slug
    const template=templates.find(el=>el.slug===slug)
    const { data: session,status } = useSession()
    const dataRef = useRef(null);  
  

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
  dataRef.current=data
}, [data,status]);




useEffect(() => {
  return () => {
    if(!dataLoaded) return

    if(status === "authenticated" && dataRef.current){
      RegisterCvAction(template, dataRef.current);
    }
}
  
}, [dataLoaded,success]);




    let Taillereference=  data.miseEnPage.taille+5.5 
    let margeReference=data.miseEnPage.margeReference

    const valeurWithoutUlCompetence=String(data.competences.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPCompetence=handleRemplaceBalise(valeurWithoutUlCompetence,'li','p')
    const cleanHTMLValueCompetence = valueReplacedByPCompetence.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlLangue=String(data.langues.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPLangue=handleRemplaceBalise(valeurWithoutUlLangue,'li','p')
    const cleanHTMLValueLangue = valueReplacedByPLangue.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlInteret=String(data.interets.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPInteret=handleRemplaceBalise(valeurWithoutUlInteret,'li','p')
    const cleanHTMLValueInteret = valueReplacedByPInteret.replace(/&nbsp;/g, ' ');

    const sectionSidebarParentRef=useRef(null)
  




    useEffect(()=>{

     if(sectionSidebarParentRef.current){
            const allSections=sectionSidebarParentRef.current.querySelectorAll("section")
            for(let i=0;i<allSections.length;i++){
                if(allSections[i+1]){
                    const divider=allSections[i].querySelector(".divider")
                    if(!divider){
                            allSections[i].insertAdjacentHTML('beforeend', '<div class="divider"></div>');
                    }
                }else{
                    if(allSections[i].querySelector(".divider")){
                        allSections[i].querySelector(".divider").remove()
                    }
                }
            }
        }
        
    },[,data])
       
        

  
  

  return(
    <>
         <style>{`

.cv-container {
${
  (()=>{
    switch(data.miseEnPage.family){
        case "Helvetica" :
            return `font-family: ${data.miseEnPage.family};`
        
        case "Helvetica-Bold" :
            return `font-family: Helvetica ; font-weight: bold;`
        
        case "Helvetica-Oblique" :
            return `font-family: Helvetica;  font-style: oblique;`
        
        case "Helvetica-BoldOblique" :
            return `font-family: Helvetica;  font-style: oblique; font-weight: bold ;`


        case "Courier" :
            return `font-family: ${data.miseEnPage.family};`
        
        case "Courier-Bold" : 
            return `font-family: Courier ; font-weight: bold;`

        case "Courier-Oblique" :
            return `font-family: Courier ; font-style: oblique;`

        case "Courier-BoldOblique" :
            return `font-family: Courier;  font-style: oblique; font-weight: bold;`

        case "Times-Roman":
            return `font-family: ${data.miseEnPage.family};`

        case "Times-Bold" :
            return `font-family: Times-Roman ; font-weight: bold;`
        
        case "Times-Italic" :
            return `font-family: Times-Roman ; font-style: italic;`

        case "Times-BoldItalic":
            return `font-family: Times-Roman;  font-style: oblique; font-weight: bold;`

    }

  })()
}
    width:100%;
    max-width:850px;
    height: auto;
    background-color: #ffffff;
    display: flex;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
}

/* ==========================================================================
   COLONNE GAUCHE (Bleu)
   ========================================================================== */
.sidebar {
    width: 35%;
    background-color: ${data.miseEnPage.colorPrincipale};
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap:${margeReference * 1.09}px;
    border-radius: ${data.imgProfil.display ? "160px 160px 0 0"  : "" } ;
    padding-top:20px;
    padding-bottom:20px;
    padding-left: ${40-Taillereference}px;
    padding-right: ${40-Taillereference }px
}

/* Photo de profil avec bordure blanche en arc */
.profile-container {
    margin-bottom: 10px;
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    border: 5px solid #ffffff;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
}

.profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position:top
}


/* Sections de la barre latérale */
.sidebar-section {
    width: 100%;
}


.sidebar-section h2 {
    font-size: ${Taillereference * 1.1}px;
    letter-spacing: 2px;
    font-weight: 500;
    margin-bottom: 10px;
    color:white
}

.bloc-information{
    display:flex;
    align-items:center;
    gap:5px;
}

.sidebar-section .divider {
    width: 60%;
    height: 2px;
    background-color: #ffffff;
    margin: 15px auto;
}

.sidebar-section p {
    font-size: ${Taillereference * 0.7}px;
    }

.sidebar-section a {
    font-size: ${Taillereference * 0.7}px;
    // line-height: ${Taillereference * 0.12}px;
    font-weight: 300;
    }
    
// .sidebar-section div{
//       margin-bottom: 8px;
//       display:flex;
//       justify-content:center;
//       align-items:center;
//       gap:5px
// }

.sidebar-section-ul{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap: ${margeReference *0.6}px;
}



/* ==========================================================================
   COLONNE DROITE (Blanche)
   ========================================================================== */

.main-content {
    width: 65%;
    padding-left: ${40-Taillereference}px;
    padding-right:${ 40-Taillereference }px;
    padding-top:40px;
    padding-bottom:25px;
    position:relative;
    display:flex;
    flex-direction:column;
    gap:${margeReference * 2.09}px;
}

/* En-tête */
.header {
    display:flex;
    flex-direction:column;
    gap:${margeReference * 1.09}px;
}

.header h1 {
    font-size: ${Taillereference * 2}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    line-height: 1.1;
}

.header .subtitle {
    font-size: ${Taillereference * 1.1}px;
    letter-spacing: 1px;
    color: ${data.miseEnPage.colorSecondaire};
}

.header .summary {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    text-align: justify;
}


.main-section h2 {
    font-size: ${Taillereference * 1.1}px;
    font-weight: 600;
    color: ${data.miseEnPage.colorSecondaire};
    margin-bottom: ${margeReference * 1.80}px;
}

/* Système de Chronologie (Timeline) */
.timeline {
    position: relative;
    border-left: 2px solid ${data.miseEnPage.colorPrincipale};
    padding-left: 20px;
    display:flex;
    flex-direction:column;
    gap:${margeReference * 1.7}px;
}


/* Les puces bleues de l'axe */
.timeline-dot {
    position: absolute;
    left: -26px;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${data.miseEnPage.colorPrincipale};
}

.timeline-content h3 {
    font-size: ${Taillereference *0.78}px;
    font-weight: 600;
    color: ${data.miseEnPage.colorSecondaire};
}

.timeline-content .date {
    font-size: ${Taillereference * 0.6}px;
    font-weight: 500;
    color: ${data.miseEnPage.colorPrincipale};
    margin-top: 3px;
    margin-bottom: 10px;
    display: block;
}

.timeline-content .school {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
}

.timeline-item{
position:relative
}

.timeline-content .contentUl {
    display: flex;
    flex-direction:column;
    gap:${margeReference * 0.8}px;;
}



.timeline-content .contentUl p{
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
}

.lien-projet{
    margin-left:15px;
    text-decoration:underline;
    color:${data.miseEnPage.colorPrincipale}
}

   `} </style>

  

    <div className="cv-container">
        
        {/* <!-- COLONNE GAUCHE (Sidebar) --> */}
        <aside ref={sectionSidebarParentRef} className="sidebar">
     {  data.imgProfil.display &&    
            <div className="profile-container">
                <div className="profile-frame">
                    {/* <!-- Remplacer par l'URL de votre photo --> */}
                    <Image alt="image profil" src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} fill className="profile-pic"/>
                </div>
            </div>}

            <section  className="sidebar-section">
                <h2>INFORMATIONS</h2>
                <div className="sidebar-section-ul ">
                    <div className="bloc-information">
                    {data.phone !=="" && <div style={{fontSize:"16px",margin:0}}>   <svg xmlns="http://www.w3.org/2000/svg"       width="1em" height="1em" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                                            </svg>
                                            </div>}
                    <p>{data.phone}</p>
                    </div>

                    <div className="bloc-information">
                    {data.email !=="" && <div style={{fontSize:"16px",margin:0}}>   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                                            <path d="M0 0h20v20H0z" fill="none" />
                                            <path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                                            </svg>
                                            </div>}
                    <p >{data.email}</p>
                    </div>


                    <div className="bloc-information">
                    {data.adresse !=="" && <div style={{fontSize:"16px",margin:0}}>   <svg xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em" viewBox="0 0 24 24">
                                                <path d="M0 0h24v24H0z" fill="none" />
                                                <path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                                            </svg>
                                            </div>}
                    <p>{data.adresse}</p>
                    </div>
                    {data.champPerso.length !=0 && data.champPerso.map((el,index)=>{
                    if(el.content != ""){
                        return <div key={index} className="bloc-information">
                        {el.iconeWeb && <span className="text-[16px]">{el.iconeWeb}</span>}
                        {el.url ? <a href={el.url}>{el.content}</a> : <p>{el.content}</p>}
                        </div>
                    }
                    })}
                </div>
            </section>

            {data.competences.display && <section  className="sidebar-section">
                <h2 >COMPÉTENCES</h2>
                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueCompetence}} className="sidebar-section-ul">
                </div>
            </section>  }

            {data.langues.display && <section  className="sidebar-section">
                <h2>LANGUES</h2>
                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueLangue}} className="sidebar-section-ul">
                </div>
            </section>}

            {data.interets.display && <section   className="sidebar-section">
                <h2>INTÉRÊTS</h2>
                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueInteret}} className="sidebar-section-ul">
                </div>
            </section> }
            
                     {data.champPersoBlocCompetenceLangue.length !=0 && data.champPersoBlocCompetenceLangue.map((el,index)=>{
                            const valeurWithoutUl=String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                            const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                        return <section key={index} className="sidebar-section">
                                <h2>{el.titre}</h2>
                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="sidebar-section-ul">
                                </div>
                            </section>
                    })}
        </aside>


        {/* <!-- COLONNE DROITE (Contenu Principal) --> */}
        <main className="main-content">

            <header className="header">
                <h1>{data.nom}</h1>
                <p className="subtitle">{data.poste}</p>
                <p className="summary">
                  {data.profil}
                </p>    
            </header>

            {/* <!-- EXPÉRIENCES --> */}
            {data.experiences.display && 
            <section className="main-section">
                <h2>EXPÉRIENCES PROFESSIONNELLES</h2>
                
                <div className="timeline">


                    {
                        data.experiences.content.map((el,index)=>{
                            const valeurWithoutUl=String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                            const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                            return(
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>{el.poste} - {el.nomEntreprise}</h3>
                                        <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                        <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="contentUl">
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            }



            {/* <!-- PROJETS --> */}
            {data.projets.display && 
            <section className="main-section">
                <h2>PROJETS</h2>
                
                <div className="timeline">


                    {
                        data.projets.content.map((el,index)=>{
                            const valeurWithoutUl=String(el.description).replace("<ul>"," ").replace("</ul>"," ")
                            const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                            return(
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>{el.nomProjet} - {el.roleIntoProject} { el.lien && <a href={`${el.lien}`}  className="lien-projet"> {el.texteLien ? el.texteLien : el.lien} </a> }</h3>
                                        <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                        <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="contentUl">
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            }



            {/* <!-- FORMATIONS --> */}
            <section className="main-section">
                <h2>FORMATIONS</h2>
                
                <div className="timeline">
                    
                    {
                        data.formations.content.map((el,index)=>{
                            return(
                               <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h3>{el.diplomeObtenu}</h3>
                                        <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                        <p className="school">{el.nomEcole} - {el.adresse}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </section>
            

        </main>

    </div>
    </>
  )
}
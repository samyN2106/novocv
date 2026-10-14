"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation'
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react"
import RegisterCvAction from "@/actions/RegisterCv"

export default function Cv8({data, dataLoaded,slug}){


    const template = templates.find(el => el.slug === slug)
    const { data: session, status } = useSession()
    const dataRef = useRef(null);  

    useEffect(() => {
        if (status !== "authenticated") {
            return;
        }
        dataRef.current = data
    }, [data, status]);

    useEffect(() => {
        return () => {
            if(!dataLoaded) return

            if(status === "authenticated" && dataRef.current){
                RegisterCvAction(template, dataRef.current);
            }
        }
    }, [dataLoaded, status]);

    let Taillereference = data.miseEnPage.taille + 5.5 
    let margeReference = data.miseEnPage.margeReference

    const valeurWithoutUlCompetence = String(data.competences.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPCompetence = handleRemplaceBalise(valeurWithoutUlCompetence,'li','p')
    const cleanHTMLValueCompetence = valueReplacedByPCompetence.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlLangue = String(data.langues.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPLangue = handleRemplaceBalise(valeurWithoutUlLangue,'li','p')
    const cleanHTMLValueLangue = valueReplacedByPLangue.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlInteret = String(data.interets.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPInteret = handleRemplaceBalise(valeurWithoutUlInteret,'li','p')
    const cleanHTMLValueInteret = valueReplacedByPInteret.replace(/&nbsp;/g, ' ');

    const sectionSidebarParentRef = useRef(null)

      function renderSection(el) {

    if(el.id==="experiences"){
        return ( <>
                 {/* <!-- EXPÉRIENCES --> */}
            {data.experiences.display && (
                        <section className="main-section">
                            <h2>EXPÉRIENCES PROFESSIONNELLES</h2>
                            
                            <div className="timeline">
                                {data.experiences.content.map((el, index) => {
                                    const valeurWithoutUl = String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                                    const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                                    const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                    return(
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-content">
                                                <h3>{el.poste}</h3>
                                                <span className="date">{el.nomEntreprise} | {el.dateDebut} - {el.dateFin}</span>
                                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="contentUl">
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}
        </>
        )
    } else if(el.id==="projets"){

        {/* <!-- PROJETS --> */}
        return ( <>
                 {data.projets.display && (
                        <section className="main-section">
                            <h2>PROJETS</h2>
                            
                            <div className="timeline">
                                {data.projets.content.map((el, index) => {
                                    const valeurWithoutUl = String(el.description).replace("<ul>"," ").replace("</ul>"," ")
                                    const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                                    const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                    return(
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-content">
                                                <h3>{el.nomProjet} {el.lien && <a href={`${el.lien}`} className="lien-projet"> {el.texteLien ? el.texteLien : el.lien} </a>}</h3>
                                                <span className="date">{el.roleIntoProject} | {el.dateDebut} - {el.dateFin}</span>
                                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="contentUl">
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}

            </>)
    }else if(el.id==="formations"){
         return ( <>
         
                    <section className="main-section">
                        <h2>FORMATIONS</h2>
                        
                        <div className="timeline">
                            {data.formations.content.map((el, index) => {
                                return(
                                    <div key={index} className="timeline-item">
                                        <div className="timeline-content">
                                            <h3>{el.diplomeObtenu}</h3>
                                            <p className="school">{el.nomEcole}{el.adresse ? `, ${el.adresse}` : ""} | {el.dateDebut} - {el.dateFin}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
            </>)
    }else{
          const section= data.newsSections.find(section=>section.id==el.id)   

                return( <> 
                <section key={section?.id} className="main-section">
                    <h2 style={{textTransform: "uppercase"}}>{section?.nom}</h2>
                    
                    <div className="timeline">
                        
                        {
                            section?.champs.map((champ)=>{
                                return(
                                <div key={champ.id} className="timeline-item">
                                        <div className="timeline-content">
                                            <h3>{champ.intitule}</h3>
                                            <p className="school">{champ.organisme}{champ.plateforme ? `, ${champ.plateforme}` : ""} | {champ.dateDebut} - {champ.dateFin}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </section>
                 </> )   
    }

}

function renderChamp(el){

    if(el.id==="competences"){
        return(
            <>
               {data.competences.display && (
                        <section className="sidebar-section">
                            <h2>COMPÉTENCES</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueCompetence}} className="sidebar-section-ul">
                            </div>
                        </section>
                    )}
            </>
        )
    }else if(el.id==="langues"){
        return(
            <>
                     {data.langues.display && (
                        <section className="sidebar-section">
                            <h2>LANGUES</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueLangue}} className="sidebar-section-ul">
                            </div>
                        </section>
                    )}
            </>
        )
    }else if(el.id==="interets"){
        return (
            <>
                        {data.interets.display && (
                        <section className="sidebar-section">
                            <h2>INTÉRÊTS</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueInteret}} className="sidebar-section-ul">
                            </div>
                        </section>
                    )}
            </>
        )
    }else{

        const champ= data.champPersoBlocCompetenceLangue.find(champ=>champ.id==el.id)
        if(!champ) return
        
           const valeurWithoutUl=String(champ.content).replace("<ul>"," ").replace("</ul>"," ")
            const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');   

        return (
            <>
                <section key={champ.id} className="sidebar-section">
                        <h2>{champ.titre}</h2>
                        <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="sidebar-section-ul">
                        </div>
                </section>       
            </>
        )
    }

}


    return(
        <>
            <style>{`

.cv-container-cv4 {
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
    width: 100%;
    max-width: 850px;
    height: auto;
    background-color: #ffffff;
    display: flex;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 15px;
    box-sizing: border-box;
}

/* ==========================================================================
   COLONNE GAUCHE (Sidebar)
   ========================================================================== */
.cv-container-cv4 .sidebar {
    width: 36%;
    background-color: ${data.miseEnPage.colorPrincipale};
    color: ${data.miseEnPage.colorSecondaire};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${margeReference * 1.6}px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: ${40 - Taillereference}px;
    padding-right: ${40 - Taillereference}px;
    box-sizing: border-box;
}

/* Photo de profil ronde avec bordure blanche */
.cv-container-cv4 .profile-container {
    margin-bottom: 10px;
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    border: 4px solid #ffffff;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
}

.cv-container-cv4 .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

/* Sections de la barre latérale */
.cv-container-cv4 .sidebar-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Bandeau blanc pour les titres de la colonne gauche */
.cv-container-cv4 .sidebar-section h2 {
    background-color: #ffffff;
    color: ${data.miseEnPage.colorSecondaire};
    width: 85%;
    padding: 5px 10px;
    font-size: ${Taillereference * 0.75}px;
    letter-spacing: 2px;
    font-weight: 500;
    margin-bottom: 18px;
    text-transform: uppercase;
    text-align: center;
    box-sizing: border-box;
}

.cv-container-cv4 .bloc-information {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.cv-container-cv4 .sidebar-section p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
}

.cv-container-cv4 .sidebar-section a {
    font-size: ${Taillereference * 0.7}px;
    font-weight: 400;
    color: ${data.miseEnPage.colorTertiaire};
    text-decoration: none;
}

.cv-container-cv4 .sidebar-section-ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${margeReference * 0.55}px;
    width: 100%;
}

/* ==========================================================================
   COLONNE DROITE (Blanche)
   ========================================================================== */
.cv-container-cv4 .main-content {
    width: 64%;
    padding-left: ${45 - Taillereference}px;
    padding-right: ${35 - Taillereference}px;
    padding-top: 30px;
    padding-bottom: 25px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 2.09}px;
    box-sizing: border-box;
}

/* En-tête */
.cv-container-cv4 .header {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.9}px;
}

.cv-container-cv4 .header h1 {
    font-size: ${Taillereference * 2.3}px;
    font-weight: 400;
    color: ${data.miseEnPage.colorSecondaire};
    line-height: 1.1;
    letter-spacing: 1px;
}

.cv-container-cv4 .header .subtitle {
    font-size: ${Taillereference * 0.85}px;
    letter-spacing: 2.5px;
    color: ${data.miseEnPage.colorTertiaire};
    text-transform: uppercase;
}

.cv-container-cv4 .header .summary {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.5;
    margin-top: 8px;
}

/* Titres de sections avec bandeau de fond (comme sur cv-8) */
.cv-container-cv4 .main-section h2 {
    background-color: ${data.miseEnPage.colorPrincipale};
    color: ${data.miseEnPage.colorSecondaire};
    font-size: ${Taillereference * 0.78}px;
    font-weight: 500;
    letter-spacing: 2px;
    padding: 6px 14px;
    margin-bottom: ${margeReference * 1.6}px;
    text-transform: uppercase;
}

/* Liste des expériences / formations */
.cv-container-cv4 .timeline {
    position: relative;
    padding-left: 14px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.5}px;
}

.cv-container-cv4 .timeline-content h3 {
    font-size: ${Taillereference * 0.75}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.cv-container-cv4 .timeline-content .date {
    font-size: ${Taillereference * 0.68}px;
    font-weight: 400;
    color: ${data.miseEnPage.colorTertiaire};
    margin-top: 4px;
    margin-bottom: 8px;
    display: block;
    text-transform: uppercase;
}

.cv-container-cv4 .timeline-content .school {
    font-size: ${Taillereference * 0.68}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin-top: 4px;
}

.cv-container-cv4 .timeline-item {
    position: relative;
}

.cv-container-cv4 .timeline-content .contentUl {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.5}px;
}

.cv-container-cv4 .timeline-content .contentUl p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.45;
}

.cv-container-cv4 .lien-projet {
    margin-left: 15px;
    text-decoration: underline;
    color: ${data.miseEnPage.colorSecondaire};
    text-transform: none;
}

            `}</style>

            <div className="cv-container-cv4">
                
                {/* <!-- COLONNE GAUCHE (Sidebar) --> */}
                <aside ref={sectionSidebarParentRef} className="sidebar">
                    {data.imgProfil.display &&    
                        <div className="profile-container">
                            <div className="profile-frame">
                                <Image alt="image profil" src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} fill className="profile-pic"/>
                            </div>
                        </div>
                    }

                    <section className="sidebar-section">
                        <h2>INFORMATIONS</h2>
                        <div className="sidebar-section-ul">
                            {data.phone !== "" && (
                                <div className="bloc-information">
                                    <p>{data.phone}</p>
                                </div>
                            )}

                            {data.email !== "" && (
                                <div className="bloc-information">
                                    <p>{data.email}</p>
                                </div>
                            )}

                            {data.adresse !== "" && (
                                <div className="bloc-information">
                                    <p>{data.adresse}</p>
                                </div>
                            )}

                            {data.champPerso.length != 0 && data.champPerso.map((el, index) => {
                                if(el.content != ""){
                                    return (
                                        <div key={index} className="bloc-information">
                                            {el.url ? <a href={el.url}>{el.content}</a> : <p>{el.content}</p>}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </section>
               

                         {
                                data.ordreSectionsPrincipales.map(el=>{
                                    return <div className="w-full" key={el.id}>
                                        {renderChamp(el)}
                                        </div>
                                })

                            }
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

                    {
                        data.ordreSectionsSecondaires.map(el=>{
                            return <div className="w-full" key={el.id}>
                                {renderSection(el)}
                                </div>
                        })

                    }

                </main>

            </div>
        </>
    )
}
"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation'
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react"
import RegisterCvAction from "@/actions/RegisterCv"
import { iconesWeb } from "@/components/Editeur/Icones"

export default function Cv5({data, dataLoaded,slug}){

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
                                                <div className="timeline-header">
                                                    <h3>{el.poste}{el.nomEntreprise ? `, ${el.nomEntreprise}` : ""}</h3>
                                                    <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                                </div>
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
                                                <div className="timeline-header">
                                                    <h3>
                                                        {el.nomProjet}{el.roleIntoProject ? ` - ${el.roleIntoProject}` : ""}
                                                        {el.lien && <a href={`${el.lien}`} className="lien-projet"> {el.texteLien ? el.texteLien : el.lien} </a>}
                                                    </h3>
                                                    <span className="date">{el.dateDebut}{el.dateFin ? ` - ${el.dateFin}` : ""}</span>
                                                </div>
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
                                            <div className="timeline-header">
                                                <h3>{el.diplomeObtenu}{el.nomEcole ? `, ${el.nomEcole}` : ""}</h3>
                                                <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                            </div>
                                            {el.adresse && <p className="school">{el.adresse}</p>}
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
                        <h2 >{section?.nom}</h2>
                        <div className="timeline">
                            {
                                section?.champs.map((champ)=>{
                                    return(
                                    <div key={champ.id} className="timeline-item">
                                            <div className="timeline-content">
                                                <div className="timeline-header">
                                                    <h3>{champ.intitule}{champ.organisme ? `, ${champ.organisme}` : ""}</h3>
                                                    <span className="date">{champ.dateDebut} - {champ.dateFin}</span>
                                                </div>
                                                {champ.plateforme && <p className="school">{champ.plateforme}</p>}
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
                        <section className="main-section">
                            <h2>COMPÉTENCES</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueCompetence}} className="inline-list">
                            </div>
                        </section>
                    )}
                </>
            )
        }else if(el.id==="langues"){
            return (
                <>
               {(data.langues.display || data.interets.display) && (
                        <div className="bottom-grid">
                            {data.langues.display && (
                                <section className="main-section bottom-col-left" style={{ width: data.interets.display ? "63%" : "100%" }}>
                                    <h2>Langues</h2>
                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueLangue}} className="inline-list">
                                    </div>
                                </section>
                            )}

                            {data.interets.display && (
                                <section className="main-section bottom-col-right" style={{ width: data.langues.display ? "37%" : "100%" }}>
                                    <h2>Intérêts</h2>
                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueInteret}} className="inline-list">
                                    </div>
                                </section>
                            )}
                        </div>
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
                             
                    <section key={champ.id} className="main-section">
                                <h2>{champ.titre}</h2>
                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="inline-list">
                                </div>
                    </section>
                                
                </>
            )
    
        }
    
    
    
    }


    return(
        <>
            <style>{`

.cv-container-cv5 {
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
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

/* ==========================================================================
   EN-TÊTE SUPÉRIEUR (Bandeau Couleur Principale)
   ========================================================================== */
.cv-container-cv5 .top-banner {
    width: 100%;
    background-color: ${data.miseEnPage.colorPrincipale};
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px ${45 - Taillereference}px;
    box-sizing: border-box;
    gap: 25px;
}

.cv-container-cv5 .banner-left {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.cv-container-cv5 .banner-left h1 {
    font-size: ${Taillereference * 2.1}px;
    font-weight: 400;
    color: #ffffff;
    line-height: 1.1;
    letter-spacing: 1px;
    margin: 0;
}

.cv-container-cv5 .banner-left .subtitle {
    font-size: ${Taillereference * 1.05}px;
    color: #ffffff;
    margin-top: 6px;
    font-weight: 300;
    text-transform: uppercase;
}

.cv-container-cv5 .banner-divider {
    width: 100%;
    height: 1.5px;
    background-color: rgba(255, 255, 255, 0.6);
    margin: 14px 0;
}

.cv-container-cv5 .contact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 8px;
    column-gap: 20px;
}

.cv-container-cv5 .bloc-information {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
}

.cv-container-cv5 .bloc-information p,
.cv-container-cv5 .bloc-information a {
    font-size: ${Taillereference * 0.68}px;
    color: #ffffff;
    text-decoration: none;
    margin: 0;
}

/* Photo de profil à droite de l'en-tête */
.cv-container-cv5 .profile-container {
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    border: 2px solid #ffffff;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
}

.cv-container-cv5 .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

/* ==========================================================================
   CONTENU PRINCIPAL
   ========================================================================== */
.cv-container-cv5 .main-content {
    width: 100%;
    padding-top: 25px;
    padding-bottom: 35px;
    padding-right: ${45 - Taillereference}px;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.6}px;
    box-sizing: border-box;
}

.cv-container-cv5 .summary {
    padding-left: ${45 - Taillereference}px;
    font-size: ${Taillereference * 0.72}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.5;
    margin: 0;
}

/* Bandeaux de titres partant du bord gauche */
.cv-container-cv5 .main-section h2 {
    background-color: #E2E6E9;
    color: ${data.miseEnPage.colorSecondaire};
    font-size: ${Taillereference * 0.88}px;
    font-weight: 500;
    padding: 6px ${45 - Taillereference}px;
    margin-bottom: ${margeReference * 1.3}px;
    text-transform: uppercase;
}

.cv-container-cv5 .timeline {
    padding-left: ${45 - Taillereference}px;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.3}px;
}

.cv-container-cv5 .timeline-item {
    position: relative;
}

.cv-container-cv5 .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 15px;
    margin-bottom: 6px;
}

.cv-container-cv5 .timeline-content h3 {
    font-size: ${Taillereference * 0.74}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    text-transform: uppercase;
    margin: 0;
}

.cv-container-cv5 .timeline-content .date {
    font-size: ${Taillereference * 0.68}px;
    font-weight: 400;
    color: ${data.miseEnPage.colorTertiaire};
    white-space: nowrap;
    text-transform: uppercase;
}

.cv-container-cv5 .timeline-content .contentUl {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.35}px;
    padding-left: 12px;
}

.cv-container-cv5 .timeline-content .contentUl p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.4;
    position: relative;
    margin: 0;
}

.cv-container-cv5 .timeline-content .contentUl p::before {
    content: "•";
    position: absolute;
    left: -12px;
    color: ${data.miseEnPage.colorSecondaire};
}

.cv-container-cv5 .timeline-content .school {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    padding-left: 12px;
    position: relative;
    margin: 0;
}

.cv-container-cv5 .timeline-content .school::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${data.miseEnPage.colorSecondaire};
}

.cv-container-cv5 .lien-projet {
    margin-left: 10px;
    text-decoration: underline;
    color: ${data.miseEnPage.colorPrincipale};
    text-transform: none;
}

/* ==========================================================================
   COMPÉTENCES, LANGUES & INTÉRÊTS (Bas de page)
   ========================================================================== */
.cv-container-cv5 .inline-list {
    padding-left: ${45 - Taillereference}px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 4px;
}

.cv-container-cv5 .inline-list p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    display: inline;
    margin: 0;
}

.cv-container-cv5 .inline-list p:not(:last-child)::after {
    content: " • ";
    margin: 0 6px;
}

.cv-container-cv5 .bottom-grid {
    display: flex;
    gap: 20px;
    width: 100%;
}

.cv-container-cv5 .bottom-col-left {
    width: 63%;
}

.cv-container-cv5 .bottom-col-right {
    width: 37%;
}

.cv-container-cv5 .bottom-col-right h2 {
    padding-left: 15px;
    padding-right: 15px;
    text-transform: uppercase;
}

.cv-container-cv5 .inline-comma-list {
    padding-left: ${45 - Taillereference}px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 4px;
}

.cv-container-cv5 .bottom-col-right .inline-comma-list {
    padding-left: 15px;
}

.cv-container-cv5 .inline-comma-list p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    display: inline;
    margin: 0;
}

.cv-container-cv5 .inline-comma-list p:not(:last-child)::after {
    content: ", ";
    margin-right: 5px;
}

            `}</style>

            <div className="cv-container-cv5">
                
                {/* <!-- EN-TÊTE SUPÉRIEUR --> */}
                <header ref={sectionSidebarParentRef} className="top-banner">
                    <div className="banner-left">
                        <h1>{data.nom}</h1>
                        <p className="subtitle">{data.poste}</p>
                        
                        <div className="banner-divider"></div>

                        <div className="contact-grid">
                            {data.phone !== "" && (
                                <div className="bloc-information">
                                    <div style={{fontSize:"14px", margin:0,}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                                        </svg>
                                    </div>
                                    <p>{data.phone}</p>
                                </div>
                            )}

                            {data.adresse !== "" && (
                                <div className="bloc-information">
                                    <div style={{fontSize:"14px", margin:0, }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                                        </svg>
                                    </div>
                                    <p>{data.adresse}</p>
                                </div>
                            )}

                            {data.email !== "" && (
                                <div className="bloc-information">
                                    <div style={{fontSize:"14px", margin:0, }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                                            <path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                                        </svg>
                                    </div>
                                    <p>{data.email}</p>
                                </div>
                            )}

                            {data.champPerso.length != 0 && data.champPerso.map((el, index) => {
                                if(el.content != ""){
                                    const icone=iconesWeb.find(ic=>ic.nom===el.iconeWeb)
                                    return (
                                        <div key={index} className="bloc-information">
                                            {icone && <span className="text-[14px]">{icone.svg}</span>}
                                            {el.url ? <a href={el.url}>{el.content}</a> : <p>{el.content}</p>}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>

                    {data.imgProfil.display && (
                        <div className="profile-container">
                            <div className="profile-frame">
                                <Image alt="image profil" src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} fill className="profile-pic"/>
                            </div>
                        </div>
                    )}
                </header>

                {/* <!-- CORPS PRINCIPAL --> */}
                <main className="main-content">

                    {data.profil && (
                        <p className="summary">
                            {data.profil}
                        </p>
                    )}
                    
                                {
                data.ordreSectionsSecondaires.map(el=>{
                      return <div className="w-full" key={el.id}>
                          {renderSection(el)}
                        </div>
                })

            }


            
              {
                data.ordreSectionsPrincipales.map(el=>{
                      return <div className="w-full" key={el.id}>
                          {renderChamp(el)}
                        </div>
                })

            }
                    

                </main>

            </div>
        </>
    )
}
"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation'
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react"
import RegisterCvAction from "@/actions/RegisterCv"

export default function Cv6({data, dataLoaded}){

    const params = useParams()
    const slug = params.slug
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
    width: 100%;
    max-width: 850px;
    height: auto;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: ${data.miseEnPage.colorTertiaire};
}

/* ==========================================================================
   EN-TÊTE SUPÉRIEUR
   ========================================================================== */
.top-banner {
    width: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35px ${45 - Taillereference}px 25px ${45 - Taillereference}px;
    box-sizing: border-box;
    gap: 30px;
    border-bottom: 2px solid ${data.miseEnPage.colorPrincipale};
}

.banner-left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 30px;
}

.banner-left-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.banner-left-text h1 {
    font-size: ${Taillereference * 2.1}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    line-height: 1.1;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;
}

.banner-left-text .subtitle {
    font-size: ${Taillereference * 0.95}px;
    color: ${data.miseEnPage.colorPrincipale};
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin: 0;
}

.contact-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
}

.bloc-information {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${data.miseEnPage.colorTertiaire};
}

.bloc-information p,
.bloc-information a {
    font-size: ${Taillereference * 0.68}px;
    color: ${data.miseEnPage.colorTertiaire};
    text-decoration: none;
    margin: 0;
    text-align: left;
}

/* Photo de profil */
.profile-container {
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
}

.profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

/* ==========================================================================
   CONTENU PRINCIPAL
   ========================================================================== */
.main-content {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 40px;
    padding-left: ${45 - Taillereference}px;
    padding-right: ${45 - Taillereference}px;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.8}px;
    box-sizing: border-box;
}

.summary {
    font-size: ${Taillereference * 0.72}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.6;
    margin: 0;
    border-bottom: 1px solid ${data.miseEnPage.colorPrincipale};
    padding-bottom: 25px;
}

/* Corps en 2 colonnes */
.cv-body {
    display: flex;
    gap: 45px;
}

.col-left {
    width: 42%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-right: 1px solid ${data.miseEnPage.colorPrincipale};
    padding-right: 35px;
}

.col-right {
    width: 58%;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.section-block {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.section-block h2 {
    font-size: ${Taillereference * 0.95}px;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${data.miseEnPage.colorSecondaire};
    text-transform: uppercase;
    margin: 0;
}

.item-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.item-block h3 {
    font-size: ${Taillereference * 0.75}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    text-transform: uppercase;
    margin: 0;
}

.item-block .sub-info {
    font-size: ${Taillereference * 0.68}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin: 0;
    font-weight: 500;
}

.content-ul {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
}

.content-ul p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.5;
    margin: 0;
}

.sidebar-ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.sidebar-ul p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin: 0;
}

.lien-projet {
    margin-left: 10px;
    text-decoration: underline;
    color: ${data.miseEnPage.colorPrincipale};
    text-transform: none;
}

            `}</style>

            <div className="cv-container">
                
                {/* EN-TÊTE SUPÉRIEUR */}
                <header ref={sectionSidebarParentRef} className="top-banner">
                    <div className="banner-left">
                        {data.imgProfil.display && (
                            <div className="profile-container">
                                <div className="profile-frame">
                                    <Image alt="image profil" src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} fill className="profile-pic"/>
                                </div>
                            </div>
                        )}
                        <div className="banner-left-text">
                            <h1>{data.nom}</h1>
                            <p className="subtitle">{data.poste}</p>
                        </div>
                    </div>

                    <div className="contact-column">
                        {data.email !== "" && (
                            <div className="bloc-information">
                                <div style={{fontSize:"16px", margin:0, color: data.miseEnPage.colorPrincipale}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                                        <path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                                    </svg>
                                </div>
                                <p>{data.email}</p>
                            </div>
                        )}

                        {data.phone !== "" && (
                            <div className="bloc-information">
                                <div style={{fontSize:"16px", margin:0, color: data.miseEnPage.colorPrincipale}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                                    </svg>
                                </div>
                                <p>{data.phone}</p>
                            </div>
                        )}

                        {data.adresse !== "" && (
                            <div className="bloc-information">
                                <div style={{fontSize:"16px", margin:0, color: data.miseEnPage.colorPrincipale}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                                    </svg>
                                </div>
                                <p>{data.adresse}</p>
                            </div>
                        )}

                        {data.champPerso.length != 0 && data.champPerso.map((el, index) => {
                            if(el.content != ""){
                                return (
                                    <div key={index} className="bloc-information">
                                       {el.iconeWeb && <span style={{color: data.miseEnPage.colorPrincipale}} className="text-[16px]">{el.iconeWeb}</span>}
                                        {el.url ? <a href={el.url}>{el.content}</a> : <p>{el.content}</p>}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </header>

                {/* CORPS PRINCIPAL */}
                <main className="main-content">

                    {data.profil && (
                        <p className="summary">
                            {data.profil}
                        </p>
                    )}

                    <div className="cv-body">
                        
                        {/* Colonne Gauche */}
                        <div className="col-left">
                            
                            {/* Formations */}
                            <section className="section-block">
                                <h2>Formation</h2>
                                <div className="sidebar-ul">
                                    {data.formations.content.map((el, index) => (
                                        <div key={index} className="item-block">
                                            <h3>{el.diplomeObtenu}</h3>
                                            {el.nomEcole && <p className="sub-info">{el.nomEcole}{el.adresse ? `, ${el.adresse}` : ""}</p>}
                                            <p className="sub-info">{el.dateDebut} - {el.dateFin}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Compétences */}
                            {data.competences.display && (
                                <section className="section-block">
                                    <h2>Compétences</h2>
                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueCompetence}} className="sidebar-ul">
                                    </div>
                                </section>
                            )}

                            {/* Langues */}
                            {data.langues.display && (
                                <section className="section-block">
                                    <h2>Langues</h2>
                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueLangue}} className="sidebar-ul">
                                    </div>
                                </section>
                            )}

                            {/* Intérêts */}
                            {data.interets.display && (
                                <section className="section-block">
                                    <h2>Intérêts</h2>
                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueInteret}} className="sidebar-ul">
                                    </div>
                                </section>
                            )}

                            {/* Blocs Personnalisés */}
                            {data.champPersoBlocCompetenceLangue.length != 0 && data.champPersoBlocCompetenceLangue.map((el, index) => {
                                const valeurWithoutUl = String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                                const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                                const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                return (
                                    <section key={index} className="section-block">
                                        <h2>{el.titre}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="sidebar-ul">
                                        </div>
                                    </section>
                                )
                            })}

                        </div>

                        {/* Colonne Droite */}
                        <div className="col-right">

                            {/* Expériences */}
                            {data.experiences.display && (
                                <section className="section-block">
                                    <h2>Expérience</h2>
                                    <div className="sidebar-ul">
                                        {data.experiences.content.map((el, index) => {
                                            const valeurWithoutUl = String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                                            const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                            return (
                                                <div key={index} className="item-block">
                                                    <h3>{el.poste}</h3>
                                                    <p className="sub-info">{el.nomEntreprise}{el.adresse ? `, ${el.adresse}` : ""} | {el.dateDebut} - {el.dateFin}</p>
                                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="content-ul">
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Projets */}
                            {data.projets.display && (
                                <section className="section-block">
                                    <h2>Projets</h2>
                                    <div className="sidebar-ul">
                                        {data.projets.content.map((el, index) => {
                                            const valeurWithoutUl = String(el.description).replace("<ul>"," ").replace("</ul>"," ")
                                            const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                            return (
                                                <div key={index} className="item-block">
                                                    <h3>
                                                        {el.nomProjet}
                                                        {el.lien && <a href={`${el.lien}`} className="lien-projet"> {el.texteLien ? el.texteLien : el.lien} </a>}
                                                    </h3>
                                                    <p className="sub-info">{el.roleIntoProject} | {el.dateDebut} - {el.dateFin}</p>
                                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue}} className="content-ul">
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                            )}

                        </div>

                    </div>

                </main>

            </div>
        </>
    )
}
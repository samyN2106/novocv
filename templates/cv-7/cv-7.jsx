"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation'
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react"
import RegisterCvAction from "@/actions/RegisterCv"

export default function Cv7({ data, dataLoaded ,slug}) {

 
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
            if (!dataLoaded) return

            if (status === "authenticated" && dataRef.current) {
                RegisterCvAction(template, dataRef.current);
            }
        }
    }, [dataLoaded, status]);

    let Taillereference = data.miseEnPage.taille + 5.5;
    let margeReference = data.miseEnPage.margeReference;

    const valeurWithoutUlCompetence = String(data.competences.content).replace("<ul>", " ").replace("</ul>", " ");
    const valueReplacedByPCompetence = handleRemplaceBalise(valeurWithoutUlCompetence, 'li', 'p');
    const cleanHTMLValueCompetence = valueReplacedByPCompetence.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlLangue = String(data.langues.content).replace("<ul>", " ").replace("</ul>", " ");
    const valueReplacedByPLangue = handleRemplaceBalise(valeurWithoutUlLangue, 'li', 'p');
    const cleanHTMLValueLangue = valueReplacedByPLangue.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlInteret = String(data.interets.content).replace("<ul>", " ").replace("</ul>", " ");
    const valueReplacedByPInteret = handleRemplaceBalise(valeurWithoutUlInteret, 'li', 'p');
    const cleanHTMLValueInteret = valueReplacedByPInteret.replace(/&nbsp;/g, ' ');


          function renderSection(el) {
        
            if(el.id==="experiences"){
                return ( <>
                         {/* <!-- EXPÉRIENCES --> */}
                  {data.experiences.display && (
                    <section className="main-section">
                        <h2>EXPÉRIENCES PROFESSIONNELLES</h2>
                        {data.experiences.content.map((el, index) => {
                            const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                            const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                            return (
                                <div key={index} className="experience-row">
                                    <div className="experience-date">
                                        <span>{el.dateDebut} - {el.dateFin}</span>
                                    </div>
                                    <div className="experience-details">
                                        <h3>{el.poste} - {el.nomEntreprise}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue }} className="contentUl"></div>
                                    </div>
                                </div>
                            )
                        })}
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
                        {data.projets.content.map((el, index) => {
                            const valeurWithoutUl = String(el.description).replace("<ul>", " ").replace("</ul>", " ");
                            const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                            const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                            return (
                                <div key={index} className="experience-row">
                                    <div className="experience-date">
                                        <span>{el.dateDebut} - {el.dateFin}</span>
                                    </div>
                                    <div className="experience-details">
                                        <h3>
                                            {el.nomProjet} - {el.roleIntoProject}
                                            {el.lien && <a href={`${el.lien}`} className="lien-projet"> {el.texteLien ? el.texteLien : el.lien} </a>}
                                        </h3>
                                        <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue }} className="contentUl"></div>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                )}
        
                    </>)
            }else if(el.id==="formations"){
                 return ( <>
            <section className="main-section">
                    <h2>FORMATIONS</h2>
                    {data.formations.content.map((el, index) => {
                        return (
                            <div key={index} className="formation-row">
                                <div className="formation-date">
                                    <span>{el.dateDebut} - {el.dateFin}</span>
                                </div>
                                <div className="formation-details">
                                    <h3>{el.diplomeObtenu}</h3>
                                    <div className="formation-school">{el.nomEcole} - {el.adresse}</div>
                                </div>
                            </div>
                        )
                    })}
                </section>
        
                    </>)
            }else{
                  const section= data.newsSections.find(section=>section.id==el.id)   
        
                        return( <> 
                        <section key={section?.id} className="main-section">
                            <h2 >{section?.nom}</h2>
                                {
                                    section?.champs.map((champ)=>{
                                        return(
                                        <div key={champ.id} className="formation-row">
                                                <div className="formation-date">
                                                    <span>{champ.dateDebut} - {champ.dateFin}</span>
                                                </div>
                                                <div className="formation-details">
                                                    <h3>{champ.intitule}</h3>
                                                    <div className="formation-school">{champ.organisme} - {champ.plateforme}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
              
                        </section>
                         </> )   
            }
        
        }


         function renderChamp(el){
            
                if(el.id==="competences"){
                    return(
                        <>
                                {data.competences.display && (
                        <div className="bottom-column">
                            <h2>COMPÉTENCES</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueCompetence }} className="skills-list-container"></div>
                        </div>
                            )}
                        </>
                    )
                }else if(el.id==="langues"){
                    return (
                        <>
                                 {data.langues.display && (
                        <div className="bottom-column">
                            <h2>LANGUES</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueLangue }} className="skills-list-container"></div>
                        </div>
                    )}
        
                        </>
                    )
                }else if(el.id=="interets"){

                    return(<>
                        {data.interets.display && (
                        <div className="bottom-column">
                            <h2>INTÉRÊTS</h2>
                            <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueInteret }} className="skills-list-container"></div>
                        </div>
                    )}
                    </>)


                }else{
                    const champ= data.champPersoBlocCompetenceLangue.find(champ=>champ.id==el.id)
                    if(!champ) return
                    
                       const valeurWithoutUl=String(champ.content).replace("<ul>"," ").replace("</ul>"," ")
                        const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                        const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');   
            
                    return (
                        <>
                                     
                         <div key={champ.id} className="bottom-column">
                                <h2>{champ.titre}</h2>
                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue }} className="skills-list-container"></div>
                            </div>
                                        
                        </>
                    )
            
                }
            
            
            
            }

    

    return (
        <>
            <style>{`
.cv-container-cv7 {
${(() => {
                    switch (data.miseEnPage.family) {
                        case "Helvetica":
                            return `font-family: ${data.miseEnPage.family};`
                        case "Helvetica-Bold":
                            return `font-family: Helvetica ; font-weight: bold;`
                        case "Helvetica-Oblique":
                            return `font-family: Helvetica;  font-style: oblique;`
                        case "Helvetica-BoldOblique":
                            return `font-family: Helvetica;  font-style: oblique; font-weight: bold ;`
                        case "Courier":
                            return `font-family: ${data.miseEnPage.family};`
                        case "Courier-Bold":
                            return `font-family: Courier ; font-weight: bold;`
                        case "Courier-Oblique":
                            return `font-family: Courier ; font-style: oblique;`
                        case "Courier-BoldOblique":
                            return `font-family: Courier;  font-style: oblique; font-weight: bold;`
                        case "Times-Roman":
                            return `font-family: ${data.miseEnPage.family};`
                        case "Times-Bold":
                            return `font-family: Times-Roman ; font-weight: bold;`
                        case "Times-Italic":
                            return `font-family: Times-Roman ; font-style: italic;`
                        case "Times-BoldItalic":
                            return `font-family: Times-Roman;  font-style: oblique; font-weight: bold;`
                    }
                })()}
    width: 100%;
    max-width: 850px;
    height: auto;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 30px 35px;
    box-sizing: border-box;
    color: ${data.miseEnPage.colorTertiaire};
}

/* ==========================================================================
   EN-TÊTE / HEADER (Photo, Nom, Titre, Coordonnées)
   ========================================================================== */
.cv-container-cv7 .cv-header-container {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: ${margeReference * 1.5}px;
}

.cv-container-cv7 .profile-container {
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    border: 4px solid #ffffff;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
}

.cv-container-cv7 .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

.cv-container-cv7 .header-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-grow: 1;
}

.cv-container-cv7 .header-info h1 {
    font-size: ${Taillereference * 2.2}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    letter-spacing: 1px;
    margin: 0;
    line-height: 1.1;
}

.cv-container-cv7 .header-info .subtitle {
    font-size: ${Taillereference * 1.1}px;
    font-weight: 400;
    letter-spacing: 1px;
    color: ${data.miseEnPage.colorSecondaire};
    margin-bottom: 10px;
    text-transform:uppercase;
}

.cv-container-cv7 .contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
}

.cv-container-cv7 .bloc-information {
    display: flex;
    align-items: center;
    gap: 6px;
}

.cv-container-cv7 .bloc-information a {
    color: inherit;
    text-decoration: none;
}

/* Profil / Résumé */
.cv-container-cv7 .summary-section {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    text-align: justify;
    line-height: 1.5;
    margin-bottom:${margeReference * 1.5}px;
}

/* ==========================================================================
   SECTIONS PRINCIPALES (Expériences, Formations, etc.)
   ========================================================================== */
.cv-container-cv7 .main-section {
    margin-bottom: 23px;
}

.cv-container-cv7 .main-section h2 {
    font-size: ${Taillereference * 1.1}px;
    font-weight: 600;
    color: ${data.miseEnPage.colorSecondaire};
    letter-spacing: 1.5px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${data.miseEnPage.colorPrincipale};
    padding-bottom: 5px;
    text-transform:uppercase;
}

/* Structure en grille pour Expériences et Formations (Date à gauche, Détails à droite) */
.cv-container-cv7 .experience-row, .cv-container-cv7 .formation-row {
    display: flex;
    gap: 25px;
    margin-bottom: 20px;
}

.cv-container-cv7 .experience-date, .cv-container-cv7 .formation-date {
    width: 25%;
    font-size: ${Taillereference * 0.6}px;
    font-weight: 500;
    color: ${data.miseEnPage.colorPrincipale};
    letter-spacing: 0.5px;
    padding-top: 3px;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    text-transform:uppercase;
}



.cv-container-cv7 .experience-details, .cv-container-cv7 .formation-details {
    width: 75%;
}

.cv-container-cv7 .experience-details h3, .cv-container-cv7 .formation-details h3 {
    font-size: ${Taillereference * 0.78}px;
    font-weight: 600;
    color: ${data.miseEnPage.colorSecondaire};
    margin: 0 0 4px 0;
}

.cv-container-cv7 .formation-school {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin-bottom: 6px;
}

.cv-container-cv7 .contentUl {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.8}px;
    margin-top: 8px;
}

.cv-container-cv7 .contentUl p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    position: relative;
    padding-left: 12px;
    margin: 0;
}

// .contentUl p::before {
//     content: "•";
//     position: absolute;
//     left: 0;
//     color: ${data.miseEnPage.colorPrincipale};
//     font-weight: bold;
// }

/* ==========================================================================
   FOOTER / BLOCS DU BAS (Langues, Compétences, Loisirs)
   ========================================================================== */
.cv-container-cv7 .bottom-sections-grid {
     display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 10px;
}

.cv-container-cv7 .bottom-column {
    flex: 1;
}

.cv-container-cv7 .bottom-column h2 {
    font-size: ${Taillereference * 1.1}px;
    font-weight: 600;
    color: ${data.miseEnPage.colorSecondaire};
    letter-spacing: 1px;
    margin-bottom: 12px;
    border-bottom: 1px solid ${data.miseEnPage.colorPrincipale};
    padding-bottom: 4px;
    text-transform:uppercase;
}

.cv-container-cv7 .bottom-column p, .cv-container-cv7 .bottom-column div {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
}

.cv-container-cv7 .skills-list-container {
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
    gap: 8px 20px;
}

.cv-container-cv7 .skills-list-container p {
    position: relative;
    padding-left: 10px;
    margin: 0;
}


.cv-container-cv7 .lien-projet {
    margin-left: 15px;
    text-decoration: underline;
    color: ${data.miseEnPage.colorPrincipale};
    text-transform:none;
}
   `}</style>

            <div className="cv-container-cv7">

                {/* EN-TÊTE / HEADER */}
                <div className="cv-header-container">
                    {data.imgProfil.display &&
                        <div className="profile-container">
                            <Image alt="image profil" src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} fill className="profile-pic" />
                        </div>
                    }
                    <div className="header-info">
                        <h1>{data.nom}</h1>
                        <p className="subtitle">{data.poste}</p>
                        <div className="contact-row">
                            {data.email !== "" && (
                                <div className="bloc-information">
                                    <div style={{ fontSize: "16px", margin: 0, color: data.miseEnPage.colorPrincipale }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                                            <path d="M0 0h20v20H0z" fill="none" />
                                            <path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                                        </svg>
                                    </div>
                                    <span>{data.email}</span>
                                </div>
                            )}
                            {data.phone !== "" && (
                                <div className="bloc-information">
                                    <div style={{ fontSize: "16px", margin: 0, color: data.miseEnPage.colorPrincipale }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                                        </svg>
                                    </div>
                                    <span>{data.phone}</span>
                                </div>
                            )}
                            {data.adresse !== "" && (
                                <div className="bloc-information">
                                    <div style={{ fontSize: "16px", margin: 0, color: data.miseEnPage.colorPrincipale }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                                        </svg>
                                    </div>
                                    <span>{data.adresse}</span>
                                </div>
                            )}
                            {data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                                if (el.content !== "") {
                                    return (
                                        <div key={index} className="bloc-information">
                                            {el.iconeWeb && <span style={{ color: data.miseEnPage.colorPrincipale }} className="text-[16px]">{el.iconeWeb}</span>}
                                            {el.url ? <a href={el.url}>{el.content}</a> : <span>{el.content}</span>}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>

                {/* RÉSUMÉ / PROFIL */}
                {data.profil && (
                    <div className="summary-section">
                        {data.profil}
                    </div>
                )}

                                     {
                data.ordreSectionsSecondaires.map(el=>{
                      return <div className="w-full" key={el.id}>
                          {renderSection(el)}
                        </div>
                })

            }

                {/* BLOCS INFÉRIEURS (Langues, Compétences, Loisirs) */}
                <div className="bottom-sections-grid">
                            {
                data.ordreSectionsPrincipales.map(el=>{
                      return <div className="w-full" key={el.id}>
                          {renderChamp(el)}
                        </div>
                })

            }
                </div>

            </div>
        </>
    )
}
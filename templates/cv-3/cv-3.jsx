"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation'
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react"
import RegisterCvAction from "@/actions/RegisterCv"

export default function Cv3({data, dataLoaded,slug}){

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

    useEffect(() => {
        if(sectionSidebarParentRef.current){
            const allSections = sectionSidebarParentRef.current.querySelectorAll("section")
            for(let i = 0; i < allSections.length; i++){
                if(allSections[i+1]){
                    const divider = allSections[i].querySelector(".divider")
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
    }, [, data])

    

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
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <h3>{el.poste} - {el.nomEntreprise}</h3>
                                                <span className="date">{el.dateDebut} - {el.dateFin}</span>
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
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <h3>{el.nomProjet} - {el.roleIntoProject} {el.lien && <a href={`${el.lien}`} className="lien-projet"> {el.texteLien ? el.texteLien : el.lien} </a>}</h3>
                                                <span className="date">{el.dateDebut} - {el.dateFin}</span>
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
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <h3>{el.diplomeObtenu}</h3>
                                            <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                            <p className="school">{el.nomEcole} - {el.adresse}</p>
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
                        <h2>{section?.nom}</h2>
                        
                        <div className="timeline">
                            {
                                section?.champs.map((champ)=>{
                                    return(
                                    <div key={champ.id} className="timeline-item">
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <h3>{champ.intitule}</h3>
                                                <span className="date">{champ.dateDebut} - {champ.dateFin}</span>
                                                <p className="school">{champ.organisme} - {champ.plateforme}</p>
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

.cv-container-cv3 {
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
    box-sizing: border-box;
    border-top: 8px solid ${data.miseEnPage.colorPrincipale};
    border-bottom: 12px solid ${data.miseEnPage.colorPrincipale};
    padding: 20px 0;
}

/* ==========================================================================
   COLONNE GAUCHE (Bleu)
   ========================================================================== */
.cv-container-cv3 .sidebar {
    width: 36%;
    background-color: ${data.miseEnPage.colorPrincipale};
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: ${margeReference * 1.09}px;
    padding-top: 20px;
    padding-bottom: 30px;
    box-sizing: border-box;;
    margin-top:-20px
}

/* Photo de profil encadrée */
.cv-container-cv3 .profile-container {
    margin: 0 auto 15px auto;
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    border: 6px solid #ffffff;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
}

.cv-container-cv3 .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

/* Sections de la barre latérale */
.cv-container-cv3 .sidebar-section {
    width: 100%;
    padding-left: ${40 - Taillereference}px;
    padding-right: ${40 - Taillereference}px;
    box-sizing: border-box;
}

.cv-container-cv3 .sidebar-section h2 {
    font-size: ${Taillereference * 1.1}px;
    letter-spacing: 1.5px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #ffffff;
    text-transform: uppercase;
}

.cv-container-cv3 .bloc-information {
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Ligne de séparation prenant toute la largeur de la colonne gauche */
.cv-container-cv3 .sidebar-section .divider {
    width: calc(100% + ${(40 - Taillereference) * 2}px);
    margin-left: -${40 - Taillereference}px;
    height: 1.5px;
    background-color: rgba(255, 255, 255, 0.7);
    margin-top: 22px;
    margin-bottom: 8px;
}

.cv-container-cv3 .sidebar-section p {
    font-size: ${Taillereference * 0.7}px;
}

.cv-container-cv3 .sidebar-section a {
    font-size: ${Taillereference * 0.7}px;
    font-weight: 300;
    color: #ffffff;
}

.cv-container-cv3 .sidebar-section-ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${margeReference * 0.6}px;
}

/* ==========================================================================
   COLONNE DROITE (Blanche)
   ========================================================================== */
.cv-container-cv3 .main-content {
    width: 64%;
    padding-top: 30px;
    padding-bottom: 25px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 2.09}px;
    box-sizing: border-box;
}

/* En-tête */
.cv-container-cv3 .header {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.8}px;
    padding-left: ${45 - Taillereference}px;
    padding-right: ${45 - Taillereference}px;
}

.cv-container-cv3 .header h1 {
    font-size: ${Taillereference * 2.1}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorPrincipale};
    line-height: 1.1;
}

.cv-container-cv3 .header .subtitle {
    font-size: ${Taillereference * 1.05}px;
    letter-spacing: 0.5px;
    color: ${data.miseEnPage.colorPrincipale};
    text-transform: uppercase;
}

.cv-container-cv3 .header .summary {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.5;
    margin-top: 5px;
}

/* Titres avec bandeau de couleur pleine largeur */
.cv-container-cv3 .main-section h2 {
    background-color: ${data.miseEnPage.colorPrincipale};
    color: #ffffff;
    font-size: ${Taillereference * 1.05}px;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding: 6px ${45 - Taillereference}px;
    margin-bottom: ${margeReference * 1.80}px;
    text-transform: uppercase;
}

/* Liste des expériences / formations */
.cv-container-cv3 .timeline {
    position: relative;
    padding-left: ${45 - Taillereference + 25}px;
    padding-right: ${45 - Taillereference}px;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.7}px;
}

/* Puces rondes bleues à gauche de chaque bloc */
.cv-container-cv3 .timeline-dot {
    position: absolute;
    left: -25px;
    top: 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${data.miseEnPage.colorPrincipale};
}

.cv-container-cv3 .timeline-content h3 {
    font-size: ${Taillereference * 0.78}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
}

.cv-container-cv3 .timeline-content .date {
    font-size: ${Taillereference * 0.65}px;
    font-weight: 400;
    color: ${data.miseEnPage.colorTertiaire};
    margin-top: 4px;
    margin-bottom: 8px;
    display: block;
    text-transform: uppercase;
}

.cv-container-cv3 .timeline-content .school {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
}

.cv-container-cv3 .timeline-item {
    position: relative;
}

.cv-container-cv3 .timeline-content .contentUl {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.6}px;
}

.cv-container-cv3 .timeline-content .contentUl p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    line-height: 1.4;
}

.cv-container-cv3 .lien-projet {
    margin-left: 15px;
    text-decoration: underline;
    color: ${data.miseEnPage.colorPrincipale};
    text-transform: none,
}

            `}</style>

            <div className="cv-container-cv3">
                
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
                            {data.champPerso.length != 0 && data.champPerso.map((el, index) => {
                                if(el.content != ""){
                                    return (
                                        <div key={index} className="bloc-information">
                                            {el.iconeWeb && <span className="text-[16px]">{el.iconeWeb}</span>}
                                            {el.url ? <a href={el.url}>{el.content}</a> : <p>{el.content}</p>}
                                        </div>
                                    )
                                }
                            })}

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
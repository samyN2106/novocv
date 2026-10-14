"use client"
import { useEffect, useRef } from "react";
import Image from "next/image";
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { useParams } from 'next/navigation';
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react";
import RegisterCvAction from "@/actions/RegisterCv";

export default function Cv2({ data, dataLoaded ,slug}) {

    const template = templates.find(el => el.slug === slug);
    const { status } = useSession();
    const dataRef = useRef(null);

    useEffect(() => {
        if (status !== "authenticated") {
            return;
        }
        dataRef.current = data;
    }, [data, status]);

    useEffect(() => {
        return () => {
            if (!dataLoaded) return;

            if (status === "authenticated" && dataRef.current) {
                RegisterCvAction(template, dataRef.current);
            }
        };
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
                                <div className="timeline">
                                    {data.experiences.content.map((el, index) => {
                                        const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                                        const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                                        const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                        return (
                                            <div key={index} className="timeline-item">
                                                <div className="timeline-dot"></div>
                                                <div className="timeline-content">
                                                    <h3>{el.poste} - {el.nomEntreprise}</h3>
                                                    <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue }} className="contentUl"></div>
                                                </div>
                                            </div>
                                        );
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
                                        const valeurWithoutUl = String(el.description).replace("<ul>", " ").replace("</ul>", " ");
                                        const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                                        const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                        return (
                                            <div key={index} className="timeline-item">
                                                <div className="timeline-dot"></div>
                                                <div className="timeline-content">
                                                    <h3>
                                                        {el.nomProjet} {el.roleIntoProject && `- ${el.roleIntoProject}`}
                                                        {el.lien && <a href={`${el.lien}`} className="lien-projet">{el.texteLien ? el.texteLien : el.lien}</a>}
                                                    </h3>
                                                    <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue }} className="contentUl"></div>
                                                </div>
                                            </div>
                                        );
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
                                    return (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-content">
                                                <h3>{el.diplomeObtenu}</h3>
                                                <span className="date">{el.dateDebut} - {el.dateFin}</span>
                                                <p className="school">{el.nomEcole} {el.adresse && `- ${el.adresse}`}</p>
                                            </div>
                                        </div>
                                    );
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
                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueCompetence }} className="sidebar-section-ul"></div>
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
                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueLangue }} className="sidebar-section-ul"></div>
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
                                <div dangerouslySetInnerHTML={{ __html: cleanHTMLValueInteret }} className="sidebar-section-ul"></div>
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
                                    <div dangerouslySetInnerHTML={{ __html: cleanHTMLValue }} className="sidebar-section-ul"></div>
                    </section>
                            
            </>
        )
    }

}
  




    return (
        <>
            <style>{`
.cv-container-cv2 {
${(() => {
    switch (data.miseEnPage.family) {
        case "Helvetica":
            return `font-family: ${data.miseEnPage.family};`;
        case "Helvetica-Bold":
            return `font-family: Helvetica ; font-weight: bold;`;
        case "Helvetica-Oblique":
            return `font-family: Helvetica;  font-style: oblique;`;
        case "Helvetica-BoldOblique":
            return `font-family: Helvetica;  font-style: oblique; font-weight: bold ;`;
        case "Courier":
            return `font-family: ${data.miseEnPage.family};`;
        case "Courier-Bold":
            return `font-family: Courier ; font-weight: bold;`;
        case "Courier-Oblique":
            return `font-family: Courier ; font-style: oblique;`;
        case "Courier-BoldOblique":
            return `font-family: Courier;  font-style: oblique; font-weight: bold;`;
        case "Times-Roman":
            return `font-family: ${data.miseEnPage.family};`;
        case "Times-Bold":
            return `font-family: Times-Roman ; font-weight: bold;`;
        case "Times-Italic":
            return `font-family: Times-Roman ; font-style: italic;`;
        case "Times-BoldItalic":
            return `font-family: Times-Roman;  font-style: oblique; font-weight: bold;`;
    }
})()}
    width: 100%;
    max-width: 850px;
    height: auto;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 30px 35px;
    box-sizing: border-box;
    color: ${data.miseEnPage.colorTertiaire};
}

.cv-container-cv2 .cv-top-section {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
}

.cv-container-cv2 .profile-container {
    position: relative;
    width: ${data.tailleImg}px;
    border-radius: ${data.borderRadiusImg}px;
    border: 5px solid #ffffff;
    overflow: hidden;
    background-color: #ddd;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
}

.cv-container-cv2 .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

.cv-container-cv2 .header {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-grow: 1;
}

.cv-container-cv2 .header h1 {
    font-size: ${Taillereference * 2.2}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    line-height: 1.1;
    margin: 0;
}

.cv-container-cv2 .header .subtitle {
    font-size: ${Taillereference * 1.1}px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: ${data.miseEnPage.colorSecondaire};
    margin-bottom: 6px;
    text-transform: uppercase;
}

.cv-container-cv2 .header .summary {
    font-size: ${Taillereference * 0.72}px;
    color: ${data.miseEnPage.colorTertiaire};
    text-align: justify;
    line-height: 1.45;
}

.cv-container-cv2 .cv-body-layout {
    display: flex;
    gap: 40px;
}

.cv-container-cv2 .sidebar {
    width: 32%;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.5}px;
}

.cv-container-cv2 .main-content {
    width: 68%;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.8}px;
}

.cv-container-cv2 .sidebar-section h2 {
    font-size: ${Taillereference * 1.05}px;
    font-weight: 700;
    letter-spacing: 1px;
    color: ${data.miseEnPage.colorSecondaire};
    margin-bottom: 10px;
    text-transform: uppercase;
}

.cv-container-cv2 .sidebar-section .infomation{
    font-size: ${Taillereference * 1.05}px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #ffffff;
    background-color: ${data.miseEnPage.colorPrincipale};
    padding: 8px 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
    margin-right:-40px;
}

.cv-container-cv2 .main-section h2 {
    font-size: ${Taillereference * 1.05}px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #ffffff;
    background-color: ${data.miseEnPage.colorPrincipale};
    padding: 8px 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
}



.cv-container-cv2 .sidebar-section-ul {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.5}px;
}

.cv-container-cv2 .sidebar-section p, .cv-container-cv2 .sidebar-section a {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin: 0;
}

.cv-container-cv2 .bloc-information {
    display: flex;
    align-items: center;
    gap: 6px;
}

.cv-container-cv2 .timeline {
    position: relative;
    border-left: 2px solid ${data.miseEnPage.colorPrincipale};
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 1.4}px;
}

.cv-container-cv2 .timeline-dot {
    position: absolute;
    left: -26px;
    top: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${data.miseEnPage.colorPrincipale};
}

.cv-container-cv2 .timeline-content h3 {
    font-size: ${Taillereference * 0.78}px;
    font-weight: 700;
    color: ${data.miseEnPage.colorSecondaire};
    margin: 0 0 3px 0;
}

.cv-container-cv2 .timeline-content .date {
    font-size: ${Taillereference * 0.62}px;
    font-weight: 600;
    color: ${data.miseEnPage.colorTertiaire};
    margin-bottom: 6px;
    display: block;
    text-transform: uppercase;
}

.cv-container-cv2 .timeline-content .school {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin: 0;
}

.cv-container-cv2 .timeline-item {
    position: relative;
}

.cv-container-cv2 .timeline-content .contentUl {
    display: flex;
    flex-direction: column;
    gap: ${margeReference * 0.45}px;
}

.cv-container-cv2 .timeline-content .contentUl p {
    font-size: ${Taillereference * 0.7}px;
    color: ${data.miseEnPage.colorTertiaire};
    margin: 0;
}

.cv-container-cv2 .lien-projet {
    margin-left: 10px;
    text-decoration: underline;
    color: ${data.miseEnPage.colorPrincipale};
    text-transform:none,
}
   `}</style>

            <div className="cv-container-cv2">
                <div className="cv-top-section">
                    {data.imgProfil.display &&    
                        <div className="profile-container">
                            <Image alt="image profil" src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} fill className="profile-pic"/>
                        </div>
                    }
                    <header className="header">
                        <h1>{data.nom}</h1>
                        <p className="subtitle">{data.poste}</p>
                        <p className="summary">{data.profil}</p>    
                    </header>
                </div>

                <div className="cv-body-layout">
                    <aside className="sidebar">
                        <section className="sidebar-section">
                            <h2 className="infomation">INFORMATIONS</h2>
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
                                {data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                                    if (el.content !== "") {
                                        return (
                                            <div key={index} className="bloc-information">
                                                {el.url ? <a href={el.url}>{el.content}</a> : <p>{el.content}</p>}
                                            </div>
                                        );
                                    }
                                    return null;
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

                    <main className="main-content">
                             {
                                data.ordreSectionsSecondaires.map(el=>{
                                    return <div className="w-full" key={el.id}>
                                        {renderSection(el)}
                                        </div>
                                })

                            }
                    </main>
                </div>
            </div>
        </>
    );
} 
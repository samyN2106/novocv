"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Link, Image } from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv"
import Html from 'react-pdf-html';

export default function Cv3Pdf({data, dataLoaded, slug, status}){
  const ordreKey = [
  ...(data.ordreSectionsSecondaires ?? []).map(
    (section) => `${section.type}-${section.id}`
  ),
  ...(data.ordreSectionsPrincipales ?? []).map(
    (section) => `${section.type}-${section.id}`
  ),
].join("|");
 
  const template = templates.find(el => el.slug === slug)
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

  let Taillereference = (data.miseEnPage.taille + 5.5) * 0.75
  let margeReference = data.miseEnPage.margeReference * 0.75

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
            allSections[i].insertAdjacentHTML('beforeend', '<View className="divider" style={{styles.sidebarSectionDivider}}></View>');
          }
        }else{
          if(allSections[i].querySelector(".divider")){
            allSections[i].querySelector(".divider").remove()
          }
        }
      }
    }
  }, [, data])

  const activeSections = [];

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      position: "relative",
      fontFamily: `${data.miseEnPage.family ? data.miseEnPage.family : "Helvetica" }`, 
      boxSizing: 'border-box',
      borderTopWidth: 8 * 0.75,
      borderTopColor: `${data.miseEnPage.colorPrincipale}`,
      borderBottomWidth: 12 * 0.75,
      borderBottomColor: `${data.miseEnPage.colorPrincipale}`,
      paddingVertical:20*0.75
    },

    /* Conteneur principal au format A4 */
    cvContainer: {
      display: "flex",
      flexDirection: 'row',
      position: "relative",
      boxSizing: 'border-box',
      minHeight: "100%",
    },

    /* ==========================================================================
     COLONNE GAUCHE (Bleu)
     ========================================================================== */
    sidebar: {
      width: "36%",
      minWidth: "36%",
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      position: "relative",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
      gap: `${margeReference * 1.09}`,
      marginTop:-20*0.75,
      paddingTop: 20 * 0.75,
      paddingBottom: 30 * 0.75,
    },

    profileContainer: {
      marginBottom: 15 * 0.75,
      alignSelf: "center",
      position: "relative",
      width: `${data.tailleImg * 0.75}`,
      borderRadius: `${data.borderRadiusImg * 0.75}`,
      borderWidth: 6 * 0.75,
      borderColor: "#ffffff",
      aspectRatio: "1 / 1",
      overflow: "hidden",
      backgroundColor: "#ddd",
    },

    profilePic: {
      width: "100%",
      height: "100%",
      borderRadius: `${data.borderRadiusImg * 0.75}`,
      objectFit: "cover",
      objectPosition: "top",
    },

    sidebarSection: {
      width: "100%",
      paddingLeft: 40 - Taillereference,
      paddingRight: 40 - Taillereference,
    },

    sidebarSectionH2: {
      fontSize: Taillereference * 1.1 * 0.95,
      letterSpacing: 1.5 * 0.75,
      fontWeight: 700,
      marginBottom: 15 * 0.75,
      color: "#ffffff",
      textTransform: "uppercase",
    },

    sidebarSectionUl: {
      flexDirection: "column",
      alignContent: "flex-start",
      alignItems: "flex-start",
      gap: `${margeReference * 0.6}`
    }, 

    blocInformation: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6 * 0.75,
    },

    sidebarSectionDivider: {
      width: "100%",
      height: 1.5 * 0.75,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      marginTop: 15 * 0.75,
      marginBottom: 8 * 0.75,
    },

    sidebarSectionP: {
      fontSize: Taillereference * 0.7,
    },

    sidebarSectionA: {
      textDecoration: 'none',
      color: "#ffffff",
      fontSize: Taillereference * 0.7,
    },

    /* ==========================================================================
     COLONNE DROITE (Blanche)
     ========================================================================== */
    mainContent: {
      minWidth: "64%",
      width: "64%",
      paddingTop: 30 * 0.75,
      paddingBottom: 25 * 0.75,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 2.09}`
    },

    header: {
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 1.09}`,
      paddingLeft: 45 - Taillereference,
      paddingRight: 45 - Taillereference,
    },

    headerH1: {
      fontSize: Taillereference * 2.1,
      fontWeight: 700,
      color: `${data.miseEnPage.colorPrincipale}`,
      lineHeight: 1.1 * 0.75,
    },

    headerSubtitle: {
      fontSize: Taillereference * 1.05,
      letterSpacing: 0.5 * 0.75,
      color: `${data.miseEnPage.colorPrincipale}`,
      textTransform: "uppercase",
    },

    headerSummary: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      lineHeight: 1.4,
      marginTop: 5 * 0.75,
    },

    mainSectionH2: {
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      color: "#ffffff",
      fontSize: Taillereference * 1.05,
      fontWeight: 700,
      letterSpacing: 1.5 * 0.75,
      paddingVertical: 6 * 0.75,
      paddingHorizontal: 45 - Taillereference,
      marginBottom: `${margeReference * 1.80}`,
      textTransform: "uppercase",
    },

    timeline: {
      position: "relative",
      paddingLeft: (45 - Taillereference) + (25 * 0.75),
      paddingRight: 45 - Taillereference,
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 1.7}`
    },

    timelineDot: {
      position: "absolute",
      left: -25 * 0.75,
      top: 3 * 0.75,
      width: 12 * 0.75,
      height: 12 * 0.75,
      borderRadius: 50,
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
    },

    timelineContentH3: {
      fontSize: Taillereference * 0.78,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
    },

    timelineContentDate: {
      fontSize: Taillereference * 0.65,
      fontWeight: 400,
      color: `${data.miseEnPage.colorTertiaire}`,
      marginTop: 4 * 0.75,
      marginBottom: 8 * 0.75,
      textTransform: "uppercase",
    },

    timelineContentSchool: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
    },

    timelineItem: {
      position: "relative"
    },

    timelineContentUl: {
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 0.6}`,
    },

    timelineContentLi: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
    },

    lienProjet: {
      marginLeft: 15 * 0.75,
      textDecoration: "underline",
      color: `${data.miseEnPage.colorPrincipale}`,
      textTransform:"none",
    }
  })

  const htmlStylesSidebar = {
    p: {
      fontSize: Taillereference * 0.7,
      margin: 0,
    },
  }

  const htmlStylesMain = {
    p: {
      fontSize: `${Taillereference * 0.7}`,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
    },
  }

    function renderSection(el) {
  
      if(el.id==="experiences"){
          return ( <>
                   {/* <!-- EXPÉRIENCES --> */}
         {data.experiences.display && 
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionH2}>EXPÉRIENCES PROFESSIONNELLES</Text>
                
                <View style={styles.timeline}>
                  {data.experiences.content.map((el, index) => {
                    const valeurWithoutUl = String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                    const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                    const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                    return(
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineDot}></View>
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineContentH3}>{el.poste} - {el.nomEntreprise}</Text>
                          <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                          <View>
                            <Html style={styles.timelineContentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html> 
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </View>
              </View>
            }
          </>
          )
      } else if(el.id==="projets"){
  
          {/* <!-- PROJETS --> */}
          return ( <>

          {data.projets.display && 
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionH2}>PROJETS</Text>
                
                <View style={styles.timeline}>
                  {data.projets.content.map((el, index) => {
                    const valeurWithoutUl = String(el.description).replace("<ul>"," ").replace("</ul>"," ")
                    const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl,'li','p')
                    const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                    return(
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineDot}></View>
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineContentH3}>{el.nomProjet} - {el.roleIntoProject} {el.lien && <Link style={styles.lienProjet} href={`${el.lien}`}> {el.texteLien ? el.texteLien : el.lien} </Link>}</Text>
                          <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                          <View>
                            <Html style={styles.timelineContentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </View>
              </View>
            }
  
              </>)
      }else if(el.id==="formations"){
           return ( <>
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionH2}>FORMATIONS</Text>
              
              <View style={styles.timeline}>
                {data.formations.content.map((el, index) => {
                  return(
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot}></View>
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineContentH3}>{el.diplomeObtenu}</Text>
                        <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                        <Text style={styles.timelineContentSchool}>{el.nomEcole} - {el.adresse}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
              </>)
      }else{
            const section= data.newsSections.find(section=>section.id==el.id)   
  
                  return( <> 
  
              <View key={section?.id} style={styles.mainSection}>
                <Text style={styles.mainSectionH2}>{section?.nom}</Text>
                <View style={styles.timeline}>
                  {section?.champs?.map((champ) => {
                    return (
                      <View key={champ?.id} style={styles.timelineItem}>
                        <View style={styles.timelineDot}></View>
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineContentH3}>{champ?.intitule}</Text>
                          <Text style={styles.timelineContentDate}>{champ?.dateDebut} - {champ?.dateFin}</Text>
                          <Text style={styles.timelineContentSchool}>{champ?.organisme} - {champ?.plateforme}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
                   </> )   
      }
  
  }


  function renderChamp(el){
  
      if(el.id==="competences"){
  
       if (data.competences?.display) {
                activeSections.push(
                  <View key="competences" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>COMPÉTENCES</Text>
                    <View>
                      <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueCompetence}</Html>
                    </View>
                  </View>
                );
              }
                return
      }else if(el.id==="langues"){
        
         if (data.langues?.display) {
                activeSections.push(
                  <View key="langues" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>LANGUES</Text>
                    <View>
                      <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueLangue}</Html>
                    </View>
                  </View>
                );
              }
                return
      }else if(el.id==="interets"){
              if (data.interets?.display) {
                activeSections.push(
                  <View key="interets" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>INTÉRÊTS</Text>
                    <View>
                      <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueInteret}</Html>
                    </View>
                  </View>
                );
              }
                return
      }else{
  
          const champ= data.champPersoBlocCompetenceLangue.find(champ=>champ.id==el.id)
          if(!champ) return
          
             const valeurWithoutUl=String(champ.content).replace("<ul>"," ").replace("</ul>"," ");
              const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p');
              const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');  
              
  
             activeSections.push(
                    <View key={champ.id} style={styles.sidebarSection}>
                      <Text style={styles.sidebarSectionH2}>{champ.titre}</Text>
                      <View>
                        <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValue}</Html>
                      </View>
                    </View>
                  );
  
          return
      }
  
  
  
  }




  return(
    <Document key={ordreKey}>
      <Page size="A4" style={styles.page}>

        <View style={styles.cvContainer}>
            
          {/* <!-- COLONNE GAUCHE (Sidebar) --> */}
          <View style={styles.sidebar}>

            {/* Photo de profil (Fixe, toujours en haut, sans séparateur en dessous) */}
            {data.imgProfil.display && 
              <View style={styles.profileContainer}>
                <View>
                  <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic}/>
                </View>
              </View>
            }

            {/* Logique dynamique pour les sections et diviseurs */}
            {(() => {
              // 1. BLOC INFORMATIONS
              const hasInfoDetails = data.phone !== "" || data.email !== "" || data.adresse !== "" || (data.champPerso && data.champPerso.length > 0);
              if (hasInfoDetails) {
                activeSections.push(
                  <View key="informations" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>INFORMATIONS</Text>
                    <View style={styles.sidebarSectionUl}>
                      {data.champPerso && data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                        if (el.content !== "") {
                          return (
                            <View style={styles.blocInformation} key={index}>
                              {el.iconePdf && <View style={{ width: 16 * 0.75 }}>{el.iconePdf("#ffffff")}</View>}
                              {el.url ? <Link src={el.url} style={styles.sidebarSectionA}>{el.content}</Link> : <Text style={styles.sidebarSectionP}>{el.content}</Text>}
                            </View>
                          );
                        }
                        return null;
                      })}

                      {data.phone !== "" && (
                        <View style={styles.blocInformation}>
                          <Text style={styles.sidebarSectionP}>{data.phone}</Text>
                        </View>
                      )}

                      {data.email !== "" && (
                        <View style={styles.blocInformation}>
                          <Text style={styles.sidebarSectionP}>{data.email}</Text>
                        </View>
                      )}

                      {data.adresse !== "" && (
                        <View style={styles.blocInformation}>
                          <Text style={styles.sidebarSectionP}>{data.adresse}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              }
            

              data.ordreSectionsPrincipales.map(el=>{
                  renderChamp(el)
                })

              // Rendu final séquentiel avec injection conditionnelle du diviseur
              return activeSections.map((section, index) => {
                const isNotLast = index < activeSections.length - 1;
                return (
                  <React.Fragment key={section.key || index}>
                    {section}
                    {/* Le diviseur ne s'affiche que s'il y a une section visible après */}
                    {isNotLast && <View style={styles.sidebarSectionDivider} />}
                  </React.Fragment>
                );
              });
            })()}

          </View>


          {/* <!-- COLONNE DROITE (Contenu Principal) --> */}
          <View style={styles.mainContent}>

            <View style={styles.header}>
              <Text style={styles.headerH1}>{data.nom}</Text>
              <Text style={styles.headerSubtitle}>{data.poste}</Text>
              <Text style={styles.headerSummary}>
                {data.profil}
              </Text>
            </View>

              {
                data.ordreSectionsSecondaires.map(el=>{
                  return <View style={{width:"100%"}} key={el.id}>
                    {renderSection(el)}
                  </View>
                })
              }
            

          </View>

        </View>
      </Page>
    </Document>
  )
}
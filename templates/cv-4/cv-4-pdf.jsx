"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Link, Image } from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv"
import Html from 'react-pdf-html';

export default function Cv8Pdf({data, dataLoaded, slug, status}){
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

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      position: "relative",
      fontFamily: `${data.miseEnPage.family ? data.miseEnPage.family : "Helvetica" }`, 
      boxSizing: 'border-box',
      paddingVertical: 30 * 0.75,
      paddingHorizontal:15*0.75
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
     COLONNE GAUCHE (Sidebar)
     ========================================================================== */
    sidebar: {
      width: "36%",
      minWidth: "36%",
      minHeight: "100%",
      height:"100%",
      flexGrow: 1,
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      position: "relative",
      color: `${data.miseEnPage.colorSecondaire}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: `${margeReference * 1.6}`,
      paddingVertical: 30 * 0.75,
      paddingHorizontal:`${(40-Taillereference) *0.75}`,
        marginTop: -15 * 0.75,
    },

    profileContainer: {
      marginBottom: 10 * 0.75,
      position: "relative",
      width: `${data.tailleImg * 0.75}`,
      borderRadius: `${data.borderRadiusImg * 0.75}`,
      borderWidth: 4 * 0.75,
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    sidebarSectionH2: {
      backgroundColor: "#ffffff",
      color: `${data.miseEnPage.colorSecondaire}`,
      width: "85%",
      paddingVertical: 5 * 0.75,
      paddingHorizontal: 10 * 0.75,
      fontSize: Taillereference * 0.75,
      letterSpacing: 2 * 0.75,
      fontWeight: 500,
      marginBottom: 18 * 0.75,
      textTransform: "uppercase",
      textAlign: "center",
    },

    sidebarSectionUl: {
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      gap: `${margeReference * 0.55}`
    }, 

    blocInformation: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5 * 0.75,
    },

    sidebarSectionP: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
    },

    sidebarSectionA: {
      textDecoration: 'none',
      color: `${data.miseEnPage.colorTertiaire}`,
      fontSize: Taillereference * 0.7,
    },

    /* ==========================================================================
     COLONNE DROITE (Blanche)
     ========================================================================== */
    mainContent: {
      minWidth: "64%",
      width: "64%",
      paddingLeft: 45 - Taillereference,
      paddingRight: 35 - Taillereference,
      paddingTop: 15 * 0.75,
      // paddingBottom: 25 * 0.75,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 2.09}`
    },

    header: {
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 1.2}`
    },

    headerH1: {
      fontSize: Taillereference * 2.3,
      fontWeight: 400,
      color: `${data.miseEnPage.colorSecondaire}`,
      lineHeight: 1.1 * 0.75,
      letterSpacing: 1 * 0.75,
    },

    headerSubtitle: {
      fontSize: Taillereference * 0.85,
      letterSpacing: 2.5 * 0.75,
      color: `${data.miseEnPage.colorTertiaire}`,
      textTransform: "uppercase",
    },

    headerSummary: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      lineHeight: 1.4,
      marginTop: 6 * 0.75,
    },

    mainSectionH2: {
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      color: `${data.miseEnPage.colorSecondaire}`,
      fontSize: Taillereference * 0.78,
      fontWeight: 500,
      letterSpacing: 2 * 0.75,
      paddingVertical: 6 * 0.75,
      paddingHorizontal: 14 * 0.75,
      marginBottom: `${margeReference * 1.6}`,
      textTransform: "uppercase",
    },

    timeline: {
      position: "relative",
      paddingLeft: 14 * 0.75,
      paddingRight: 5 * 0.75,
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 1.5}`
    },

    timelineContentH3: {
      fontSize: Taillereference * 0.75,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      textTransform: "uppercase",
      letterSpacing: 0.5 * 0.75,
    },

    timelineContentDate: {
      fontSize: Taillereference * 0.68,
      fontWeight: 400,
      color: `${data.miseEnPage.colorTertiaire}`,
      marginTop: 4 * 0.75,
      marginBottom: 8 * 0.75,
      textTransform: "uppercase",
    },

    timelineContentSchool: {
      fontSize: Taillereference * 0.68,
      color: `${data.miseEnPage.colorTertiaire}`,
      marginTop: 4 * 0.75,
    },

    timelineItem: {
      position: "relative"
    },

    timelineContentUl: {
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 0.5}`,
    },

    timelineContentLi: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
    },

    lienProjet: {
      marginLeft: 15 * 0.75,
      textDecoration: "underline",
      color: `${data.miseEnPage.colorSecondaire}`,
      textTransform: "none",
    }
  })

  const htmlStylesSidebar = {
    p: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
      textAlign: "center",
    },
  }

  const htmlStylesMain = {
    p: {
      fontSize: `${Taillereference * 0.7}`,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
      lineHeight: 1.4,
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
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineContentH3}>{el.poste}</Text>
                          <Text style={styles.timelineContentDate}>{el.nomEntreprise} | {el.dateDebut} - {el.dateFin}</Text>
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
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineContentH3}>{el.nomProjet} {el.lien && <Link style={styles.lienProjet} href={`${el.lien}`}> {el.texteLien ? el.texteLien : el.lien} </Link>}</Text>
                          <Text style={styles.timelineContentDate}>{el.roleIntoProject} | {el.dateDebut} - {el.dateFin}</Text>
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
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineContentH3}>{el.diplomeObtenu}</Text>
                          <Text style={styles.timelineContentSchool}>{el.nomEcole}{el.adresse ? `, ${el.adresse}` : ""} | {el.dateDebut} - {el.dateFin}</Text>
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
    
                <View key={section?.id} >
                  <Text style={styles.mainSectionH2}>{section?.nom}</Text>
                  <View style={styles.timeline}>
                    {section?.champs?.map((champ) => {
                      return (
                        <View key={champ?.id} style={styles.timelineItem}>
                          <View>
                            <Text style={styles.timelineContentH3}>{champ?.intitule}</Text>
                            <Text style={styles.timelineContentSchool}>{champ?.organisme}{champ?.plateforme ? `, ${champ.plateforme}` : ""} | {champ.dateDebut} - {champ.dateFin}</Text>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                </View>
                     </> )   
        }
    
    }


      function renderChamp(el){
      
          if(el.id==="competences"){
    
            return(
              <>
                 {data.competences?.display &&
                    <View key="competences" style={styles.sidebarSection}>
                      <Text style={styles.sidebarSectionH2}>COMPÉTENCES</Text>
                      <View>
                        <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueCompetence}</Html>
                      </View>
                    </View>
                 }
              
              </>
            )
          }else if(el.id==="langues"){
            return (
              <>
                  {data.langues?.display && (
                     <View key="langues" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>LANGUES</Text>
                    <View>
                      <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueLangue}</Html>
                    </View>
                  </View>
                  )}
              </>
            )
          }else if(el.id==="interets"){
           return (
            <>
                     {data.interets?.display && (
                         <View key="interets" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>INTÉRÊTS</Text>
                    <View>
                      <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueInteret}</Html>
                    </View>
                  </View>
                  )}
            </>
           )
          }else{
            
            const champ= data.champPersoBlocCompetenceLangue.find(champ=>champ.id==el.id)
            if(!champ) return
            const valeurWithoutUl=String(champ.content).replace("<ul>"," ").replace("</ul>"," ");
             const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p');
             const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');  

            return(
                   <View key={champ.id} style={styles.sidebarSection}>
                      <Text style={styles.sidebarSectionH2}>{el.titre}</Text>
                      <View>
                        <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValue}</Html>
                      </View>
                    </View>
            )
          }
      }



  return(
    <Document key={ordreKey}> 
      <Page size="A4" style={styles.page}>

        <View style={styles.cvContainer}>
            
          {/* <!-- COLONNE GAUCHE (Sidebar) --> */}
          <View style={styles.sidebar}>

            {/* Photo de profil */}
            {data.imgProfil.display && 
              <View style={styles.profileContainer}>
                <View>
                  <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic}/>
                </View>
              </View>
            }

            {/* Logique dynamique pour les sections */}
 
          
                  <View key="informations" style={styles.sidebarSection}>
                    <Text style={styles.sidebarSectionH2}>INFORMATIONS</Text>
                    <View style={styles.sidebarSectionUl}>
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

                      {data.champPerso && data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                        if (el.content !== "") {
                          return (
                            <View style={styles.blocInformation} key={index}>
                              {el.url ? <Link src={el.url} style={styles.sidebarSectionA}>{el.content}</Link> : <Text style={styles.sidebarSectionP}>{el.content}</Text>}
                            </View>
                          );
                        }
                        return null;
                      })}
                    </View>
                  </View>
              

                  {data.ordreSectionsPrincipales.map(el=>{
                                 return <View style={{width:"100%"}} key={el.id}>
                                                    {renderChamp(el)}
                                                  </View>
                              })
                              }

            

 

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
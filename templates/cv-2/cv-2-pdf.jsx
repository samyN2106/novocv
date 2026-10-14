"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv";
import Html from 'react-pdf-html';

export default function Cv2Pdf({ data, dataLoaded, slug, status }) {
  const ordreKey = [
  ...(data.ordreSectionsSecondaires ?? []).map(
    (section) => `${section.type}-${section.id}`
  ),
  ...(data.ordreSectionsPrincipales ?? []).map(
    (section) => `${section.type}-${section.id}`
  ),
].join("|");

  const template = templates.find(el => el.slug === slug);
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

  let Taillereference = (data.miseEnPage.taille + 5.5) * 0.75;
  let margeReference = data.miseEnPage.margeReference * 0.75;

  const valeurWithoutUlCompetence = String(data.competences.content).replace("<ul>", " ").replace("</ul>", " ");
  const valueReplacedByPCompetence = handleRemplaceBalise(valeurWithoutUlCompetence, 'li', 'p');
  const cleanHTMLValueCompetence = valueReplacedByPCompetence.replace(/&nbsp;/g, ' ');

  const valeurWithoutUlLangue = String(data.langues.content).replace("<ul>", " ").replace("</ul>", " ");
  const valueReplacedByPLangue = handleRemplaceBalise(valeurWithoutUlLangue, 'li', 'p');
  const cleanHTMLValueLangue = valueReplacedByPLangue.replace(/&nbsp;/g, ' ');

  const valeurWithoutUlInteret = String(data.interets.content).replace("<ul>", " ").replace("</ul>", " ");
  const valueReplacedByPInteret = handleRemplaceBalise(valeurWithoutUlInteret, 'li', 'p');
  const cleanHTMLValueInteret = valueReplacedByPInteret.replace(/&nbsp;/g, ' ');

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#f3f3f3",
      position: "relative",
      fontFamily: `${data.miseEnPage.family ? data.miseEnPage.family : "Helvetica"}`,
      boxSizing: 'border-box',
      padding: 25 * 0.75
    },
    cvContainer: {
      display: "flex",
      flexDirection: 'column',
      position: "relative",
      boxSizing: 'border-box',
      color: `${data.miseEnPage.colorTertiaire}`,
    },
    cvTopSection: {
      display: "flex",
      flexDirection: 'row',
      alignItems: "center",
      gap: 30 * 0.75,
      marginBottom: 30 * 0.75,
    },
    profileContainer: {
      position: "relative",
      width: `${data.tailleImg * 0.75}`,
      borderRadius: `${data.borderRadiusImg * 0.75}`,
      borderWidth: 5 * 0.75,
      borderColor: "#ffffff",
      aspectRatio: "1 / 1",
      overflow: "hidden",
      backgroundColor: "#ddd",
    },
    profilePic: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: 6 * 0.75,
      flexGrow: 1,
      flex:1,
    },
    headerH1: {
      fontSize: Taillereference * 2.2,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      lineHeight: 1.1,
    },
    headerSubtitle: {
      fontSize: Taillereference * 1.1,
      fontWeight: 500,
      letterSpacing: 0.5 * 0.75,
      color: `${data.miseEnPage.colorSecondaire}`,
      marginBottom: 6 * 0.75,
      textTransform: "uppercase",
    },
    headerSummary: {
      fontSize: Taillereference * 0.72,
      color: `${data.miseEnPage.colorTertiaire}`,
      textAlign: "justify",
      lineHeight: 1.45,
    },
    cvBodyLayout: {
      display: "flex",
      flexDirection: 'row',
      // alignItems: "flex-start",
      gap: 40 * 0.75,
    },
    sidebar: {
      width: "32%",
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 1.5,
    },
    mainContent: {
      width: "68%",
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 1.8,
    },
    sidebarSectionH2: {
      fontSize: Taillereference * 1.05,
      fontWeight: 700,
      letterSpacing: 1 * 0.75,
      color: `${data.miseEnPage.colorSecondaire}`,
      marginBottom: 10 * 0.75,
      textTransform: 'uppercase',
    },
    informationHeader: {
      fontSize: Taillereference * 1.05,
      fontWeight: 700,
      letterSpacing: 1 * 0.75,
      color: "#ffffff",
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      paddingVertical: 8 * 0.75,
      paddingHorizontal: 15 * 0.75,
      marginBottom: 15 * 0.75,
      textTransform: 'uppercase',
      marginRight: -40 * 0.75,
    },
    mainSectionH2: {
      fontSize: Taillereference * 1.05,
      fontWeight: 700,
      letterSpacing: 1 * 0.75,
      color: "#ffffff",
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      paddingVertical: 8 * 0.75,
      paddingHorizontal: 15 * 0.75,
      marginBottom: 15 * 0.75,
      textTransform: 'uppercase',
    },
    sidebarSectionUl: {
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 0.5,
    },
    blocInformation: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6 * 0.75,
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
    timeline: {
      position: "relative",
      borderLeftWidth: 2,
      borderLeftColor: `${data.miseEnPage.colorPrincipale}`,
      paddingLeft: 20 * 0.75,
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 1.4,
    },
    timelineDot: {
      position: "absolute",
      left: -26 * 0.75,
      top: 3 * 0.75,
      width: 10 * 0.75,
      height: 10 * 0.75,
      borderRadius: 50,
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
    },
    timelineItem: {
      position: "relative",
    },
    timelineContentH3: {
      fontSize: Taillereference * 0.78,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      marginBottom: 3 * 0.75,
    },
    timelineContentDate: {
      fontSize: Taillereference * 0.62,
      fontWeight: 600,
      color: `${data.miseEnPage.colorTertiaire}`,
      marginBottom: 6 * 0.75,
      textTransform: 'uppercase',
    },
    timelineContentSchool: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
    },
    contentUl: {
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 0.45,
    },
    lienProjet: {
      marginLeft: 10 * 0.75,
      textDecoration: "underline",
      color: `${data.miseEnPage.colorPrincipale}`,
      textTransform:"none",
    }
  });

  const htmlStylesSidebar = {
    p: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
    }
  };

  const htmlStylesMain = {
    p: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
    }
  };

    function renderSection(el) {
  
      if(el.id==="experiences"){
          return ( <>
                   {/* <!-- EXPÉRIENCES --> */}
               {data.experiences.display && (
                <View>
                  <Text style={styles.mainSectionH2}>EXPÉRIENCES PROFESSIONNELLES</Text>
                  <View style={styles.timeline}>
                    {data.experiences.content.map((el, index) => {
                      const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                      const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                      const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                      return (
                        <View key={index} style={styles.timelineItem}>
                          <View style={styles.timelineDot} />
                          <View>
                            <Text style={styles.timelineContentH3}>{el.poste} - {el.nomEntreprise}</Text>
                            <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                            <Html style={styles.contentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                </View>
              )}
          </>
          )
      } else if(el.id==="projets"){
  
          {/* <!-- PROJETS --> */}
          return ( <>
           
              {data.projets.display && (
                <View>
                  <Text style={styles.mainSectionH2}>PROJETS</Text>
                  <View style={styles.timeline}>
                    {data.projets.content.map((el, index) => {
                      const valeurWithoutUl = String(el.description).replace("<ul>", " ").replace("</ul>", " ");
                      const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                      const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                      return (
                        <View key={index} style={styles.timelineItem}>
                          <View style={styles.timelineDot} />
                          <View>
                            <Text style={styles.timelineContentH3}>
                              {el.nomProjet} {el.roleIntoProject && `- ${el.roleIntoProject}`}
                              {"   "}
                              {el.lien && <Link style={styles.lienProjet} src={el.lien}>{el.texteLien ? el.texteLien : el.lien}</Link>}
                            </Text>
                            <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                            <Html style={styles.contentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                </View>
              )}
  
              </>)
      }else if(el.id==="formations"){
           return ( <>
            <View>
                <Text style={styles.mainSectionH2}>FORMATIONS</Text>
                <View style={styles.timeline}>
                  {data.formations.content.map((el, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      <View>
                        <Text style={styles.timelineContentH3}>{el.diplomeObtenu}</Text>
                        <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                        <Text style={styles.timelineContentSchool}>{el.nomEcole} {el.adresse && `- ${el.adresse}`}</Text>
                      </View>
                    </View>
                  ))}
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
                        <View style={styles.timelineDot}></View>
                        <View>
                          <Text style={styles.timelineContentH3}>{champ?.intitule}</Text>
                          <Text style={styles.timelineContentDate}>{champ?.dateDebut} - {champ?.dateFin}</Text>
                          <Text style={styles.timelineContentSchool}>{champ?.organisme} - {champ?.plateforme}</Text>
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
                 {data.competences?.display && (
                <View>
                  <Text style={styles.sidebarSectionH2}>COMPÉTENCES</Text>
                  <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueCompetence}</Html>
                </View>
              )}
          </>
        )
      }else if(el.id==="langues"){
        return (
          <>
              {data.langues?.display && (
                <View>
                  <Text style={styles.sidebarSectionH2}>LANGUES</Text>
                  <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueLangue}</Html>
                </View>
              )}
          </>
        )
      }else if(el.id==="interets"){
       return (
        <>
                 {data.interets?.display && (
                <View>
                  <Text style={styles.sidebarSectionH2}>INTÉRÊTS</Text>
                  <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueInteret}</Html>
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
               <View key={champ.id}>
                <Text style={styles.sidebarSectionH2}>{champ.titre}</Text>
                <Html style={styles.sidebarSectionUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValue}</Html>
              </View>
        )
      }
  }


  return (
    <Document key={ordreKey}>
      <Page size="A4" style={styles.page}>
        <View style={styles.cvContainer}>
          
          <View style={styles.cvTopSection}>
            {data.imgProfil.display && (
              <View style={styles.profileContainer}>
                <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic} />
              </View>
            )}
            <View style={styles.header}>
              <Text style={styles.headerH1}>{data.nom}</Text>
              <Text style={styles.headerSubtitle}>{data.poste}</Text>
              <Text style={styles.headerSummary}>{data.profil}</Text>
            </View>
          </View>

          <View style={styles.cvBodyLayout}>
            <View style={styles.sidebar}>
              <View>
                <Text style={styles.informationHeader}>INFORMATIONS</Text>
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

            <View style={styles.mainContent}>

               {
                data.ordreSectionsSecondaires.map(el=>{
                  return <View style={{width:"100%"}} key={el.id}>
                    {renderSection(el)}
                  </View>
                })
              }


            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
}
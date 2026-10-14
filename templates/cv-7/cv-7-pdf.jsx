"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Link, Image } from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv";
import Html from 'react-pdf-html';

export default function Cv7Pdf({ data, dataLoaded, slug, status }) {
  
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
      backgroundColor: "#ffffff",
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

    /* En-tête / Header */
    headerContainer: {
      display: "flex",
      flexDirection: 'row',
      alignItems: "center",
      gap: 30 * 0.75,
      marginBottom: `${margeReference * 1.5}`,
    },

    profileContainer: {
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

    headerInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 6 * 0.75,
      flexGrow: 1,
    },

    headerH1: {
      fontSize: Taillereference * 2.2,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      letterSpacing: 1 * 0.75,
      lineHeight: 1.1,
    },

    headerSubtitle: {
      fontSize: Taillereference * 1.1,
      fontWeight: 400,
      letterSpacing: 1 * 0.75,
      color: `${data.miseEnPage.colorSecondaire}`,
      marginBottom: 10 * 0.75,
      textTransform: 'uppercase',
    },

    contactRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20 * 0.75,
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
    },

    blocInformation: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6 * 0.75,
    },

    blocInformationA: {
      textDecoration: 'none',
      color: "inherit",
    },

    /* Profil / Résumé */
    summarySection: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      textAlign: "justify",
      lineHeight: 1.5,
      marginBottom:  `${margeReference * 1.5}`
    },

    /* Sections Principales */
    mainSection: {
      marginBottom: 23 * 0.75,
    },

    mainSectionH2: {
      fontSize: Taillereference * 1.1,
      fontWeight: 600,
      color: `${data.miseEnPage.colorSecondaire}`,
      letterSpacing: 1.5 * 0.75,
      marginBottom: 15 * 0.75,
      borderBottomWidth: 1,
      borderBottomColor: `${data.miseEnPage.colorPrincipale}`,
      paddingBottom: 5 * 0.75,
      textTransform: 'uppercase',
    },

    experienceRow: {
      display: "flex",
      flexDirection: "row",
      gap: 25 * 0.75,
      marginBottom: 20 * 0.75,
    },

    experienceDate: {
      width: "25%",
      fontSize: Taillereference * 0.6,
      fontWeight: 500,
      color: `${data.miseEnPage.colorPrincipale}`,
      letterSpacing: 0.5 * 0.75,
      paddingTop: 3 * 0.75,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 6 * 0.75,
      textTransform: 'uppercase',
    },

    experienceDetails: {
      width: "75%",
    },

    experienceDetailsH3: {
      fontSize: Taillereference * 0.78,
      fontWeight: 600,
      color: `${data.miseEnPage.colorSecondaire}`,
      marginBottom: 4 * 0.75,
    },

    formationSchool: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      marginBottom: 6 * 0.75,
    },

    contentUl: {
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 0.8,
      marginTop: 8 * 0.75,
    },

    lienProjet: {
      marginLeft: 15 * 0.75,
      textDecoration: "underline",
      color: `${data.miseEnPage.colorPrincipale}`,
      textTransform:"none",
    },

    /* Blocs Inférieurs (Langues, Compétences, Loisirs) */
    bottomSectionsGrid: {
      flexDirection: "row",
      
      flexWrap: 'wrap', 
       width: "100%",
      gap: 30 * 0.75,
      marginTop: 10 * 0.75,
    },

    bottomColumn: {
      width:"30%",
      boxSizing: "border-box",
    },

    bottomColumnH2: {
      fontSize: Taillereference * 1.1,
      fontWeight: 600,
      color: `${data.miseEnPage.colorSecondaire}`,
      letterSpacing: 1 * 0.75,
      marginBottom: 12 * 0.75,
      borderBottomWidth: 1,
      borderBottomColor: `${data.miseEnPage.colorPrincipale}`,
      paddingBottom: 4 * 0.75,
      textTransform: 'uppercase',
    },

    skillsListContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 6 * 0.75,
    }
  });

  const htmlStylesMain = {
    p: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
    }
  };

  const htmlStylesBottom = {
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
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionH2}>EXPÉRIENCES PROFESSIONNELLES</Text>
              {data.experiences.content.map((el, index) => {
                const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                return (
                  <View key={index} style={styles.experienceRow}>
                    <View style={styles.experienceDate}>
                      <Text>{el.dateDebut} - {el.dateFin}</Text>
                    </View>
                    <View style={styles.experienceDetails}>
                      <Text style={styles.experienceDetailsH3}>{el.poste} - {el.nomEntreprise}</Text>
                      <Html style={styles.contentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
            </>
            )
        } else if(el.id==="projets"){
    
            {/* <!-- PROJETS --> */}
            return ( <>
             
              {data.projets.display && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionH2}>PROJETS</Text>
              {data.projets.content.map((el, index) => {
                const valeurWithoutUl = String(el.description).replace("<ul>", " ").replace("</ul>", " ");
                const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');

                return (
                  <View key={index} style={styles.experienceRow}>
                    <View style={styles.experienceDate}>
                      <Text>{el.dateDebut} - {el.dateFin}</Text>
                    </View>
                    <View style={styles.experienceDetails}>
                      <Text style={styles.experienceDetailsH3}>
                        {el.nomProjet} - {el.roleIntoProject}
                        {"   "}
                        {el.lien && <Link style={styles.lienProjet} src={el.lien}>{el.texteLien ? el.texteLien : el.lien}</Link>}
                      </Text>
                      <Html style={styles.contentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
    
                </>)
        }else if(el.id==="formations"){
             return ( <>
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionH2}>FORMATIONS</Text>
            {data.formations.content.map((el, index) => {
              return (
                <View key={index} style={styles.experienceRow}>
                  <View style={styles.experienceDate}>
                    <Text>{el.dateDebut} - {el.dateFin}</Text>
                  </View>
                  <View style={styles.experienceDetails}>
                    <Text style={styles.experienceDetailsH3}>{el.diplomeObtenu}</Text>
                    <Text style={styles.formationSchool}>{el.nomEcole} - {el.adresse}</Text>
                  </View>
                </View>
              );
            })}
          </View>
                </>)
        }else{
              const section= data.newsSections.find(section=>section.id==el.id)   
    
                    return( <> 
                      <View key={section?.id} style={styles.mainSection}>
            <Text style={styles.mainSectionH2}>{section?.nom}</Text>
            {section?.champs?.map((champ) => {
              return (
                <View key={champ?.id} style={styles.experienceRow}>
                  <View style={styles.experienceDate}>
                    <Text>{champ.dateDebut} - {champ.dateFin}</Text>
                  </View>
                  <View style={styles.experienceDetails}>
                    <Text style={styles.experienceDetailsH3}>{champ.intitule}</Text>
                    <Text style={styles.formationSchool}>{champ.organisme} - {champ.plateforme}</Text>
                  </View>
                </View>
              );
            })}
          </View>

                
                     </> )   
        }
    
    }



      function renderChamp(el){
      
          if(el.id==="competences"){
      
            return(<>
              {data.competences.display && (
              <View >
                <Text style={styles.bottomColumnH2}>COMPÉTENCES</Text>
                <Html style={styles.skillsListContainer} stylesheet={htmlStylesBottom}>{cleanHTMLValueCompetence}</Html>
              </View>
            )}
            </>)
          }else if(el.id==="langues"){
            
            return(<>
                    {data.langues.display && (
              <View >
                <Text style={styles.bottomColumnH2}>LANGUES</Text>
                <Html style={styles.skillsListContainer} stylesheet={htmlStylesBottom}>{cleanHTMLValueLangue}</Html>
              </View>
            )}
      
            </>)
          }else if(el.id==="interets"){
            return(<>
                    {data.interets.display && (
              <View >
                <Text style={styles.bottomColumnH2}>INTÉRÊTS</Text>
                <Html style={styles.skillsListContainer} stylesheet={htmlStylesBottom}>{cleanHTMLValueInteret}</Html>
              </View>
            )}
          </>)
          }else{
      
              const champ= data.champPersoBlocCompetenceLangue.find(champ=>champ.id==el.id)
              if(!champ) return
              
                const valeurWithoutUl=String(champ.content).replace("<ul>"," ").replace("</ul>"," ")
                        const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                        const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');   
                  
      
                  return(<>

                       <View key={champ.id} >
                <Text style={styles.bottomColumnH2}>{champ.titre}</Text>
                 <View style={styles.inlineBox}>
                  <Html stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                </View>
              </View>
                  
                  </>)
    
          }
      
      
      
      }




  return (
    <Document key={ordreKey}>
      <Page size="A4" style={styles.page}>
        <View style={styles.cvContainer}>

          {/* En-tête / Header */}
          <View style={styles.headerContainer}>
            {data.imgProfil.display && (
              <View style={styles.profileContainer}>
                <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic} />
              </View>
            )}
            <View style={styles.headerInfo}>
              <Text style={styles.headerH1}>{data.nom}</Text>
              <Text style={styles.headerSubtitle}>{data.poste}</Text>
              <View style={styles.contactRow}>
                {data.email !== "" && (
                  <View style={styles.blocInformation}>
                    <Svg style={{ width: 16 * 0.75, color: data.miseEnPage.colorPrincipale }} viewBox="0 0 20 20">
                      <Path fill={`${data.miseEnPage.colorPrincipale}`} d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                    </Svg>
                    <Text>{data.email}</Text>
                  </View>
                )}
                {data.phone !== "" && (
                  <View style={styles.blocInformation}>
                    <Svg style={{ width: 16 * 0.75, color: data.miseEnPage.colorPrincipale }} viewBox="0 0 24 24">
                      <Path fill={`${data.miseEnPage.colorPrincipale}`} d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                    </Svg>
                    <Text>{data.phone}</Text>
                  </View>
                )}
                {data.adresse !== "" && (
                  <View style={styles.blocInformation}>
                    <Svg style={{ width: 16 * 0.75 }} viewBox="0 0 24 24">
                      <Path fill={`${data.miseEnPage.colorPrincipale}`} d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                    </Svg>
                    <Text>{data.adresse}</Text>
                  </View>
                )}
                {data.champPerso && data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                  if (el.content !== "") {
                    return (
                      <View style={styles.blocInformation} key={index}>
                        {el.iconePdf && <View style={{ width: 16 * 0.75, color: data.miseEnPage.colorPrincipale }}>{el.iconePdf(data.miseEnPage.colorPrincipale)}</View>}
                        {el.url ? <Link src={el.url} style={styles.blocInformationA}>{el.content}</Link> : <Text>{el.content}</Text>}
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          </View>

          {/* Résumé / Profil */}
          {data.profil && (
            <Text style={styles.summarySection}>{data.profil}</Text>
          )}


                  {
                        data.ordreSectionsSecondaires.map(el=>{
                          return renderSection(el)
                        })
                      }


         

          {/* Blocs inférieurs (Langues, Compétences, Loisirs) */}
          <View style={styles.bottomSectionsGrid}>
                          {

               data.ordreSectionsPrincipales.map((el,index)=>{
                  return <View key={index} style={styles.bottomColumn}>  {renderChamp(el)}
                  </View>
                })

            }

            
          </View>

        </View>
      </Page>
    </Document>
  );
}
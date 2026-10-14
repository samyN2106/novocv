"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Link, Image } from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv"
import Html from 'react-pdf-html';
import { iconesPdf } from "@/components/Editeur/Icones";


export default function Cv5Pdf({data, dataLoaded, slug, status}){

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

  const formatInlineHtml = (htmlStr, separator) => {
    const withoutUl = String(htmlStr).replace(/<\/?ul>/g, "");
    const items = [];
    const regex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let match;
    while ((match = regex.exec(withoutUl)) !== null) {
      const text = match[1].replace(/&nbsp;/g, ' ').trim();
      if (text) items.push(text);
    }
    if (items.length > 0) {
      return `<p>${items.join(separator)}</p>`;
    }
    const clean = withoutUl.replace(/&nbsp;/g, ' ');
    return handleRemplaceBalise(clean, 'li', 'p');
  };

  const cleanHTMLValueCompetence = formatInlineHtml(data.competences.content, "  •  ");
  const cleanHTMLValueLangue = formatInlineHtml(data.langues.content, "  •  ");
  const cleanHTMLValueInteret = formatInlineHtml(data.interets.content, "  •  ");

  const formatBulletHtml = (htmlStr) => {
    const withoutUl = String(htmlStr).replace(/<\/?ul>/g, " ");
    const withBullets = withoutUl.replace(/<li[^>]*>/gi, "<li>• ");
    const replaced = handleRemplaceBalise(withBullets, 'li', 'p');
    return replaced.replace(/&nbsp;/g, ' ');
  };

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      position: "relative",
      fontFamily: `${data.miseEnPage.family ? data.miseEnPage.family : "Helvetica" }`, 
      boxSizing: 'border-box',
      paddingVertical: 28 * 0.75,
    },

    cvContainer: {
      display: "flex",
      flexDirection: 'column',
      position: "relative",
      boxSizing: 'border-box',
      minHeight: "100%",
    },

    /* ==========================================================================
     EN-TÊTE SUPÉRIEUR (Bandeau collé au bord supérieur uniquement sur la 1ère page)
     ========================================================================== */
    topBanner: {
      width: "100%",
      backgroundColor: `${data.miseEnPage.colorPrincipale}`,
      color: "#ffffff",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 28 * 0.75,
      marginTop: -28 * 0.75,
      paddingHorizontal: 45 - Taillereference,
      gap: 20 * 0.75,
    },

    bannerLeft: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },

    headerH1: {
      fontSize: Taillereference * 2.1,
      fontWeight: 400,
      color: "#ffffff",
      lineHeight: 1.1 * 0.75,
      letterSpacing: 1 * 0.75,
    },

    headerSubtitle: {
      fontSize: Taillereference * 1.05,
      color: "#ffffff",
      marginTop: 15 * 0.75,
      fontWeight: 300,
      textTransform: "uppercase",
    },

    bannerDivider: {
      width: "100%",
      height: 1.5 * 0.75,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      marginVertical: 12 * 0.75,
    },

    contactGrid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: 8 * 0.75,
    },

    blocInformation: {
      width: "50%",
      flexDirection: "row",
      alignItems: "center",
      gap: 6 * 0.75,
    },

    sidebarSectionP: {
      fontSize: Taillereference * 0.68,
      color: "#ffffff",
    },

    sidebarSectionA: {
      textDecoration: 'none',
      color: "#ffffff",
      fontSize: Taillereference * 0.68,
    },

    profileContainer: {
      position: "relative",
      width: `${data.tailleImg * 0.75}`,
      borderRadius: `${data.borderRadiusImg * 0.75}`,
      borderWidth: 2 * 0.75,
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

    /* ==========================================================================
     CORPS PRINCIPAL AVEC MARGES VERTICALES DE SÉCURITÉ POUR LES PAGES SUIVANTES
     ========================================================================== */
    mainContent: {
      width: "100%",
      paddingTop: 25 * 0.75, 
      paddingBottom: 25 * 0.75,
      paddingHorizontal: 45 - Taillereference *0.75,
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 1.6}`,
    },

    headerSummary: {
      fontSize: Taillereference * 0.72,
      color: `${data.miseEnPage.colorTertiaire}`,
      lineHeight: 1.5,
    },

    mainSection: {
      width: "100%",
    },

    mainSectionH2: {
      backgroundColor: "#E2E6E9",
      color: `${data.miseEnPage.colorSecondaire}`,
      fontSize: Taillereference * 0.88,
      fontWeight: 500,
      paddingVertical: 6 * 0.75,
      paddingHorizontal: 15 * 0.75,
      marginBottom: `${margeReference * 1.2}`,
      marginLeft: -(45 - Taillereference),
      textTransform: "uppercase"
    },

    timeline: {
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 1.3}`,
    },

    timelineItem: {
      position: "relative",
    },

    timelineHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 5 * 0.75,
    },

    timelineContentH3: {
      fontSize: Taillereference * 0.74,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      textTransform: "uppercase",
      flex: 1,
      paddingRight: 10 * 0.75,
      textTransform: "uppercase",
    },

    timelineContentDate: {
      fontSize: Taillereference * 0.68,
      fontWeight: 400,
      color: `${data.miseEnPage.colorTertiaire}`,
      textTransform: "uppercase"
    },

    timelineContentUl: {
      display: "flex",
      flexDirection: "column",
      gap: `${margeReference * 0.35}`,
      paddingLeft: 8 * 0.75,
    },

    timelineContentSchool: {
      fontSize: Taillereference * 0.7,
      color: `${data.miseEnPage.colorTertiaire}`,
      paddingLeft: 8 * 0.75,
    },

    lienProjet: {
      marginLeft: 10 * 0.75,
      textDecoration: "underline",
      color: `${data.miseEnPage.colorPrincipale}`,
      textTransform: "none",
    },


    bottomGrid: {
      display: "flex",
      flexDirection: "row",
      gap: 20 * 0.75,
      width: "100%",
    },

    bottomColLeft: {
      width: data.interets?.display ? "63%" : "100%",
    },

    bottomColRight: {
      width: data.langues?.display ? "37%" : "100%",
    },

    bottomRightH2: {
      backgroundColor: "#E2E6E9",
      color: `${data.miseEnPage.colorSecondaire}`,
      fontSize: Taillereference * 0.88,
      fontWeight: 500,
      paddingVertical: 6 * 0.75,
      paddingHorizontal: 15 * 0.75,
      marginBottom: `${margeReference * 1.2}`,
      textTransform: "none"
    },
  });

  const htmlStylesMain = {
    p: {
      fontSize: `${Taillereference * 0.7}`,
      color: `${data.miseEnPage.colorTertiaire}`,
      margin: 0,
      lineHeight: 1.4,
    },
  };


    function renderSection(el) {
  
      if(el.id==="experiences"){
          return ( <>
                   {/* <!-- EXPÉRIENCES --> */}
                  {data.experiences.display && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionH2}>EXPÉRIENCES PROFESSIONNELLES</Text>
                
                <View style={styles.timeline}>
                  {data.experiences.content.map((el, index) => {
                    const cleanHTMLValue = formatBulletHtml(el.content);
                    return(
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineContent}>
                          <View style={styles.timelineHeader}>
                            <Text style={styles.timelineContentH3}>{el.poste}{el.nomEntreprise ? `, ${el.nomEntreprise}` : ""}</Text>
                            <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                          </View>
                          <View>
                            <Html style={styles.timelineContentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html> 
                          </View>
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
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionH2}>PROJETS</Text>
                
                <View style={styles.timeline}>
                  {data.projets.content.map((el, index) => {
                    const cleanHTMLValue = formatBulletHtml(el.description);
                    return(
                      <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineContent}>
                          <View style={styles.timelineHeader}>
                            <Text style={styles.timelineContentH3}>
                              {el.nomProjet}{el.roleIntoProject ? ` - ${el.roleIntoProject}` : ""}
                              {el.lien && <Link style={styles.lienProjet} href={`${el.lien}`}> {el.texteLien ? el.texteLien : el.lien} </Link>}
                            </Text>
                            <Text style={styles.timelineContentDate}>{el.dateDebut}{el.dateFin ? ` - ${el.dateFin}` : ""}</Text>
                          </View>
                          <View>
                            <Html style={styles.timelineContentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                          </View>
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
        <View style={styles.mainSection}>
              <Text style={styles.mainSectionH2}>FORMATIONS</Text>
              
              <View style={styles.timeline}>
                {data.formations.content.map((el, index) => {
                  return(
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineContent}>
                        <View style={styles.timelineHeader}>
                          <Text style={styles.timelineContentH3}>{el.diplomeObtenu}{el.nomEcole ? `, ${el.nomEcole}` : ""}</Text>
                          <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                        </View>
                        {el.adresse && <Text style={styles.timelineContentSchool}>• {el.adresse}</Text>}
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
                        <View style={styles.timelineContent}>
                          <View style={styles.timelineHeader}>
                              <Text style={styles.timelineContentH3}>{champ.intitule}{champ.organisme ? `, ${champ.organisme}` : ""}</Text>
                            <Text style={styles.timelineContentDate}>{champ?.dateDebut} - {champ?.dateFin}</Text>
                                {champ.plateforme && <Text style={styles.timelineContentSchool}>• {champ.plateforme}</Text>}
                          </View>
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
  
        return(<>
              {data.competences?.display && (
                <View style={styles.mainSection}>
                  <Text style={styles.mainSectionH2}>Compétences</Text>
                  <View style={styles.inlineBox}>
                    <Html stylesheet={htmlStylesMain}>{cleanHTMLValueCompetence}</Html>
                  </View>
                </View>
              )}
        </>)
      }else if(el.id==="langues"){
        
        return(<>
              {(data.langues?.display || data.interets?.display) && (
              <View style={styles.bottomGrid}>
                {data.langues?.display && (
                  <View style={styles.bottomColLeft}>
                    <Text style={styles.mainSectionH2}>LANGUES</Text>
                    <View style={styles.inlineBox}>
                      <Html stylesheet={htmlStylesMain}>{cleanHTMLValueLangue}</Html>
                    </View>
                  </View>
                )}

                {data.interets?.display && (
                  <View style={styles.bottomColRight}>
                    <Text style={styles.bottomRightH2}>Intérêts</Text>
                    <View style={styles.inlineBox}>
                      <Html stylesheet={htmlStylesMain}>{cleanHTMLValueInteret}</Html>
                    </View>
                  </View>
                )}
              </View>
            )}
        </>)
      }else{
  
          const champ= data.champPersoBlocCompetenceLangue.find(champ=>champ.id==el.id)
          if(!champ) return
          
          const cleanHTMLValue = formatInlineHtml(champ.content, "  •  ");
              
  
              return(<>

                <View key={champ.id} style={styles.mainSection}>
                  <Text style={styles.mainSectionH2}>{el.titre}</Text>
                  <View style={styles.inlineBox}>
                    <Html stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                  </View>
                </View>
              
              </>)

      }
  
  
  
  }




  return(
    <Document key={ordreKey} >
      <Page size="A4" style={styles.page}>
        <View style={styles.cvContainer}>

          {/* <!-- EN-TÊTE SUPÉRIEUR --> */}
          <View style={styles.topBanner}>
            <View style={styles.bannerLeft}>
              <Text style={styles.headerH1}>{data.nom}</Text>
              <Text style={styles.headerSubtitle}>{data.poste}</Text>

              <View style={styles.bannerDivider} />

              <View style={styles.contactGrid}>
                {data.phone !== "" && (
                  <View style={styles.blocInformation}>
                    <Svg style={{ width: 14 * 0.75, height: 14 * 0.75 }} viewBox="0 0 24 24">
                      <Path fill="#ffffff" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                    </Svg>
                    <Text style={styles.sidebarSectionP}>{data.phone}</Text>
                  </View>
                )}

                {data.adresse !== "" && (
                  <View style={styles.blocInformation}>
                    <Svg style={{ width: 14 * 0.75, height: 14 * 0.75 }} viewBox="0 0 24 24">
                      <Path fill="#ffffff" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                    </Svg>
                    <Text style={styles.sidebarSectionP}>{data.adresse}</Text>
                  </View>
                )}

                {data.email !== "" && (
                  <View style={styles.blocInformation}>
                    <Svg style={{ width: 14 * 0.75, height: 14 * 0.75 }} viewBox="0 0 20 20">
                      <Path fill="#ffffff" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                    </Svg>
                    <Text style={styles.sidebarSectionP}>{data.email}</Text>
                  </View>
                )}

                {data.champPerso && data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                  if (el.content !== "") {
                      const icone=iconesPdf.find(ic=>ic.nom===el.iconePdf)
                    return (
                      <View style={styles.blocInformation} key={index}>
                        {icone && <View style={{ width: 14 * 0.75 }}>{el.icone.Svg("#ffffff")}</View>}
                        {el.url ? <Link src={el.url} style={styles.sidebarSectionA}>{el.content}</Link> : <Text style={styles.sidebarSectionP}>{el.content}</Text>}
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            </View>

            {data.imgProfil.display && (
              <View style={styles.profileContainer}>
                <View>
                  <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic}/>
                </View>
              </View>
            )}
          </View>

          {/* <!-- CORPS PRINCIPAL AVEC MARGES VERTICALES --> */}
          <View style={styles.mainContent}>

            {data.profil && (
              <Text style={styles.headerSummary}>
                {data.profil}
              </Text>
            )}


            {
                        data.ordreSectionsSecondaires.map(el=>{
                          return renderSection(el)
                        })
                      }

        


                        {
               data.ordreSectionsPrincipales.map(el=>{
                  return renderChamp(el)
                })

            }



          </View>

        </View>
      </Page>
    </Document>
  )
}
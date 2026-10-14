"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Link, Image } from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv";
import Html from 'react-pdf-html';

export default function Cv6Pdf({ data, dataLoaded, slug, status }) {

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
      paddingVertical: 30 * 0.75
    },
    cvContainer: {
      display: "flex",
      flexDirection: 'column',
      position: "relative",
      boxSizing: 'border-box',
      color: `${data.miseEnPage.colorTertiaire}`,
    },
    topBanner: {
      width: "100%",
      minWidth:"100%",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 25 * 0.75,
      borderBottomWidth: 2,
      borderBottomColor: `${data.miseEnPage.colorPrincipale}`,
      marginBottom: 30 * 0.75,
      gap:25*0.75,
      paddingHorizontal:20
    },
    bannerLeft: {
      width:"70%",
      flexDirection: 'row',
      display: "flex",
      alignItems: "center",
      gap: 20 * 0.75,
      flexShrink:0,
    },
    bannerLeftText: {
      display: "flex",
      flexDirection: "column",
      gap: 8 * 0.75,
      wordBreak: 'break-word',
      flexShrink:0,
    },
    bannerLeftTextH1: {
      fontSize: Taillereference * 1.9,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      lineHeight: 1.1,
      letterSpacing: 1 * 0.75,
      textTransform: 'uppercase',
      wordBreak: 'break-word',
      flexShrink:0,
    },
    bannerLeftTextSubtitle: {
      fontSize: Taillereference * 0.95,
      color: `${data.miseEnPage.colorPrincipale}`,
      fontWeight: 500,
      letterSpacing: 1.5 * 0.75,
      textTransform: 'uppercase',
    },
    profileContainer: {
      position: "relative",
      width: `${data.tailleImg * 0.75}`,
      borderRadius: `${data.borderRadiusImg * 0.75}`,
      overflow: "hidden",
      backgroundColor: "#ddd",
      aspectRatio: "1 / 1",
    },
    profilePic: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top",
    },
    contactColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 8 * 0.75,
      flex: 1,
    },
    blocInformation: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8 * 0.75,
    },
    blocInformationText: {
      fontSize: Taillereference * 0.68,
      color: `${data.miseEnPage.colorTertiaire}`,
    },
    blocInformationLink: {
      fontSize: Taillereference * 0.68,
      color: `${data.miseEnPage.colorTertiaire}`,
      textDecoration: 'none',
    },
    mainContent: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: margeReference * 1.8,
      paddingHorizontal:30*0.75,
    },
    summary: {
      fontSize: Taillereference * 0.72,
      color: `${data.miseEnPage.colorTertiaire}`,
      lineHeight: 1.6,
      borderBottomWidth: 1,
      borderBottomColor: `${data.miseEnPage.colorPrincipale}`,
      paddingBottom: 25 * 0.75,
    },
    cvBody: {
      display: "flex",
      flexDirection: 'row',
      gap: 45 * 0.75,
    },
    colLeft: {
      width: "42%",
      display: "flex",
      flexDirection: "column",
      gap: 30 * 0.75,
      borderRightWidth: 1,
      borderRightColor: `${data.miseEnPage.colorPrincipale}`,
      paddingRight: 35 * 0.75,
    },
    colRight: {
      width: "58%",
      display: "flex",
      flexDirection: "column",
      gap: 30 * 0.75,
    },
    sectionBlock: {
      display: "flex",
      flexDirection: "column",
      gap: 15 * 0.75,
    },
    sectionBlockH2: {
      fontSize: Taillereference * 0.95,
      fontWeight: 700,
      letterSpacing: 2 * 0.75,
      color: `${data.miseEnPage.colorSecondaire}`,
      textTransform: 'uppercase',
    },
    itemBlock: {
      display: "flex",
      flexDirection: "column",
      gap: 6 * 0.75,
    },
    itemBlockH3: {
      fontSize: Taillereference * 0.75,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      textTransform: 'uppercase',
    },
    subInfo: {
      fontSize: Taillereference * 0.68,
      color: `${data.miseEnPage.colorTertiaire}`,
      fontWeight: 500,
    },
    contentUl: {
      display: "flex",
      flexDirection: "column",
      gap: 6 * 0.75,
      marginTop: 4 * 0.75,
    },
    sidebarUl: {
      display: "flex",
      flexDirection: "column",
      gap: 10 * 0.75,
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
      lineHeight: 1.5,
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.cvContainer}>

          {/* En-tête supérieur */}
          <View style={styles.topBanner}>
            <View style={styles.bannerLeft}>
              {data.imgProfil.display && (
                <View style={styles.profileContainer}>
                  <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic} />
                </View>
              )}
              <View style={styles.bannerLeftText}>
                <Text style={styles.bannerLeftTextH1}>{data.nom}</Text>
                <Text style={styles.bannerLeftTextSubtitle}>{data.poste}</Text>
              </View>
            </View>

            <View style={styles.contactColumn}>
              {data.email !== "" && (
                <View style={styles.blocInformation}>
                  <Svg style={{ width: 14 * 0.75, color: data.miseEnPage.colorPrincipale }} viewBox="0 0 20 20">
                    <Path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                  </Svg>
                  <Text style={styles.blocInformationText}>{data.email}</Text>
                </View>
              )}

              {data.phone !== "" && (
                <View style={styles.blocInformation}>
                  <Svg style={{ width: 14 * 0.75, color: data.miseEnPage.colorPrincipale }} viewBox="0 0 24 24">
                    <Path fill="currentColor" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                  </Svg>
                  <Text style={styles.blocInformationText}>{data.phone}</Text>
                </View>
              )}

              {data.adresse !== "" && (
                <View style={styles.blocInformation}>
                  <Svg style={{ width: 14 * 0.75, color: data.miseEnPage.colorPrincipale }} viewBox="0 0 24 24">
                    <Path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                  </Svg>
                  <Text style={styles.blocInformationText}>{data.adresse}</Text>
                </View>
              )}

              {data.champPerso && data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                if (el.content !== "") {
                  return (
                    <View style={styles.blocInformation} key={index}>
                      {el.url ? <Link src={el.url} style={styles.blocInformationLink}>{el.content}</Link> : <Text style={styles.blocInformationText}>{el.content}</Text>}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          </View>

          {/* Contenu principal */}
          <View style={styles.mainContent}>

            {data.profil && (
              <Text style={styles.summary}>{data.profil}</Text>
            )}

            <View style={styles.cvBody}>

              {/* Colonne Gauche */}
              <View style={styles.colLeft}>

                {/* Formations */}
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionBlockH2}>Formation</Text>
                  <View style={styles.sidebarUl}>
                    {data.formations.content.map((el, index) => (
                      <View key={index} style={styles.itemBlock}>
                        <Text style={styles.itemBlockH3}>{el.diplomeObtenu}</Text>
                        {el.nomEcole && <Text style={styles.subInfo}>{el.nomEcole}{el.adresse ? `, ${el.adresse}` : ""}</Text>}
                        <Text style={styles.subInfo}>{el.dateDebut} - {el.dateFin}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Compétences */}
                {data.competences?.display && (
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionBlockH2}>Compétences</Text>
                    <Html style={styles.sidebarUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueCompetence}</Html>
                  </View>
                )}

                {/* Langues */}
                {data.langues?.display && (
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionBlockH2}>Langues</Text>
                    <Html style={styles.sidebarUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueLangue}</Html>
                  </View>
                )}

                {/* Intérêts */}
                {data.interets?.display && (
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionBlockH2}>Intérêts</Text>
                    <Html style={styles.sidebarUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValueInteret}</Html>
                  </View>
                )}

                {/* Blocs Personnalisés */}
                {data.champPersoBlocCompetenceLangue && data.champPersoBlocCompetenceLangue.length !== 0 && data.champPersoBlocCompetenceLangue.map((el, index) => {
                  const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                  const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                  const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                  return (
                    <View key={index} style={styles.sectionBlock}>
                      <Text style={styles.sectionBlockH2}>{el.titre}</Text>
                      <Html style={styles.sidebarUl} stylesheet={htmlStylesSidebar}>{cleanHTMLValue}</Html>
                    </View>
                  );
                })}

              </View>

              {/* Colonne Droite */}
              <View style={styles.colRight}>

                {/* Expériences */}
                {data.experiences?.display && (
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionBlockH2}>Expérience</Text>
                    <View style={styles.sidebarUl}>
                      {data.experiences.content.map((el, index) => {
                        const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                        const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                        const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                        return (
                          <View key={index} style={styles.itemBlock}>
                            <Text style={styles.itemBlockH3}>{el.poste}</Text>
                            <Text style={styles.subInfo}>{el.nomEntreprise}{el.adresse ? `, ${el.adresse}` : ""} | {el.dateDebut} - {el.dateFin}</Text>
                            <Html style={styles.contentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* Projets */}
                {data.projets?.display && (
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionBlockH2}>Projets</Text>
                    <View style={styles.sidebarUl}>
                      {data.projets.content.map((el, index) => {
                        const valeurWithoutUl = String(el.description).replace("<ul>", " ").replace("</ul>", " ");
                        const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                        const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                        return (
                          <View key={index} style={styles.itemBlock}>
                            <Text style={styles.itemBlockH3}>
                              {el.nomProjet}
                              {"  "}
                              {el.lien && <Link style={styles.lienProjet} src={el.lien}>{el.texteLien ? el.texteLien : el.lien}</Link>}
                            </Text>
                            <Text style={styles.subInfo}>{el.roleIntoProject} | {el.dateDebut} - {el.dateFin}</Text>
                            <Html style={styles.contentUl} stylesheet={htmlStylesMain}>{cleanHTMLValue}</Html>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}

              </View>

            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
}
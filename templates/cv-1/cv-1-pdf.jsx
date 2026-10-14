"use client"
import { useEffect, useRef } from "react";
import React from 'react';
import { Page, Text, View, Document, StyleSheet,Svg,Path, Link, Image} from '@react-pdf/renderer';
import { handleRemplaceBalise } from "../../lib/handleRemplaceBalise";
import { templates } from "@/lib/detail-templates";
import RegisterCvAction from "@/actions/RegisterCv"
import Html from 'react-pdf-html';




export default function Cv1Pdf({data,dataLoaded,slug,status,}){
 

  const template=templates.find(el=>el.slug===slug)
  const dataRef = useRef(null);  


  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
  dataRef.current=data
}, [data,status]);



useEffect(() => {
  return () => {
    if(!dataLoaded) return

    if(status === "authenticated" && dataRef.current){
      RegisterCvAction(template, dataRef.current);
    }
}
  
}, [dataLoaded,status]);


let Taillereference=  (data.miseEnPage.taille+5.5)*0.75
let margeReference=data.miseEnPage.margeReference*0.75


  const valeurWithoutUlCompetence=String(data.competences.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPCompetence=handleRemplaceBalise(valeurWithoutUlCompetence,'li','p')
    const cleanHTMLValueCompetence = valueReplacedByPCompetence.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlLangue=String(data.langues.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPLangue=handleRemplaceBalise(valeurWithoutUlLangue,'li','p')
    const cleanHTMLValueLangue = valueReplacedByPLangue.replace(/&nbsp;/g, ' ');

    const valeurWithoutUlInteret=String(data.interets.content).replace("<ul>"," ").replace("</ul>"," ")
    const valueReplacedByPInteret=handleRemplaceBalise(valeurWithoutUlInteret,'li','p')
    const cleanHTMLValueInteret = valueReplacedByPInteret.replace(/&nbsp;/g, ' ');

    const sectionSidebarParentRef=useRef(null)



       useEffect(()=>{
    
         if(sectionSidebarParentRef.current){
                const allSections=sectionSidebarParentRef.current.querySelectorAll("section")
                for(let i=0;i<allSections.length;i++){
                    if(allSections[i+1]){
                        const divider=allSections[i].querySelector(".divider")
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
            
        },[,data])




const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    position:"relative",
    fontFamily: `${data.miseEnPage.family ? data.miseEnPage.family : "Helvetica" }`, 
    boxSizing: 'border-box',
    padding:10*0.75
  },

  /* Conteneur principal au format A4 */
  cvContainer:{
    display:"flex",
    flexDirection: 'row',
    position: "relative",
    boxSizing: 'border-box',
  },


  /* ==========================================================================
   COLONNE GAUCHE (Bleu)
   ========================================================================== */

  sidebar:{
    width: "35%",
    minWidth:"35%",
    minHeight:"100%",
    backgroundColor: `${data.miseEnPage.colorPrincipale}`,
    borderTopRightRadius:`${data.imgProfil.display ? 160 *0.75 : 0}`,
    borderTopLeftRadius:`${data.imgProfil.display ? 160 * 0.75 : 0}`,
    position:"relative",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap:`${margeReference * 1.09}`,
    paddingVertical:20*0.75,
    paddingLeft: 40-Taillereference,
    paddingRight: 40-Taillereference ,
  },


  profileContainer:{
    marginBottom:10*0.75,
    position: "relative",
    width: `${data.tailleImg * 0.75}`,
    borderRadius: `${data.borderRadiusImg *0.75}`,
    borderWidth: 5*0.75,
    borderColor:"#ffffff",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    backgroundColor: "#ddd",
  },

  profilePic:{
    width: "100%",
    height: "100%",
    borderRadius: `${data.borderRadiusImg*0.75}`,
    objectFit: "cover",
    objectPosition:"top",
  },


  sidebarSection:{
    width: "100%",
  },


  sidebarSectionH2:{
    fontSize: Taillereference * 1.1 * 0.95,
    letterSpacing: 2*0.75,
    fontWeight: 500,
    marginBottom: 10*0.75,
    color:"white"
  },

  sidebarSectionUl:{
    // display:"flex",
    flexDirection:"column",
    alignContent:"center",
    alignItems:"center",
    gap: `${margeReference *0.6}`
}, 


  blocInformation:{
    flexDirection:"row",
    alignItems:"center",
    gap:5*0.75,
  },

  sidebarSectionDivider:{
    width: "60%",
    height: 2*0.75,
    backgroundColor: "#ffffff",
    marginTop:15*0.75,
    marginHorizontal:"auto",
    marginBottom:15*0.75
  },


  sidebarSectionP:{
    fontSize: Taillereference * 0.7,
  },



  sidebarSectionA:{
  textDecoration: 'none',
  color:"#ffffff",
  fontSize: Taillereference * 0.7,
  },






  /* ==========================================================================
   COLONNE DROITE (Blanche)
   ========================================================================== */


  mainContent:{
    minWidth: "65%",
    width:"65%",
    paddingLeft: 40-Taillereference,
    paddingRight: 40-Taillereference ,
    paddingTop:40*0.75,
    paddingBottom:25*0.75,
    position:"relative",
    display:"flex",
    flexDirection:"column",
    gap:`${margeReference * 2.09}`
  },

  header:{
    display: "flex",
    flexDirection:"column",
    gap:`${margeReference * 1.09}`
  },

  headerH1:{
      fontSize: Taillereference * 2,
      fontWeight: 700,
      color: `${data.miseEnPage.colorSecondaire}`,
      lineHeight: 1.1*0.75,
  },

  headerSubtitle:{
    fontSize: Taillereference * 1.1,
    letterSpacing: 1*0.75,
    color: `${data.miseEnPage.colorSecondaire}`,
  },

  headerSummary:{
    fontSize: Taillereference * 0.7,
    color: `${data.miseEnPage.colorTertiaire}`,
    textAlign: "justify",
  },

  mainSectionH2:{
    fontSize: Taillereference * 1.1,
    fontWeight: 600,
    color: `${data.miseEnPage.colorSecondaire}`,
    marginBottom: `${margeReference * 1.80}`,
  },

  timeline:{
    position: "relative",
    borderLeft: `2px solid ${data.miseEnPage.colorPrincipale}`,
    paddingLeft: 20*0.75,
    display: "flex",
    flexDirection:"column",
    gap:`${margeReference * 1.7}`
  },


timelineDot:{
    position: "absolute",
    left: -26*0.75,
    top: 4*0.75,
    width: 10*0.75,
    height: 10*0.75,
    borderRadius: 50,
    backgroundColor: `${data.miseEnPage.colorPrincipale}`,
},


timelineContentH3:{
    fontSize: Taillereference *0.78,
    fontWeight: 600,
    color: `${data.miseEnPage.colorSecondaire}`,
},


timelineContentDate:{
    fontSize: Taillereference * 0.6,
    fontWeight: 500,
    color: `${data.miseEnPage.colorPrincipale}`,
    marginTop: 3*0.75,
    marginBottom: 10*0.75,
},


timelineContentSchool:{
    fontSize: Taillereference * 0.7,
    color: `${data.miseEnPage.colorTertiaire}`,
},


timelineItem:{
  position:"relative"
},


timelineContentUl:{
  display: "flex",
  flexDirection:"column",
  gap:`${margeReference * 0.8}`,
},


timelineContentLi:{
  fontSize: Taillereference * 0.7,
  color: `${data.miseEnPage.colorTertiaire}`,
},


lienProjet:{
    marginLeft:15*0.75,
    textDecoration:"underline",
    color:`${data.miseEnPage.colorPrincipale}`
}


})

const htmlStylesSidebar={

   p:{
    fontSize: Taillereference * 0.7,
    margin:0,
  },

}

const htmlStylesMain={
    p:{
     fontSize: `${Taillereference * 0.7}`,
    color: `${data.miseEnPage.colorTertiaire}`,
    margin:0,
  },

}


  
 





  return(
   <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.cvContainer}>
          
     {/* <!-- COLONNE GAUCHE (Sidebar) --> */}
      <View style={styles.sidebar}>

          {/* Photo de profil (Fixe, toujours en haut, sans séparateur en dessous) */}
          {  data.imgProfil.display && 
              <View style={styles.profileContainer}>
                  <View>
                      <Image src={data.imgProfil.srcDb || data.imgProfil.srcPreview || "/Images/avatar.jpg"} style={styles.profilePic}/>
                  </View>
              </View>
          }


          {/* Logique dynamique pour les sections et diviseurs */}
          {(() => {
              const activeSections = [];

              // 1. BLOC INFORMATIONS
              const hasInfoDetails = data.phone !== "" || data.email !== "" || data.adresse !== "" || (data.champPerso && data.champPerso.length > 0);
              if (hasInfoDetails) {
                  activeSections.push(
                      <View key="informations" style={styles.sidebarSection}>
                          <Text style={styles.sidebarSectionH2}>INFORMATIONS</Text>
                          <View style={styles.sidebarSectionUl}>
                              {data.phone !== "" && (
                                  <View style={styles.blocInformation}>
                                      <Svg style={{ width: 16*0.75 }} viewBox="0 0 24 24">
                                          <Path fill="#ffffff" d="M5 9.86a18.47 18.47 0 0 0 9.566 9.292l.68.303a3.5 3.5 0 0 0 4.33-1.247l.889-1.324a1 1 0 0 0-.203-1.335l-3.012-2.43a1 1 0 0 0-1.431.183l-.932 1.257a12.14 12.14 0 0 1-5.51-5.511l1.256-.932a1 1 0 0 0 .183-1.431l-2.43-3.012a1 1 0 0 0-1.335-.203l-1.333.894a3.5 3.5 0 0 0-1.237 4.355z" />
                                      </Svg>
                                      <Text  style={styles.sidebarSectionP}>{data.phone}</Text>
                                  </View>
                              )}

                              {data.email !== "" && (
                                  <View style={styles.blocInformation}>
                                      <Svg style={{ width: 16*0.75 }} viewBox="0 0 20 20">
                                          <Path fill="#ffffff" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z" />
                                      </Svg>
                                      <Text style={styles.sidebarSectionP}>{data.email}</Text>
                                  </View>
                              )}

                              {data.adresse !== "" && (
                                  <View style={styles.blocInformation}>
                                      <Svg style={{ width: 16*0.75 }} viewBox="0 0 24 24">
                                          <Path fill="#ffffff" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4" />
                                      </Svg>
                                      <Text style={styles.sidebarSectionP}>{data.adresse}</Text>
                                  </View>
                              )}

                              {data.champPerso && data.champPerso.length !== 0 && data.champPerso.map((el, index) => {
                                  if (el.content !== "") {
                                      return (
                                          <View style={styles.blocInformation} key={index}>
                                              {el.iconePdf && <View style={{ width: 16*0.75 }}>{el.iconePdf("#ffffff")}</View>}
                                              {el.url ? <Link src={el.url} style={styles.sidebarSectionA}>{el.content}</Link> : <Text style={styles.sidebarSectionP}>{el.content}</Text>}
                                          </View>
                                      );
                                  }
                                  return null;
                              })}
                          </View>
                      </View>
                  );
              }

              // 2. BLOC COMPÉTENCES
              if (data.competences?.display) {
                  activeSections.push(
                      <View key="competences" style={styles.sidebarSection}>
                          <Text style={styles.sidebarSectionH2}>COMPÉTENCES</Text>
                          <View >
                              <Html style={styles.sidebarSectionUl}  stylesheet={htmlStylesSidebar}>{cleanHTMLValueCompetence}</Html>
                          </View>
                      </View>
                  );
              }

              // 3. BLOC LANGUES
              if (data.langues?.display) {
                  activeSections.push(
                      <View key="langues" style={styles.sidebarSection}>
                          <Text style={styles.sidebarSectionH2}>LANGUES</Text>
                          <View >
                              <Html style={styles.sidebarSectionUl}   stylesheet={htmlStylesSidebar}>{cleanHTMLValueLangue}</Html>
                          </View>
                      </View>
                  );
              }

              // 4. BLOC INTÉRÊTS
              if (data.interets?.display) {
                  activeSections.push(
                      <View key="interets" style={styles.sidebarSection}>
                          <Text style={styles.sidebarSectionH2}>INTÉRÊTS</Text>
                          <View >
                              <Html style={styles.sidebarSectionUl}  stylesheet={htmlStylesSidebar}>{cleanHTMLValueInteret}</Html>
                          </View>
                      </View>
                  );
              }

              // 5. BLOCS COMPÉTENES/LANGUES SUPPLÉMENTAIRES (DYNAMIQUES)
              if (data.champPersoBlocCompetenceLangue && data.champPersoBlocCompetenceLangue.length !== 0) {
                  data.champPersoBlocCompetenceLangue.forEach((el, index) => {
                      const valeurWithoutUl = String(el.content).replace("<ul>", " ").replace("</ul>", " ");
                      const valueReplacedByP = handleRemplaceBalise(valeurWithoutUl, 'li', 'p');
                      const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');

                      activeSections.push(
                          <View key={`custom-${index}`} style={styles.sidebarSection}>
                              <Text style={styles.sidebarSectionH2}>{el.titre}</Text>
                              <View >
                                  <Html style={styles.sidebarSectionUl}   stylesheet={htmlStylesSidebar}>{cleanHTMLValue}</Html>
                              </View>
                          </View>
                      );
                  });
              }

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


              {/* <!-- EXPÉRIENCES --> */}

                    {data.experiences.display && 
                          <View style={styles.mainSection}>
                              <Text style={styles.mainSectionH2}>EXPÉRIENCES PROFESSIONNELLES</Text>
                              
                              <View style={styles.timeline}>
              
                                  {
                                      data.experiences.content.map((el,index)=>{
                                          const valeurWithoutUl=String(el.content).replace("<ul>"," ").replace("</ul>"," ")
                                          const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                                          const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                          return(
                                              <View key={index} style={styles.timelineItem}>
                                                  <View style={styles.timelineDot}></View>
                                                  <View style={styles.timelineContent}>
                                                      <Text style={styles.timelineContentH3}>{el.poste} - {el.nomEntreprise}</Text>
                                                      <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                                                      <View >
                                                        <Html style={styles.timelineContentUl}  stylesheet={htmlStylesMain} >{cleanHTMLValue}</Html> 
                                                      </View>
                                                  </View>
                                              </View>
                                          )
                                      })
                                  }
                              </View>
                          </View>
                          }



          {/* <!-- PROJETS --> */}
                    {data.projets.display && 
                    <View style={styles.mainSection}>
                        <Text style={styles.mainSectionH2}>PROJETS</Text>
                        
                        <View style={styles.timeline}>
        
                            {
                                data.projets.content.map((el,index)=>{
                                    const valeurWithoutUl=String(el.description).replace("<ul>"," ").replace("</ul>"," ")
                                    const valueReplacedByP=handleRemplaceBalise(valeurWithoutUl,'li','p')
                                    const cleanHTMLValue = valueReplacedByP.replace(/&nbsp;/g, ' ');
                                    return(
                                        <View key={index} style={styles.timelineItem}>
                                            <View style={styles.timelineDot}></View>
                                            <View style={styles.timelineContent}>
                                                <Text style={styles.timelineContentH3}>{el.nomProjet} - {el.roleIntoProject} { el.lien && <Link style={styles.lienProjet} href={`${el.lien}`} > {el.texteLien ? el.texteLien : el.lien} </Link> }</Text>
                                                <Text style={styles.timelineContentDate}>{el.dateDebut} - {el.dateFin}</Text>
                                                <View >
                                                  <Html style={styles.timelineContentUl}  stylesheet={htmlStylesMain} >{cleanHTMLValue}</Html>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    }



     


                        {/* <!-- FORMATIONS --> */}
                  <View style={styles.mainSection}>
                      <Text style={styles.mainSectionH2}>FORMATIONS</Text>
                      
                      <View style={styles.timeline}>
                          
                          {
                              data.formations.content.map((el,index)=>{
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
                              })
                          }

                      </View>
                  </View>


          </View>
          
    

        </View>
      </Page>
    </Document>
    
  )
}



"use client"
import {  useState,useEffect } from "react";
import { templates } from "@/lib/detail-templates";
import { useSession } from "next-auth/react";
// import RecupererCvsAction from "@/actions/RecupererCvs";


export default function useDonneesCv(slug){
  
  const { data: session,status } = useSession()
  const cv=templates.find(el=>el.slug===slug)
  const [dataLoaded, setDataLoaded] = useState(false);

  function creerDataInitiale(cv) {
    return {
    nom:"VALLON Patricia",
    poste:"COMMUNITY MANAGER",
    profil:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit Voluptatum et, non blanditiis nisi beatae rem eum deleniti minima! Harum impedit nostrum laborum illum in. Velit sed obcaecati nobis illo atque!",
    email:"patriciazallon@gmail.com",
    phone:"+225 0554706471",
    adresse:"Abidjan,côte d'ivoire",
    imgProfil:{
      display:true,
      srcPreview:"",
      srcDb:""
    },
    tailleImg:cv?.tailleImg,
    borderRadiusImg:cv?.borderRadiusImg,
    competences:{
      display:true,
      content: `
          <ul> 
                    <li>Gestion de projet</li>
                    <li>Gestion d'équipe</li>
                    <li>Stratégie de communication</li>
                    <li>Relations publiques et médias</li>
                    <li>Rédaction et édition de contenu</li>
                    <li>Communication digitale</li>
                    <li>Conception graphique basique</li>
                    <li>Maîtrise des outils bureautiques</li>
            </ul>
                    
                    `
    },
      langues:{
      display:true,
      content: `
          <ul> 
                    <li>Français (langue maternelle)</li>
                    <li>Anglais (courant)</li>
                    <li>Espagnol (notions)</li>
            </ul>
                    
                    `
    },
      interets:{
      display:true,
      content: `
          <ul> 
                    <li>Lecture</li>
                    <li>Cinéma</li>
                    <li>Randonnée</li>
                    <li>Bénévolat associatif</li>
            </ul>
                    
                    `
    },
    formations:{
      content:[
        {
        seeInstance: true,
        id: String(Date.now()),
        nomEcole: "INPHB",
        adresse: "Yamoussoukro, Côte d'Ivoire",
        dateDebut: "JANVIER 2013",
        dateFin: "MARS 2015",
        diplomeObtenu: "Master en Communication d'Entreprise"
    },

    {
        seeInstance: true,
        id: String(Date.now() + 20),
        nomEcole: "Université Félix Houphouët-Boigny",
        adresse: "Cocody, Abidjan, Côte d'Ivoire",
        dateDebut: "OCTOBRE 2015",
        dateFin: "JUILLET 2018",
        diplomeObtenu: "Licence en Sciences de l'Information et de la Communication"
    },

    {
        seeInstance: true,
        id: String(Date.now() + 40),
        nomEcole: "Institut Supérieur de Management",
        adresse: "Marcory, Abidjan, Côte d'Ivoire",
        dateDebut: "FÉVRIER 2019",
        dateFin: "NOVEMBRE 2020",
        diplomeObtenu: "Certificat en Marketing Digital"
    },
      ]
    },

    experiences:{
      display:true,
      content:[
        {
          seeInstance:true,id:String(Date.now()),nomEntreprise:"Agence Tempo",poste:"Chargé de Communication",dateDebut:"JANVIER 2018",dateFin:"ACTUEL",content:`
             <ul> 
                    <li>Élaboration et mise en œuvre de stratégies de communication</li>
                    <li>Gestion des relations médias, rédaction de communiqués de presse, et organisation d'événements</li>
                    <li>Création de contenu pour les médias sociaux, les newsletters et le site web de l'entreprise</li>
            </ul>

        `},
      {seeInstance:true,id:String(Date.now()+10),nomEntreprise:"Tempo",poste:"Assistant Chargé de Communication",dateDebut:"JUIN 2015",dateFin:"DÉCEMBRE 2017",content:`
             <ul> 
                    <li>Soutien à la création de campagnes de communication</li>
                    <li>Participation à la coordination d'événements et à la planification de campagnes promotionnelles</li>
                    <li>Gestion de la base de données des contacts médias</li>
            </ul>

        `},
              {
          seeInstance: true,
          id: String(Date.now()+20),
          nomEntreprise: "Nova Marketing",
          poste: "Assistant Marketing",
          dateDebut: "MARS 2021",
          dateFin: "DÉCEMBRE 2023",
          content: `
              <ul>
                  <li>Réalisation d'études sur les habitudes et besoins des consommateurs.</li>
                  <li>Collecte et analyse de données issues de questionnaires et d'entretiens.</li>
                  <li>Identification des tendances et des opportunités du marché.</li>
                  <li>Analyse des offres et stratégies des principaux concurrents.</li>
                  <li>Présentation des résultats et formulation de recommandations.</li>
              </ul>
          `
      }
      ]
      },
    projets:{
      display:true,
      content:[
        {id:String(Date.now()),seeInstance:true,nomProjet:"GestioPro", roleIntoProject:"Développeur Full-Stack",lien:"https://gestiopro.example.com",texteLien:"Voir le projet",dateDebut:"Janvier 2025",dateFin:"Mars 2025",description:`
           <ul>
                <li>Conception et développement d’une plateforme de gestion commerciale.</li>
                <li>Gestion des clients, produits, stocks et ventes.</li>
                <li>Mise en place d’un système d’authentification des utilisateurs.</li>
                <li>Création d’une interface d’administration responsive.</li>
                <li>Conception et intégration de la base de données.</li>
            </ul>
          `},

        {id:String(Date.now()+10),seeInstance:true,nomProjet:"Campagne de sensibilisation environnementale", roleIntoProject:"Chargé de communication",lien:"https://ecoplan.example.com",texteLien:"Voir le projet",dateDebut:"Février 2024",dateFin:"Mai 2024",description:`
              <ul>
                <li>Conception d'une campagne de sensibilisation au recyclage et à la réduction des déchets.</li>
                <li>Création de contenus destinés aux réseaux sociaux et aux supports imprimés.</li>
                <li>Organisation d'activités de sensibilisation auprès des communautés locales.</li>
                <li>Coordination avec les différents partenaires du projet.</li>
                <li>Suivi des résultats et analyse de l'impact de la campagne.</li>
            </ul>
          `},

        {id:String(Date.now()+20),seeInstance:true,nomProjet:"Étude de marché pour une nouvelle enseigne", roleIntoProject:"Assistant marketing",lien:"",texteLien:"",dateDebut:"Février 2025",dateFin:"ACTUEL",description:`
           <ul>
            <li>Réalisation d'une étude sur les habitudes et besoins des consommateurs.</li>
            <li>Collecte et analyse de données issues de questionnaires et d'entretiens.</li>
            <li>Identification des tendances et des opportunités du marché.</li>
            <li>Analyse des offres et stratégies des principaux concurrents.</li>
            <li>Présentation des résultats et formulation de recommandations.</li>
        </ul>
          `},


      ]
    },
    
    champPerso:[],
    champPersoBlocCompetenceLangue:[],
    miseEnPage:{
      taille:14,
      margeReference:15,
      family:"Helvetica",
      colorPrincipale:cv?.colorPrincipale,
      colorSecondaire:cv?.colorSecondaire,
      colorTertiaire:cv?.colorTertiaire,
    },

  }
  }

  const [data,setData]=useState(()=>creerDataInitiale(cv))

 useEffect(() => {

    if (status !== "authenticated") {
      return;
    }

    if (!cv) {
      return;
    }

    async function recuperation() {

      // const allCvs = await RecupererCvsAction();
      const reponse=await fetch("/api/recuperation-cvs")
      const res=await reponse.json()
      if(!reponse.ok)return

      const cvTrouve = res.data?.find(
        (el) => el.genre === cv.genre
      );

      if (cvTrouve) {
        setData(cvTrouve.content);
        setDataLoaded(true)
      }else{
        setData(()=>creerDataInitiale(cv));
        setDataLoaded(true)
      }
      
    }

    recuperation();

  }, [status, cv]);


 

  
  

  return {data,setData,dataLoaded}
  
}
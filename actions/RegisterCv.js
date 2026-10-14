"use server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import DOMPurify from 'isomorphic-dompurify'

 function cleanChampsWithoutBalise(rawHtml) {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [], // Autorise uniquement le formatage de base
    ALLOWED_ATTR: [], // Bloque tous les attributs (comme 'onerror', 'onload', 'href' suspects)
    KEEP_CONTENT: true
  }).trim();
}

function cleanChampsWithBalise(rawHtml) {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [ 'ul', 'li','a'], 
    ALLOWED_ATTR: [], 
    KEEP_CONTENT: true // Supprime la balise ET son contenu si elle est interdite (ex: <script>)
  }).trim();
}


function CleanContent(Data){

  const content={
        nom:cleanChampsWithoutBalise(Data.nom),
        poste:cleanChampsWithoutBalise(Data.poste),
        profil:cleanChampsWithoutBalise(Data.profil),
        email:cleanChampsWithoutBalise(Data.email),
        phone:String(cleanChampsWithoutBalise(Data.phone)),
        adresse:cleanChampsWithoutBalise(Data.adresse),
        imgProfil:{
          display:Data.imgProfil.display,
          srcPreview:cleanChampsWithoutBalise(Data.imgProfil.srcPreview),
          srcDb:cleanChampsWithoutBalise(Data.imgProfil.srcDb)
        },
        tailleImg:Data.tailleImg,
        borderRadiusImg:Data.borderRadiusImg,
        competences:{
          display:Data.competences.display,
          content:cleanChampsWithBalise(Data.competences.content)
        },
        langues:{
          display:Data.langues.display,
          content:cleanChampsWithBalise(Data.langues.content)
        },
        interets:{
          display:Data.interets.display,
          content:cleanChampsWithBalise(Data.interets.content)
        },
        formations:{
          content:[]
        },
        experiences:{
          display:Data.experiences.display,
          content:[]
        },
        projets:{
          display:Data.projets.display,
          content:[]
        },


        newsSections:[],

        ordreSectionsPrincipales: Data.ordreSectionsPrincipales,

        ordreSectionsSecondaires: Data.ordreSectionsSecondaires,


        champPerso:[],
        champPersoBlocCompetenceLangue:[],
        miseEnPage:{
          taille:Data.miseEnPage.taille,
          margeReference:Data.miseEnPage.margeReference,
          family:cleanChampsWithoutBalise(Data.miseEnPage.family),
          colorPrincipale:cleanChampsWithoutBalise(Data.miseEnPage.colorPrincipale),
          colorSecondaire:cleanChampsWithoutBalise(Data.miseEnPage.colorSecondaire),
          colorTertiaire:cleanChampsWithoutBalise(Data.miseEnPage.colorTertiaire),

        }
      }

      if(Data.formations.content.length>0){
        for(let i=0;i<Data.formations.content.length;i++){
          const element={
            seeInstance:Data.formations.content[i].seeInstance,
            id:Data.formations.content[i].id,
            nomEcole:cleanChampsWithoutBalise(Data.formations.content[i].nomEcole),
            adresse:cleanChampsWithoutBalise(Data.formations.content[i].adresse),
            dateDebut:cleanChampsWithoutBalise(Data.formations.content[i].dateDebut),
            dateFin:cleanChampsWithoutBalise(Data.formations.content[i].dateFin),
            diplomeObtenu:cleanChampsWithoutBalise(Data.formations.content[i].diplomeObtenu),
            
          }
          content.formations.content.push(element)
        }
      }

      if(Data.newsSections.length>0){
        for(let i=0;i<Data.newsSections.length;i++){
            const seeInstance=Data.newsSections[i].seeInstance;
            const id=Data.newsSections[i].id;
            const nom=cleanChampsWithoutBalise(Data.newsSections[i].nom);
            const champs=[]
            for(let j=0;j<Data.newsSections[i].champs.length;j++){
              champs.push({
                id:Data.newsSections[i].champs[j].id,
                seeInstance:Data.newsSections[i].champs[j].seeInstance,
                organisme:cleanChampsWithoutBalise(Data.newsSections[i].champs[j].organisme),
                plateforme:cleanChampsWithoutBalise(Data.newsSections[i].champs[j].plateforme),
                intitule:cleanChampsWithoutBalise(Data.newsSections[i].champs[j].intitule),
                dateDebut:cleanChampsWithoutBalise(Data.newsSections[i].champs[j].dateDebut),
                dateFin:cleanChampsWithoutBalise(Data.newsSections[i].champs[j].dateFin),
              })
            }

            const element={
              seeInstance:seeInstance,
              id:id,
              nom:nom,
              champs:champs
            }
  
          content.newsSections.push(element)
        }
      }




      if(Data.experiences.content.length>0){
        for(let i=0;i<Data.experiences.content.length;i++){
          const element={
            seeInstance:Data.experiences.content[i].seeInstance,
            id:Data.experiences.content[i].id,
            nomEntreprise:cleanChampsWithoutBalise(Data.experiences.content[i].nomEntreprise),
            poste:cleanChampsWithoutBalise(Data.experiences.content[i].poste),
            dateDebut:cleanChampsWithoutBalise(Data.experiences.content[i].dateDebut),
            dateFin:cleanChampsWithoutBalise(Data.experiences.content[i].dateFin),
            content:cleanChampsWithBalise(Data.experiences.content[i].content)
          }
          content.experiences.content.push(element)
        }
      }

      if(Data.projets.content.length>0){
        for(let i=0;i<Data.projets.content.length;i++){
          const element={
            seeInstance:Data.projets.content[i].seeInstance,
            id:Data.projets.content[i].id,
            nomProjet:cleanChampsWithoutBalise(Data.projets.content[i].nomProjet),
            roleIntoProject:cleanChampsWithoutBalise(Data.projets.content[i].roleIntoProject),
            lien:cleanChampsWithoutBalise(Data.projets.content[i].lien),
            texteLien:cleanChampsWithoutBalise(Data.projets.content[i].texteLien),
            dateDebut:cleanChampsWithoutBalise(Data.projets.content[i].dateDebut),
            dateFin:cleanChampsWithoutBalise(Data.projets.content[i].dateFin),
            description:cleanChampsWithBalise(Data.projets.content[i].description)
          }
          content.projets.content.push(element)
        }
      }

      if(Data.champPerso.length>0){
        for(let i=0;i<Data.champPerso.length;i++){
          const element={
            id:Data.champPerso[i].id,
            iconeWeb:Data.champPerso[i].iconeWeb,
            iconePdf:Data.champPerso[i].iconePdf,
            content:cleanChampsWithoutBalise(Data.champPerso[i].content),
            url:cleanChampsWithoutBalise(Data.champPerso[i].url),
          }
          content.champPerso.push(element)
        }
      }

      if(Data.champPersoBlocCompetenceLangue.length>0){
        for(let i=0;i<Data.champPersoBlocCompetenceLangue.length;i++){
          const element={
            id:Data.champPersoBlocCompetenceLangue[i].id,
            display:Data.champPersoBlocCompetenceLangue[i].display,
            titre:cleanChampsWithoutBalise(Data.champPersoBlocCompetenceLangue[i].titre),
            content:cleanChampsWithBalise(Data.champPersoBlocCompetenceLangue[i].content),
          }
          content.champPersoBlocCompetenceLangue.push(element)
        }
      }


      return content


}

export default async function RegisterCvAction(template,Data){

  const session = await auth()

  if(!session) return console.error("❌ authentifiez vous ")


  try{

    if(!template && !Data) return
    
    const content=CleanContent(Data)

      const tmp=await prisma.CV.findFirst({
        where:{
          userId:session.user.id,
          nom:template.nom
        }
      })

      if(tmp){

          await prisma.CV.update({
            where:{
              id: tmp.id
            },
            data: {
              content: content,
            },
          })

          return
      }

      await prisma.CV.create({
      data:{
        userId:session.user.id,
        nom:template.nom,
        typeId:template.idType,
        genre:template.genre,
        slug:template.slug,
        content: content
      }
    })

  



  }catch(error){
   console.error("ERREUR PUPPETEER :", error);

}
}




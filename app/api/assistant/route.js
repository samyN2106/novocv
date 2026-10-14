import { groq } from '@ai-sdk/groq';
import {
  convertToModelMessages,
  streamText,
} from 'ai';
import { z } from 'zod';

// const groq = new groq({ apiKey: process.env.GROQ_API_KEY });

export const maxDuration = 30;
export async function POST(req){

  try{
    const { messages } = await req.json();

    const result = await streamText({
      model: groq('openai/gpt-oss-20b'),
      system: `Tu es l'assistant de l'éditeur de CV. Après avoir discuté avec l'utilisateur et validé un contenu, tu dois impérativement appeler l'outil 'remplirChampEditeur' pour injecter automatiquement les données dans son formulaire. Remplis les champs un par un dès qu'ils sont prêts.`,
      messages: await convertToModelMessages(messages), // Pas besoin de 'await' ici

       tools: {
            remplirChampEditeur: {
              description: "Injecte automatiquement un texte généré dans le formulaire de l'utilisateur.",
              parameters: z.object({
                cle: z.enum(['nom', 'poste', 'profil', 'competences', 'langues', 'interets']),
                valeur: z.string().describe("Le texte ou les puces générées à insérer"),
              }),
              // Pas de fonction 'execute' ici ! Elle sera gérée par le client (frontend).
            }
       }
    });

    // 2. Retourne le flux de données standard compatible avec le frontend
    return result.toUIMessageStreamResponse();


  }catch(err){
      console.error("Erreur API Groq :", err);
    return Response.json(
      { 
        error: "Erreur d'interaction avec l'assistant.", 
        details: err instanceof Error ? err.message : String(err) 
      },
      { status: 500 }
    );
  }

}
"use client";

import { useEffect, useState } from "react";
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useTransfereDonnees } from "@/context/transfere-donnees-context";


export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  // const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  
    const {data,setData}= useTransfereDonnees()
  

    const { messages, sendMessage,error, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/assistant',
        maxSteps: 5, // Permet à l'IA d'enchaîner plusieurs appels d'outils si besoin
    tools: {
      remplirChampEditeur: {
        execute: async ({ cle, valeur }) => {
          // 🚀 C'est ici que la magie opère ! On met à jour ton contexte
          setData((prevData) => ({
            ...prevData,
            [cle]: valeur // Remplace dynamiquement 'profil', 'poste', etc.
          }));
          
          // On renvoie un message à l'IA pour lui confirmer que le champ a changé
          return `Le champ ${cle} a été mis à jour avec succès dans l'interface !`;
        },
      },
    },
    }),

  });

  const [input, setInput] = useState('');
  useEffect(()=>{
    console.log("err:",error);
    console.log("messages:",messages
    );
    
    
  },[error,messages])
  

  return (
    <>
      {/* Bouton d'ouverture du chat */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        aria-expanded={isOpen}
        className="fixed bottom-4 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
            aria-hidden="true"
          >
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
          </svg>
        )}
      </button>

      {/* Fenêtre du chat */}
      {isOpen && (
        <section
          aria-label="Chatbot"
          className="fixed inset-x-3 bottom-20 z-40 flex h-[min(634px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:inset-x-auto sm:right-4 sm:w-[440px]"
        >
          {/* En-tête */}
          <header className="shrink-0 border-b border-gray-100 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Assistant
            </h2>
          </header>

          {/* Zone des messages */}
          <div
            className="min-h-0 flex-1 overflow-y-auto px-5 py-3 sm:px-6"
            aria-live="polite"
          >

          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-8">
              Bonjour ! Je suis votre coach. Écrivez par exemple : "Aide-moi à rédiger mon expérience de Commercial chez Apple".
            </p>
          )}
          {error && (
            <p className="text-gray-400 text-red-500 text-center mt-8">
              L'assistant rencontre un probleme
            </p>
          )}
            {messages.map((item) => {
              const isUser = item.role === "user";

                return (
                    <div
                    key={item.id}
                      className={`my-4 flex items-start gap-3 ${
                        isUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          isUser
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        aria-hidden="true"
                      >
                        {isUser ? "Y" : "AI"}
                      </div>

                      {/* Bulle du message */}
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words ${
                          isUser
                            ? "rounded-tr-sm bg-indigo-600 text-white"
                            : "rounded-tl-sm bg-gray-100 text-gray-700"
                        }`}
                      >
                        
                        {/* <p className="mb-1 text-xs font-semibold opacity-75">
                          {item.role}
                        </p> */}
                        {item.parts.map((part,index)=>{
                        return <p key={index} className="whitespace-pre-wrap">{part.type === 'text' ? part.text : ""}</p>
                            })
                                }
                      </div>
                    </div>
                );


             
              
            })}
          </div>

          {/* Champ de saisie */}
          <footer className="shrink-0 border-t border-gray-100 bg-white p-4 sm:px-5">

                {status !== 'ready' && (
                  <div className="flex mb-[10px] justify-start">
                    <div className="bg-white text-gray-400 text-xs px-4 py-3 rounded-2xl border italic animate-pulse">
                      L'assistant analyse vos données...
                    </div>
                  </div>
                )}
            <form
              onSubmit={e => {
                e.preventDefault();
                if (input.trim()) {
                  sendMessage({ text: input });
                  setInput('');
                }
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={status !== 'ready'}
                placeholder="Type your message..."
                aria-label="Votre message"
                className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                type="submit"
                disabled={status !== 'ready'}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Envoyer</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </footer>
        </section>
      )}
    </>
  );
}
  export const  handleRemplaceBalise=(chaineHandle,baliseToReplace,newBalise)=>{

      if (typeof window === "undefined") {
        return ""; 
      }

    if (!chaineHandle) return '';

     // 1. Analyse de la chaîne HTML via l'API native du navigateur
          const parser = new DOMParser();
          const doc = parser.parseFromString(chaineHandle, 'text/html');

          // 2. Sélection de tous les anciens éléments à remplacer
          // Array.from est natif et évite les bugs de boucle sur une NodeList vivante
          const targets = Array.from(doc.querySelectorAll(baliseToReplace));

          targets.forEach((baliseToReplace) => {
            // 3. Création du nouvel élément natif
            const newEl = doc.createElement(newBalise);

            // 4. Copie de tout le contenu interne (textes + balises imbriquées)
            newEl.innerHTML = baliseToReplace.innerHTML;

            // 5. Copie des attributs existants (classes, id, etc.) si présents
            Array.from(baliseToReplace.attributes).forEach(attr => {
              newEl.setAttribute(attr.name, attr.value);
            });

            // 6. Remplacement direct dans l'arbre DOM virtuel
            baliseToReplace.parentNode.replaceChild(newEl, baliseToReplace);
          });

          // 7. Extraction de la chaîne de caractères finale nettoyée
          return doc.body.innerHTML;
   }
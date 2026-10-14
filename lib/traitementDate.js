 // Liste des mois pour faire la correspondance index <-> texte
      const LISTE_MOIS = [
      "JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN",
      "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"
      ];

      /**
       * 1. Convertit "JANVIER-2020" en "2020-01" (Pour la valeur de l'input)
       */
     export  const convertToInputFormat = (dateString) => {
      if ((!dateString) || !dateString.includes(' ')) return "";

      const [moisTexte, annee] = dateString.split(' ');
      const indexMois = LISTE_MOIS.indexOf(moisTexte.toUpperCase());

      if (indexMois === -1) return "";

      // Ajoute le zéro initial si nécessaire (ex: 1 devient "01")
      const moisNumero = String(indexMois + 1).padStart(2, '0');
      return `${annee}-${moisNumero}`;
      };

      /**
       * 2. Convertit "2020-01" en "JANVIER-2020" (Pour sauvegarder dans vos données)
       */
     export const convertToDataFormat = (inputValues) => {
      if (!inputValues || !inputValues.includes('-')) return "";

      const [annee, moisNumero] = inputValues.split('-');
      const indexMois = parseInt(moisNumero, 10) - 1;

      const moisTexte = LISTE_MOIS[indexMois];
      return `${moisTexte}-${annee}`;
      };
import { useState, useEffect } from "react";

export default function useWindowSize() {
  // 1. Initialiser l'état avec les dimensions actuelles de la fenêtre
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // 2. Fonction qui récupère les nouvelles dimensions
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 3. Ajouter l'écouteur d'événement sur la fenêtre
    window.addEventListener("resize", handleResize);

    // Exécuter immédiatement pour s'assurer que les données sont à jour
    handleResize();

    // 4. Nettoyer l'écouteur lorsque le composant est détruit
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'au montage

  return {widthScreen:windowSize.width};
}

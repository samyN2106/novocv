import { useRef, useState, useEffect } from "react";

export default function CvAutoScaledContainerDashboard({ children }) {
  const TARGET_SIZE_PERCENTAGE = 1; // Prend 100% de la largeur du parent
  const parentRef = useRef(null);
  const contentRef = useRef(null);
  
  const [transformStyle, setTransformStyle] = useState("scale(1) translate(0px, 0px)");
  const [parentHeight, setParentHeight] = useState("auto"); // 👈 Modifié : Retour à une hauteur dynamique

  useEffect(() => {
    const parent = parentRef.current;
    const content = contentRef.current;
    if (!parent || !content) return;

    const updateScale = () => {
      const parentRect = parent.getBoundingClientRect();
      
      // Si le parent n'a pas encore de largeur (ex: rendu initial), on stoppe
      if (parentRect.width === 0) return;

      // 1. Mesure de la taille réelle brute du CV sans le scale actuel
      const currentTransform = content.style.transform;
      content.style.transform = "none";

      const originalWidth = content.scrollWidth;
      const originalHeight = content.scrollHeight;

      // On réapplique directement l'ancien transform
      content.style.transform = currentTransform;

      if (originalWidth === 0 || originalHeight === 0) return;

      // 2. Calcul du scale basé STRICTEMENT sur la largeur pour occuper tout le bloc
      const finalScale = (parentRect.width * TARGET_SIZE_PERCENTAGE) / originalWidth;

      // 3. Centrage horizontal parfait à l'intérieur du parent
      const translateX = (parentRect.width - originalWidth * finalScale) / 2;
      
      // 4. Application des styles : le scaleX s'impose et la hauteur du parent s'adapte au résultat mis à l'échelle
      setTransformStyle(`translate(${translateX}px, 0px) scale(${finalScale})`);
      setParentHeight(`${originalHeight * finalScale}px`); // 👈 Ajuste la hauteur du parent pour contenir le CV
    };

    // Le ResizeObserver écoute le contenu pour réagir aux injections de texte et de templates
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateScale);
    });

    resizeObserver.observe(content);

    // MutationObserver pour intercepter les frappes de texte ou les rendus dynamiques
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(updateScale);
    });
    
    mutationObserver.observe(content, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true 
    });

    // Réagir aux changements de taille d'écran du navigateur
    window.addEventListener("resize", updateScale);
    
    // Premier calcul immédiat
    updateScale();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [children]); 

  return (
    <div
      ref={parentRef}
      style={{
        width: "100%",
        height: parentHeight, // 👈 Utilise la hauteur calculée pour englober tout le CV mis à l'échelle
        position: "relative",
        overflow: "hidden", 
        background: "#f0f0f0",
      }}
    >
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: transformStyle,
          display: "inline-block",
          width: "max-content", 
        }}
      >
        {children}
      </div>
    </div>
  );
}

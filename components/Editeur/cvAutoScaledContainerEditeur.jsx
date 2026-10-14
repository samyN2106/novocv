import { useRef ,useState,useEffect} from "react";


export default function CvAutoScaledContainerEditeur({ children }) {
  const TARGET_WIDTH_PERCENTAGE = 0.9;
  const parentRef = useRef(null);
  const contentRef = useRef(null);
  
  const [transformStyle, setTransformStyle] = useState("scale(1) translate(0px, 0px)");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    const parent = parentRef.current;
    const content = contentRef.current;
    if (!parent || !content) return;

    const updateScale = () => {
      const parentRect = parent.getBoundingClientRect();

      // 1. Pour mesurer la taille réelle "brute" du CV sans l'effet du scale actuel,
      // on retire temporairement le transform, mesure, puis le remet immédiatement.
      // Cette opération se fait en 1 micro-séquence (pas de flash visuel).
      const currentTransform = content.style.transform;
      content.style.transform = "none";

      const originalWidth = content.scrollWidth;
      const originalHeight = content.scrollHeight;

      // On réapplique directement l'ancien transform pour ne pas casser le rendu
      content.style.transform = currentTransform;

      if (originalWidth === 0) return;

      // 2. Calcul du scale et du centrage basé sur la largeur brute du CV
      const finalScale = (parentRect.width * TARGET_WIDTH_PERCENTAGE) / originalWidth;
      const translateX = (parentRect.width - originalWidth * finalScale) / 2;
      
      // 3. Mise à jour de l'état
      setTransformStyle(`translate(${translateX}px, 0px) scale(${finalScale})`);
      setParentHeight(`${originalHeight * finalScale}px`);
    };

    // Le ResizeObserver écoute le parent ET le contenu du CV.
    // Dès qu'une lettre change, qu'une police change, ou qu'un composant bouge, il recalcule !
    const resizeObserver = new ResizeObserver(() => {
      // Utilisation de requestAnimationFrame pour s'assurer que le DOM a fini 
      // de peindre le nouveau style de texte avant de recalculer le scale.
      requestAnimationFrame(updateScale);
    });

    resizeObserver.observe(parent);
    resizeObserver.observe(content);

    // Un MutationObserver en sécurité pour écouter les changements de texte ou de classes CSS internes
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(updateScale);
    });
    
    mutationObserver.observe(content, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true // Écoute les modifications de texte en direct
    });

    updateScale();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [children]); // Se re-déclenche si la structure des enfants change globalement

  return (
    <div
      ref={parentRef}
      style={{
        width: "100%",
        height: parentHeight,
        position: "relative",
        overflow: "visible", 
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
          width: "max-content", // Permet au CV de garder sa largeur de page (ex: 794px pour un A4)
        }}
      >
        {children}
      </div>
    </div>
  );
}
"use client"
import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import img1 from "@/public/Images/cv/cv-1.jpg"
import img2 from "@/public/Images/cv/cv-2.png"
import img3 from "@/public/Images/cv/cv-3.png"
import img4 from "@/public/Images/cv/cv-4.png"
import img5 from "@/public/Images/cv/cv-5.png"
import img7 from "@/public/Images/cv/cv-7.png"
import Image from 'next/image'

const baseSlides = [img1, img2, img3, img4, img5, img7];

// SOLUTION ABSOLUE POUR LA BOUCLE : On quadruple les éléments (24 slides).
// Cela donne à Embla une marge de calcul géante pour intervertir les slides 
// en dehors de la zone visible (derrière le masque transparent), supprimant l'effet de "redémarrage".
const slidesData = [...baseSlides, ...baseSlides, ...baseSlides, ...baseSlides];

export default function EmblaCarousel() {
  // Config optimale pour le flux continu linéaire
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      dragFree: true,
      containScroll: false // Empêche le carrousel de bloquer aux extrémités physiques du tableau
    }, 
    [
      AutoScroll({ 
        speed: 1.2, // Vitesse constante parfaitement linéaire
        stopOnInteraction: false,
        stopOnMouseEnter: false 
      })
    ]
  )

  // Effet de taille pour accentuer l'effet "Projecteur central"
  const applyRetroScaleEffect = useCallback((emblaApi) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slides = emblaApi.slideNodes()
    const scrollSnaps = emblaApi.scrollSnapList() 

    slides.forEach((slideNode, index) => {
      const snapLocation = scrollSnaps[index]
      let distanceToCenter = snapLocation - scrollProgress

      if (engine.options.loop) {
        if (distanceToCenter < -0.5) distanceToCenter += 1
        if (distanceToCenter > 0.5) distanceToCenter -= 1
      }

      const gapFactor = Math.abs(distanceToCenter * scrollSnaps.length)

      // 1 au centre, 0.88 sur les côtés de manière ultra progressive
      const scaleFactor = Math.max(0.88, 1 - gapFactor * 0.08)
      
      if (slideNode) {
        slideNode.style.transform = `scale(${scaleFactor})`
      }
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('scroll', applyRetroScaleEffect)
    emblaApi.on('reInit', applyRetroScaleEffect)
    
    applyRetroScaleEffect(emblaApi)
  }, [emblaApi, applyRetroScaleEffect])

  return (
    <div className="relative w-full py-16">
      
      {/* 
        MASQUE DE TRANSPARENCE RADICAL :
        Les slides glissent depuis le néant transparent (0%), deviennent opaques au centre (25% à 75%),
        puis s'effacent complètement vers le transparent (100%).
        C'est à cet endroit (invisible à l'œil) qu'Embla réinjecte les images au début du tableau.
      */}
      <div 
        className="embla w-full" 
        ref={emblaRef} 
        style={{ 
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)'
        }}
      >
        <div className="embla__container" style={{ display: 'flex', gap: '16px' }}>
          {slidesData.map((img, index) => (
            <div
              key={index}
              className="embla__slide relative select-none"
              style={{
                flex: '0 0 240px',       
                aspectRatio: '1 / 1.41', 
                willChange: 'transform'
              }}
            >
              <div className="w-full h-full relative rounded-md overflow-hidden shadow-xl bg-black">
                <Image 
                  src={img} 
                  fill 
                  alt={`retro_item_${index}`} 
                  className="object-cover"
                  sizes="240px"
                  priority={index < 6} // Priorise l'affichage direct du premier set visuel
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

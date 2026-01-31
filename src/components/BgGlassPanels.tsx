'use client'

import { useEffect, useState } from 'react'

export default function BgGlassPanels() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  // fill shapes (bez zmian)
  const d1 = 'M-100 120 L520 -80 L720 780 L80 920 Z'
  const d2 = 'M520 -60 L1320 120 L1120 820 L340 620 Z'
  const d3 = 'M-120 520 L340 220 L560 940 L40 980 Z'

  // motion: shape1 kończy na (520,-60) żeby shape2 "wjechał" z tego samego miejsca
  const d1Motion = 'M-100 120 L520 -80 L720 780 L80 920 L-100 120 L520 -80 L520 -60'

  // motion: shape2 startuje w (520,-60)
  const d2Motion = 'M520 -60 L1320 120 L1120 820 L340 620 Z' // Z wraca do (520,-60)

  // MOSTEK 2 -> 3:
  // B(520,-80) -> C(720,780) (2-ga ściana shape1) -> P3(560,940) 
  const bridge23 = 'M520 -80 L720 780 L520 820 L560 940'

  // motion: shape3 zaczyna w P3(560,940) (żeby nie było przeskoku po mostku),
  // i kończy w (-120,520), bo returnPath startuje w (-120,520)
  const d3Motion = 'M560 940 L40 980 L-120 520 L340 220 L560 940 L40 980 L-120 520'

  const returnPath = 'M-120 520 L-20 440 L-100 120'

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
      viewBox="0 0 1200 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="panel1" x1="0" y1="0" x2="1200" y2="700" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(41, 98, 255, 0.12)" />
          <stop offset="1" stopColor="rgba(230, 216, 181, 0.06)" />
        </linearGradient>

        <linearGradient id="panel2" x1="1200" y1="0" x2="0" y2="700" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(240, 122, 43, 0.10)" />
          <stop offset="1" stopColor="rgba(230, 216, 181, 0.06)" />
        </linearGradient>

        <radialGradient
          id="sparkGlow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0 0) rotate(90) scale(16)"
        >
          <stop stopColor="rgba(240,122,43,0.70)" />
          <stop offset="1" stopColor="rgba(240,122,43,0)" />
        </radialGradient>

        <path id="shape1Motion" d={d1Motion} />
        <path id="shape2Motion" d={d2Motion} />
        <path id="bridge23" d={bridge23} />
        <path id="shape3Motion" d={d3Motion} />
        <path id="returnPath" d={returnPath} />
      </defs>

      {/* panele */}
      <path d={d1} fill="url(#panel1)" />
      <path d={d2} fill="url(#panel2)" />
      <path d={d3} fill="rgba(230,216,181,0.05)" />

      {/* ognik */}
      <g>
        <circle r="2.3" fill="rgba(240,122,43,0.95)" />
        <circle r="16" fill="url(#sparkGlow)" />

        {!prefersReducedMotion && (
          <>
            {/* 1 -> 2 -> bridge -> 3 -> return -> loop */}
            <animateMotion id="m1" dur="5.6s" begin="0s; m5.end" repeatCount="1" rotate="auto">
              <mpath href="#shape1Motion" />
            </animateMotion>

            <animateMotion id="m2" dur="5s" begin="m1.end" repeatCount="1" rotate="auto">
              <mpath href="#shape2Motion" />
            </animateMotion>

            {/* zjazd po 2-giej ścianie shape1 + doskok do startu shape3  */}
            <animateMotion id="m3" dur="2s" begin="m2.end" repeatCount="1" rotate="auto">
              <mpath href="#bridge23" />
            </animateMotion>

            <animateMotion id="m4" dur="5s" begin="m3.end" repeatCount="1" rotate="auto">
              <mpath href="#shape3Motion" />
            </animateMotion>

            <animateMotion id="m5" dur="1.1s" begin="m4.end" repeatCount="1" rotate="auto">
              <mpath href="#returnPath" />
            </animateMotion>
          </>
        )}
      </g>
    </svg>
  )
}

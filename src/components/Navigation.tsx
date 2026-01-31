'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'
import { portfolioData } from '../content/portfolio'

export default function Navigation() {
  const { language, setLanguage } = useLanguage()
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const scrollPosition = window.scrollY + 150
      const viewportHeight = window.innerHeight
      const scrollBottom = window.scrollY + viewportHeight

      let currentSection = 'hero'
      
      for (let i = portfolioData.sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(portfolioData.sections[i].id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          
          if (
            (sectionTop <= scrollPosition && sectionBottom > scrollPosition) ||
            (i === portfolioData.sections.length - 1 && scrollBottom >= document.documentElement.scrollHeight - 50)
          ) {
            currentSection = portfolioData.sections[i].id
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      })

      setTimeout(() => {
        setActiveSection(id)
      }, 100)
    }
  }

  return (
    <motion.nav
      aria-label="Primary navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(39,53,84,0.8)] backdrop-blur-md border-b border-circuit'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex flex-col text-xl font-heading font-bold animated-accent-text hover:text-accent-orange transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
            aria-label="Przejdź do strony głównej"
          >
            {portfolioData.name.toUpperCase()}
            <span className='text-xs hidden lg:block'>
              {portfolioData.role.toLowerCase()}
              </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {portfolioData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-lg text-xs font-heading font-medium transition-all duration-200 uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark ${
                  activeSection === section.id
                    ? 'text-accent-orange bg-[rgba(255,255,255,0.03)] border border-circuit'
                    : 'text-text-muted hover:text-text-main hover:bg-[rgba(255,255,255,0.02)]'
                }`}
                aria-label={`Przejdź do sekcji ${t.nav[section.key as keyof typeof t.nav]}`}
                aria-current={activeSection === section.id ? true : false}
              >
                {t.nav[section.key as keyof typeof t.nav]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-circuit rounded-lg p-1">
              <button
                onClick={() => setLanguage('pl')}
                className={`px-2 py-1 text-xs font-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark ${
                  language === 'pl'
                    ? 'text-accent-orange'
                    : 'text-text-muted hover:text-text-main'
                }`}
                aria-label="Przełącz na język polski"
                aria-pressed={language === 'pl'}
              >
                PL
              </button>
              <div className="w-px h-4 bg-circuit" aria-hidden="true" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark ${
                  language === 'en'
                    ? 'text-accent-orange'
                    : 'text-text-muted hover:text-text-main'
                }`}
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 text-xs font-heading font-medium text-accent-orange hover:animated-accent-text transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                aria-label={`Przejdź do sekcji ${t.nav.contact}`}
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

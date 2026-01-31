'use client'

import { motion } from 'framer-motion'
import { portfolioData } from '@/src/content/portfolio'
import Button from '@/src/components/Button'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold animated-accent-text mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block">{portfolioData.name.toUpperCase()}</span>
            <span className="block text-accent-orange mt-2">
              {portfolioData.role.toUpperCase()}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button onClick={() => scrollToSection('projects')}>
              {t.hero.viewProjects}
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
            >
              {t.hero.contact}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-circuit rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-accent-orange rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

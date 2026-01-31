'use client'

import { motion } from 'framer-motion'
import { portfolioData } from '@/src/content/portfolio'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../i18n/translations'

export default function Skills() {
  const { language } = useLanguage()
  const t = translations[language]
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold animated-accent-text text-base-50 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="skills-title"
        >
          {t.skills.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.skills.map((skillCategory, categoryIndex) => {
            const isMain = categoryIndex === 0;
            return(
            <motion.div
              key={skillCategory.category}
              className={`p-6 rounded-xl bg-base-900 border border-base-800 hover:border-accent-500/50 transition-all duration-300 ${isMain ? 'main-skill-glow' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-accent-400 mb-4">
                {skillCategory.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.03)] text-text-muted border border-circuit hover:border-accent-orange/50 hover:text-accent-orange transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + itemIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}

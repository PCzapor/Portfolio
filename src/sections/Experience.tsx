'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'

export default function Experience() {
  const { language } = useLanguage()
  const t = translations[language]
  
  if (!t.experience || t.experience.content.length === 0) {
    return null
  }

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="experience-title">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-heading font-bold animated-accent-text mb-12 text-center uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          id="experience-title"
        >
          {t.experience.title}
        </motion.h2>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-circuit hidden md:block" />

          <div className="space-y-12">
            {t.experience.content.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-0 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-accent-orange border-4 border-bg-dark hidden md:block" />

                <div className="p-6 rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit hover:border-accent-orange/50 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-heading font-bold animated-accent-text uppercase tracking-wider">
                      {exp.role}
                    </h3>
                    <span className="text-accent-orange font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-lg text-text-muted mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-text-main"
                      >
                        <span className="text-accent-orange my-auto">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/src/content/portfolio'
import Button from '@/src/components/Button'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.contact.email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-heading font-bold animated-accent-text mb-4 text-center uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.contact.title}
        </motion.h2>

        <motion.p
          className="text-xl text-text-muted mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.contact.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit backdrop-blur-sm">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-text-muted mb-1">{t.contact.email}</p>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="text-lg text-text-main hover:text-accent-orange transition-colors"
                >
                  {portfolioData.contact.email}
                </a>
              </div>
              <Button
                variant="outline"
                onClick={copyEmail}
                className="w-full sm:w-auto"
              >
                {emailCopied ? t.contact.copied : t.contact.copy}
              </Button>
            </div>

            {portfolioData.contact.location && (
              <div className="p-6 rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit backdrop-blur-sm">
                <p className="text-sm text-text-muted mb-1">{t.contact.location}</p>
                <p className="text-lg text-text-main">
                  {portfolioData.contact.location}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {portfolioData.contact.linkedin && (
              <motion.a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit hover:border-accent-orange/50 text-text-muted hover:text-accent-orange transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            )}

            {portfolioData.contact.github && (
              <motion.a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit hover:border-accent-orange/50 text-text-muted hover:text-accent-orange transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

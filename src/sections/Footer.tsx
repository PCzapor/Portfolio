'use client'

import { portfolioData } from '@/src/content/portfolio'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-circuit">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} {portfolioData.name.toUpperCase()}. {t.footer.rights}
          </p>
          <p className="text-text-muted text-sm">
            {t.footer.built}{' '}
            <span className="text-accent-orange">NEXT.JS</span> {t.footer.and}{' '}
            <span className="text-accent-orange">TYPESCRIPT</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

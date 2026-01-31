'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/src/types'
import Button from './Button'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: ProjectModalProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [mainImageIndex, setMainImageIndex] = useState(0)

  useEffect(() => {
    if (project) {
      setMainImageIndex(0)
    }
  }, [project])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    const modal = document.getElementById('project-modal')
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (index === mainImageIndex) return

      setMainImageIndex(index)
    },
    [mainImageIndex]
  )

  if (!project) return null

  const mainImage = project.images[mainImageIndex] || project.images[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg-dark/95 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            id="project-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[rgba(255,255,255,0.03)] rounded-lg border border-circuit shadow-2xl overflow-hidden pointer-events-auto flex flex-col backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-6 border-b border-circuit">
                <div className="flex-1 pr-4">
                  <h2
                    id="modal-title"
                    className="text-3xl font-heading font-bold animated-accent-text mb-2 uppercase tracking-wider"
                  >
                    {project.title.toUpperCase()}
                  </h2>
                  <p className="text-text-muted mb-4">{project.tagline}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.03)] text-text-muted border border-circuit"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="w-2 h-2 rounded-full bg-accent-orange" />
                    {project.role}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="ml-4 p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-[rgba(255,255,255,0.03)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
                  aria-label={t.modal.close}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="relative w-full aspect-video bg-bg-dark">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mainImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={mainImage}
                        alt={`${project.title} - Screenshot ${mainImageIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                        sizes="100vw"
                        unoptimized={mainImage.endsWith('.svg')}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {project.images.length > 1 && (
                  <div className="p-6 border-t border-circuit">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {project.images.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleThumbnailClick(index)}
                          className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === mainImageIndex
                              ? 'border-accent-orange ring-2 ring-accent-orange/50'
                              : 'border-circuit hover:border-accent-orange/50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Pokaż obrazek ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`Miniatura ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                            unoptimized={image.endsWith('.svg')}
                          />
                          {index === mainImageIndex && (
                            <div className="absolute inset-0 bg-accent-orange/20" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-6 pb-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-text-main leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-lg font-heading font-semibold animated-accent-text my-auto uppercase tracking-wider">
                        {t.modal.features}
                      </h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 my-auto text-text-main"
                          >
                            <span className="text-accent-orange my-auto">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-heading font-semibold animated-accent-text my-auto uppercase tracking-wider">
                        {t.modal.tasks}
                      </h3>
                      <ul className="space-y-2">
                        {project.tasks.map((task, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-text-main"
                          >
                            <span className="text-accent-orange my-auto">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.githubUrl && (
                      <div className="mt-6 pt-6 border-t border-circuit">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-accent-orange hover:animated-accent-text transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span>{t.modal.viewGitHub}</span>
                        </a>
                      </div>
                    )}
                    {project.websiteUrl && (
                      <div className="mt-6 pt-6 border-t border-circuit">
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-accent-orange hover:animated-accent-text transition-colors"
                        >
                          <span>{t.modal.websiteUrl}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {(hasPrev || hasNext) && (
                <div className="flex items-center justify-between p-6 border-t border-circuit">
                  <Button
                    variant="outline"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t.modal.prev}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onNext}
                    disabled={!hasNext}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t.modal.next}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

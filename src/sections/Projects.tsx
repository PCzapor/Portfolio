'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/src/content/portfolio'
import ProjectCard from '@/src/components/ProjectCard'
import ProjectModal from '@/src/components/ProjectModal'
import { useLanguage } from '@/src/contexts/LanguageContext'
import { translations } from '@/src/i18n/translations'

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedProject(index)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  const goToNext = () => {
    if (selectedProject !== null && selectedProject < t.projects.content.length - 1) {
      setSelectedProject(selectedProject + 1)
    }
  }

  const goToPrev = () => {
    if (selectedProject !== null && selectedProject > 0) {
      setSelectedProject(selectedProject - 1)
    }
  }

  const currentProject =
    selectedProject !== null ? t.projects.content[selectedProject] : null

  return (
    <>
      <section
        id="projects"
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl font-heading font-bold animated-accent-text mb-4 text-center uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.projects.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.content.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => openModal(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={currentProject}
        isOpen={selectedProject !== null}
        onClose={closeModal}
        onNext={goToNext}
        onPrev={goToPrev}
        hasNext={selectedProject !== null && selectedProject < t.projects.content.length - 1}
        hasPrev={selectedProject !== null && selectedProject > 0}
      />
    </>
  )
}

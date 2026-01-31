'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/src/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
}

export default function ProjectCard({
  project,
  onClick,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={onClick}
        className="w-full text-left relative overflow-hidden rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit hover:border-accent-orange/50 transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
        aria-label={`Otwórz szczegóły projektu ${project.title}`}
      >
        <div className="relative aspect-video overflow-hidden bg-bg-dark">
          {project.images[0] && (
            <Image
              src={project.images[0]}
              alt={`Screenshot projektu ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={project.images[0].endsWith('.svg')}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-heading font-bold animated-accent-text mb-1 group-hover:text-accent-orange transition-colors uppercase tracking-wider line-clamp-2 min-h-[3.5rem]">
                {project.title.toUpperCase()}
              </h3>
              <p className="text-sm text-text-muted">{project.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium rounded-md bg-[rgba(255,255,255,0.03)] text-text-muted border border-circuit"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-[rgba(255,255,255,0.03)] text-text-muted border border-circuit">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            {project.role}
          </div>
        </div>

        <div className="absolute inset-0 bg-accent-orange/0 group-hover:bg-accent-orange/5 transition-colors duration-300 pointer-events-none" />
      </button>
    </motion.article>
  )
}

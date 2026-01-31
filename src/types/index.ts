export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  features: string[]
  tasks: string[]
  stack: string[]
  role: string
  images: string[]
  githubUrl?: string
  websiteUrl?: string
}

export interface Skill {
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tooling'
  items: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string[]
}

export interface PortfolioData {
  name: string
  role: string
  tagline: string
  about: {
    bullets: string[]
  }
  skills: Skill[]
  contact: {
    email: string
    phone?: string
    location?: string
    linkedin?: string
    github?: string
  }
}

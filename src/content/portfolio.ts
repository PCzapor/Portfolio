import { PortfolioData } from '@/src/types'

export const portfolioData: PortfolioData = {
  name: 'Piotr Czapor',
  role: 'Full-Stack Developer',
  tagline: 'Tworzę nowoczesne aplikacje webowe z naciskiem na UX i performance',
  about: {
    bullets: [
      'Specjalizuję się w [[React]], [[Next.js]] i [[TypeScript]]',
      'Buduję skalowalne backendy w [[Node.js]]',
      'Dbam o jakość kodu, testy i best practices',
      'Pracuję w metodologiach Agile/Scrum',
      'Pasjonuję się nowoczesnymi technologiami i ciągłym rozwojem',
    ],
  },
  sections : [
    { id: 'hero', key: 'start' },
    { id: 'about', key: 'about' },
    { id: 'skills', key: 'skills' },
    { id: 'projects', key: 'projects' },
    { id: 'experience', key: 'experience' },
    { id: 'contact', key: 'contact' },
  ],
  skills: [
    {
      category: 'Frontend',
      items: [
        'React',
        'Next.js',
        'Vue 3',
        'TypeScript',
        'JavaScript',
        'Redux / RTK Query',
        'Pinia',
        'Tailwind',
        'CSS / SASS',
      ],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'NestJS', 'REST API', 'GraphQL'],
    },
    {
      category: 'DevOps',
      items: ['Docker', 'Git', 'AWS', 'CI/CD', "Swagger"],
    },
    {
      category: 'Tooling',
      items: ['Git', 'ESLint', 'Prettier', 'Figma', "Slack"],
    },
  ],
  contact: {
    email: 'p.czapor.dev@gmail.com',
    location: 'Rzeszów, Poland',
    linkedin: 'https://www.linkedin.com/in/piotr-czapor-669280262/',
    github: 'https://github.com/PCzapor',
  },
}


import { portfolioData } from '@/src/content/portfolio'

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioData.name,
    jobTitle: portfolioData.role,
    description: portfolioData.tagline,
    url: 'https://piotrczapor.dev',
    email: portfolioData.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: portfolioData.contact.location,
    },
    sameAs: [
      portfolioData.contact.linkedin,
      portfolioData.contact.github,
    ].filter(Boolean),
    knowsAbout: [
      ...portfolioData.skills.flatMap((skill) => skill.items),
    ],
  }
  
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://piotrczapor.dev',
    name: `${portfolioData.name} Portfolio`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, websiteLd]) }}
    />
  )
}

import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/src/contexts/LanguageContext'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://piotrczapor.dev'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Piotr Czapor - Full-Stack Developer',
    template: '%s | Piotr Czapor',
  },
  description:
    'Full-Stack Developer z 3+ latami doświadczenia. Specjalizuję się w React, Next.js, TypeScript i Node.js. Tworzę skalowalne aplikacje webowe z naciskiem na architekturę, performance i UX.',
  keywords: [
    'Full-Stack Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Node.js',
    'NestJS',
    'REST API',
    'GraphQL',
    'Docker',
    'Git',
    'AWS',
    'CI/CD',
    'Swagger',
    'ESLint',
    'Frontend Developer',
    'Backend Developer',
    'Web Development',
    'Portfolio',
    'Piotr Czapor',
  ],
  authors: [{ name: 'Piotr Czapor' }],
  creator: 'Piotr Czapor',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'Piotr Czapor - Portfolio',
    title: 'Piotr Czapor - Full-Stack Developer',
    description:
      'Full-Stack Developer z 3+ latami doświadczenia. Specjalizuję się w React, Next.js, TypeScript i Node.js.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Piotr Czapor - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piotr Czapor - Full-Stack Developer',
    description:
      'Full-Stack Developer z 3+ latami doświadczenia. Specjalizuję się w React, Next.js, TypeScript i Node.js.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  alternates: {
    canonical: '/',
  },
  verification: {

  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2F3E63', 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${orbitron.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

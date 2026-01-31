import Hero from '@/src/sections/Hero'
import About from '@/src/sections/About'
import Skills from '@/src/sections/Skills'
import Projects from '@/src/sections/Projects'
import Experience from '@/src/sections/Experience'
import Contact from '@/src/sections/Contact'
import Footer from '@/src/sections/Footer'
import Navigation from '@/src/components/Navigation'
import BgGlassPanels from '@/src/components/BgGlassPanels'

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <BgGlassPanels />
      </div>
      
      <main className="relative min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

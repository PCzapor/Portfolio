"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "@/src/contexts/LanguageContext"
import { translations } from "@/src/i18n/translations"

type TechKey = "TypeScript" | "React" | "Next.js" | "Node.js" | "Vue 3"

  const snippets: Record<TechKey, string> = {
    TypeScript: `type User = {
  id: number
  name: string
}

function greet(user: User): string {
  return \`Hello \${user.name}\`
}`,

    React: `import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  )
}`,

    "Vue 3": `<script setup>
import { ref } from "vue"

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>`,

    "Next.js": `export async function GET() {
  return Response.json({ status: "ok" })
}`,

    "Node.js": `import express from "express"

const app = express()

app.get("/health", (_, res) => {
  res.json({ ok: true })
})`,
  }


function splitWithTechTokens(input: string) {
  const re = /\[\[([^\]]+)\]\]/g
  const parts: Array<{ type: "text" | "tech"; value: string }> = []
  let last = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(input))) {
    if (m.index > last) parts.push({ type: "text", value: input.slice(last, m.index) })
    parts.push({ type: "tech", value: m[1].trim() })
    last = re.lastIndex
  }
  if (last < input.length) parts.push({ type: "text", value: input.slice(last) })
  return parts
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDisplayed("")
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (!text) return

    const totalDuration = 8000
    const delayPerChar = totalDuration / text.length

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index])
        setIndex((i) => i + 1)
      }, delayPerChar)

      return () => clearTimeout(timeout)
    }
  }, [index, text])

  return (
    <pre className="whitespace-pre-wrap relative">
      {displayed}
      <span className="ml-1 animate-blink">|</span>
    </pre>
  )
}

function TypingCode({ tech }: { tech: TechKey }) {
  return (
    <div className="font-mono text-sm sm:text-base text-left text-accent-light leading-relaxed">
      <Typewriter text={snippets[tech]} />
    </div>
  )
}

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]
  const [active, setActive] = useState<TechKey>("TypeScript")

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-heading font-bold animated-accent-text mb-12 text-center uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t.about.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-circuit bg-[rgba(255,255,255,0.03)] backdrop-blur-sm p-6 overflow-hidden">
              <div className="text-2xl font-heading font-bold text-text-main mb-2">{active}</div>
              <p className="text-text-muted mb-4">{t.about.tech[active as keyof typeof t.about.tech]?.desc ?? ''}</p>

              <div className="relative rounded-xl border border-circuit bg-[rgba(0,0,0,0.35)] p-8 min-h-[260px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                  >
                    <TypingCode tech={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {t.about.bullets.map((bullet, index) => {
              const parts = splitWithTechTokens(bullet)
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-lg bg-[rgba(255,255,255,0.03)] border border-circuit hover:border-accent-orange/50 transition-all duration-300 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent-orange my-auto" />
                  <p className="text-lg text-text-main leading-relaxed">
                    {parts.map((p, i) =>
                      p.type === "text" ? (
                        <span key={i}>{p.value}</span>
                      ) : (
                        <button
                          key={i}
                          type="button"
                          onMouseEnter={() => setActive(p.value as TechKey)}
                          onFocus={() => setActive(p.value as TechKey)}
                          onClick={() => setActive(p.value as TechKey)}
                          className="mx-1 inline-flex items-baseline rounded-md px-2 py-0.5 font-semibold text-accent-orange/90 hover:text-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/50 transition-colors"
                        >
                          {p.value}
                        </button>
                      )
                    )}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

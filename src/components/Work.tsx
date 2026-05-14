import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WorkEntry {
  period: string
  role: string
  org: string
  desc: string
  tags: string[]
}

const ENTRIES: WorkEntry[] = [
  {
    period: '2025 — present',
    role: 'software engineer',
    org: 'self-directed',
    desc: 'building open-source tooling, sharpening systems knowledge, shipping personal projects. focused on graphics programming, compiler internals, and high-performance interfaces.',
    tags: ['rust', 'typescript', 'three.js', 'webgl'],
  },
  {
    period: '2024',
    role: 'frontend engineer',
    org: 'contract',
    desc: 'delivered production react applications for clients across fintech and devtools. emphasis on performance, accessibility, and component architecture.',
    tags: ['react', 'next.js', 'typescript', 'tailwind'],
  },
  {
    period: '2023 — 2024',
    role: 'full-stack developer',
    org: 'replace with employer',
    desc: 'replace this entry with your actual work history. keep everything lowercase. two sentences max per description.',
    tags: ['node.js', 'python', 'postgresql'],
  },
]

function WorkRow({ entry, delay, last }: { entry: WorkEntry; delay: number; last: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        display: 'grid',
        gridTemplateColumns: '9rem 1fr',
        borderBottom: last ? 'none' : '0.5px solid var(--rule)',
        padding: '1.75rem 0',
        gap: '1.5rem',
      }}
    >
      {/* left: period */}
      <div style={{ paddingTop: '0.125rem' }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5625rem',
          letterSpacing: '0.12em',
          color: 'var(--text-dim)',
          lineHeight: 1.6,
        }}>
          {entry.period}
        </p>
      </div>

      {/* right: content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.625rem', flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '1.125rem',
            color: 'var(--text)',
            fontWeight: 400,
            lineHeight: 1.1,
          }}>
            {entry.role}
          </h3>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.5625rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}>
            @ {entry.org}
          </span>
        </div>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.85,
          maxWidth: '56ch',
          marginBottom: '0.875rem',
        }}>
          {entry.desc}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {entry.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--text-dim)',
                border: '0.5px solid var(--rule)',
                padding: '0.1875rem 0.5rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="work" style={{ borderTop: '0.5px solid var(--rule)' }}>

      {/* section header */}
      <motion.div
        ref={headRef}
        initial={{ opacity: 0 }}
        animate={headInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem',
          borderBottom: '0.5px solid var(--rule)',
        }}
      >
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
        }}>
          // work
        </span>
        <div style={{ flex: 1, height: '0.5px', background: 'var(--rule)' }} />
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.14em',
          color: 'var(--text-dim)',
        }}>
          experience · chronological
        </span>
      </motion.div>

      {/* entry list */}
      <div style={{ padding: '0 1.5rem', borderBottom: '0.5px solid var(--rule)' }}>
        {ENTRIES.map((entry, i) => (
          <WorkRow
            key={entry.role + entry.period}
            entry={entry}
            delay={i * 0.07}
            last={i === ENTRIES.length - 1}
          />
        ))}
      </div>

    </section>
  )
}

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
    period: '2024 — 2028/29',
    role: 'bsc computer science',
    org: "queen's university",
    desc: 'going into third year in kingston, ontario. focused on systems programming and software engineering. actively pursuing cs internships and first industry roles.',
    tags: ['kingston, on', 'expected 2028 — 2029'],
  },
  {
    period: '2024 — 2025',
    role: 'team member',
    org: 'autodrive team',
    desc: "part of queen's autonomous vehicle competition team in first year. early hands-on exposure to embedded systems and real-time software in a collaborative team environment.",
    tags: ['autonomous vehicles', 'embedded systems'],
  },
]

function WorkRow({ entry, delay, last }: { entry: WorkEntry; delay: number; last: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className="work-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '9rem 1fr',
        borderBottom: last ? 'none' : '0.5px solid var(--rule)',
        padding: '1.75rem 0',
        gap: '1.5rem',
      }}
    >
      {/* left: period */}
      <div className="work-period" style={{ paddingTop: '0.125rem' }}>
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
        initial={{ opacity: 0, y: 10 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.14em',
          color: 'var(--text-dim)',
        }}>
          education + experience
        </span>
      </motion.div>

      {/* entry list */}
      <div style={{ padding: '0 1.5rem', borderBottom: '0.5px solid var(--rule)' }}>
        {ENTRIES.length === 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '9rem 1fr',
            padding: '2.5rem 0',
            gap: '1.5rem',
          }}>
            {/* left */}
            <div style={{ paddingTop: '0.125rem' }}>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.5625rem',
                letterSpacing: '0.12em',
                color: 'var(--text-dim)',
                lineHeight: 1.6,
              }}>
                2026 — present
              </p>
            </div>

            {/* right */}
            <div>
              <h3 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '1.125rem',
                color: 'var(--text)',
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: '0.875rem',
              }}>
                no industry role yet.
              </h3>

              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.85,
                maxWidth: '52ch',
                marginBottom: '1.5rem',
              }}>
                actively building toward a first cs position. spending the time shipping
                real tools, deepening systems knowledge, and learning by doing — not waiting.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { key: 'currently', val: 'building personal projects + open source' },
                  { key: 'status',    val: 'open to opportunities' },
                ].map(({ key, val }) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--text-dim)',
                      minWidth: '6rem',
                      flexShrink: 0,
                    }}>
                      {key}
                    </span>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.5625rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                    }}>
                      → {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : ENTRIES.map((entry, i) => (
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

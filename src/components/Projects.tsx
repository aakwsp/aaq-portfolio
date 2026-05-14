import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: '01',
    tag: 'web · three.js',
    title: 'aaq-portfolio',
    desc: 'this site. built with glsl shaders, brutalist type hierarchy, and a monospace voice throughout. no rounded corners.',
    icon: 'circle' as const,
    url: '#',
  },
  {
    id: '02',
    tag: 'systems · rust',
    title: 'project-two',
    desc: 'replace with your second project. keep titles lowercase. geometry shifts per card — circle, square, triangle, diamond.',
    icon: 'square' as const,
    url: '#',
  },
  {
    id: '03',
    tag: 'tool · cli',
    title: 'project-three',
    desc: 'replace with your third project. the geometric icon is pinned to the bottom-right at very low opacity.',
    icon: 'triangle' as const,
    url: '#',
  },
  {
    id: '04',
    tag: 'experiment · glsl',
    title: 'project-four',
    desc: 'replace with your fourth project. keep descriptions tight — two sentences max, lowercase throughout.',
    icon: 'diamond' as const,
    url: '#',
  },
  {
    id: '05',
    tag: 'web · react',
    title: 'project-five',
    desc: 'replace with your fifth project. a good description says what it does and why it was interesting to build.',
    icon: 'circle' as const,
    url: '#',
  },
  {
    id: '06',
    tag: 'systems · c++',
    title: 'project-six',
    desc: 'replace with your sixth project. stack tags go in the tag field above the title, not in the description.',
    icon: 'square' as const,
    url: '#',
  },
  {
    id: '07',
    tag: 'tool · python',
    title: 'project-seven',
    desc: 'replace with your seventh project. keep it to two sentences and lowercase throughout.',
    icon: 'triangle' as const,
    url: '#',
  },
] as const

type IconType = 'circle' | 'square' | 'triangle' | 'diamond'

function GeoIcon({ type }: { type: IconType }) {
  const s = 80
  return (
    <svg
      width={s} height={s} viewBox="0 0 80 80"
      fill="none" strokeWidth="0.6"
      stroke="currentColor"
      style={{ display: 'block' }}
    >
      {type === 'circle' && <>
        <circle cx="40" cy="40" r="36" />
        <circle cx="40" cy="40" r="26" />
        <circle cx="40" cy="40" r="16" />
        <line x1="4" y1="40" x2="76" y2="40" />
        <line x1="40" y1="4" x2="40" y2="76" />
        <line x1="14.5" y1="14.5" x2="65.5" y2="65.5" />
        <line x1="65.5" y1="14.5" x2="14.5" y2="65.5" />
        <circle cx="40" cy="40" r="3" />
      </>}
      {type === 'square' && <>
        <rect x="4" y="4" width="72" height="72" />
        <rect x="16" y="16" width="48" height="48" />
        <rect x="28" y="28" width="24" height="24" />
        <line x1="4" y1="4" x2="76" y2="76" />
        <line x1="76" y1="4" x2="4" y2="76" />
        <line x1="4" y1="40" x2="76" y2="40" />
        <line x1="40" y1="4" x2="40" y2="76" />
      </>}
      {type === 'triangle' && <>
        <polygon points="40,4 76,72 4,72" />
        <polygon points="40,18 65,66 15,66" />
        <polygon points="40,33 52,60 28,60" />
        <line x1="40" y1="4" x2="40" y2="72" />
        <line x1="4" y1="72" x2="76" y2="72" />
        <line x1="22" y1="38" x2="58" y2="38" />
        <circle cx="40" cy="44" r="2" />
      </>}
      {type === 'diamond' && <>
        <polygon points="40,2 78,40 40,78 2,40" />
        <polygon points="40,14 66,40 40,66 14,40" />
        <polygon points="40,26 54,40 40,54 26,40" />
        <line x1="2" y1="40" x2="78" y2="40" />
        <line x1="40" y1="2" x2="40" y2="78" />
        <circle cx="40" cy="40" r="3" />
        <circle cx="40" cy="40" r="8" />
      </>}
    </svg>
  )
}

function Card({ project, delay }: { project: typeof PROJECTS[number]; delay: number }) {
  const ref  = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target={project.url !== '#' ? '_blank' : undefined}
      rel="noreferrer"
      className="project-card"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        display: 'block',
        position: 'relative',
        background: 'var(--bg)',
        padding: '2rem',
        overflow: 'hidden',
        transition: 'background 0.15s ease',
        minHeight: 220,
      }}
    >
      {/* tag */}
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: 'var(--text-dim)',
        marginBottom: '0.875rem',
      }}>
        {project.id} — {project.tag}
      </p>

      {/* title */}
      <h3 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
        color: 'var(--text)',
        fontWeight: 400,
        lineHeight: 1.1,
        marginBottom: '0.875rem',
        letterSpacing: '-0.01em',
      }}>
        {project.title}
      </h3>

      {/* desc */}
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.6875rem',
        color: 'var(--text-muted)',
        lineHeight: 1.85,
        maxWidth: '34ch',
      }}>
        {project.desc}
      </p>

      {/* geometric icon — pinned bottom-right, very low opacity */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          color: 'var(--text)',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      >
        <GeoIcon type={project.icon} />
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="projects" style={{ borderTop: '0.5px solid var(--rule)' }}>

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
          // projects
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.14em',
          color: 'var(--text-dim)',
        }}>
          selected work · 2024–2026
        </span>
      </motion.div>

      {/* 2×2 grid with gap borders */}
      <div className="projects-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '1px',
        background: 'var(--gap)',
      }}>
        {PROJECTS.map((p, i) => (
          <Card key={p.id} project={p} delay={i * 0.06} />
        ))}
      </div>

    </section>
  )
}

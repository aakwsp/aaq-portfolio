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
  const s = 64
  return (
    <svg
      width={s} height={s} viewBox="0 0 64 64"
      fill="none" strokeWidth="0.75"
      stroke="currentColor"
      style={{ display: 'block' }}
    >
      {type === 'circle'   && <circle cx="32" cy="32" r="30" />}
      {type === 'square'   && <rect x="2" y="2" width="60" height="60" />}
      {type === 'triangle' && <polygon points="32,3 61,61 3,61" />}
      {type === 'diamond'  && <polygon points="32,2 62,32 32,62 2,32" />}
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
          bottom: 16,
          right: 16,
          color: 'var(--text)',
          opacity: 0.18,
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
      <div style={{
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

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
  name: string
  level: number   /* 0–100 */
}

function getLabel(level: number): string {
  if (level >= 90) return 'expert'
  if (level >= 75) return 'proficient'
  if (level >= 60) return 'competent'
  if (level >= 45) return 'familiar'
  return 'learning'
}

const SKILLS: Skill[] = [
  { name: 'linux / bash', level: 85 },
  { name: 'c',            level: 80 },
  { name: 'c++',          level: 80 },
  { name: 'java',         level: 80 },
  { name: 'c#',           level: 75 },
  { name: 'matlab',       level: 70 },
  { name: 'javascript',   level: 60 },
  { name: 'typescript',   level: 60 },
  { name: 'python',       level: 60 },
  { name: 'sql',          level: 55 },
  { name: 'electron',     level: 55 },
  { name: 'react / next.js', level: 60 },
  { name: 'three.js',     level: 50 },
  { name: 'node.js',      level: 50 },
  { name: 'rust',         level: 55 },
]

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (inView && fillRef.current) {
      fillRef.current.style.transform = `scaleX(${skill.level / 100})`
    }
  }, [inView, skill.level])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        padding: '1.375rem 1.5rem',
        borderBottom: '0.5px solid var(--rule)',
        borderRight: '0.5px solid var(--rule)',
      }}
    >
      {/* skill name */}
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.6875rem',
        color: 'var(--text)',
        letterSpacing: '0.04em',
        marginBottom: '0',
      }}>
        {skill.name}
      </p>

      {/* progress bar */}
      <div className="skill-bar">
        <div
          ref={fillRef}
          className="skill-bar-fill"
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} — ${skill.level}%`}
          style={{
            transitionDelay: `${delay + 0.2}s`,
          }}
        />
      </div>

      {/* label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: 'var(--text-dim)',
        }}>
          {getLabel(skill.level)}
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          color: 'var(--text-dim)',
        }}>
          {skill.level}%
        </span>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="skills" style={{ borderTop: '0.5px solid var(--rule)' }}>

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
          // skills
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.14em',
          color: 'var(--text-dim)',
        }}>
          proficiency · self-assessed
        </span>
      </motion.div>

      {/* 3-column grid */}
      <div className="skills-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {[...SKILLS].sort((a, b) => b.level - a.level).map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 0.05} />
        ))}
      </div>

    </section>
  )
}

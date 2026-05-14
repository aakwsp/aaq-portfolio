import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
  name: string
  level: number          /* 0–100 */
  label: string
}

const SKILLS: Skill[] = [
  { name: 'typescript',       level: 90, label: 'advanced'     },
  { name: 'three.js / webgl', level: 75, label: 'proficient'   },
  { name: 'glsl shaders',     level: 65, label: 'proficient'   },
  { name: 'react / next.js',  level: 85, label: 'advanced'     },
  { name: 'rust',             level: 55, label: 'intermediate' },
  { name: 'linux / bash',     level: 80, label: 'advanced'     },
  { name: 'python',           level: 75, label: 'proficient'   },
  { name: 'c / c++',          level: 60, label: 'intermediate' },
  { name: 'git / devops',     level: 80, label: 'advanced'     },
  { name: 'sql / postgres',   level: 70, label: 'proficient'   },
  { name: 'docker / infra',   level: 65, label: 'proficient'   },
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
          {skill.label}
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 0.05} />
        ))}
      </div>

    </section>
  )
}

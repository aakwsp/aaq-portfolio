import { useEffect, useState } from 'react'

const SECTIONS = ['hero', 'projects', 'skills', 'work', 'contact'] as const
type Section = typeof SECTIONS[number]

export default function Nav() {
  const [active, setActive] = useState<Section>('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as Section)
        })
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="primary navigation"
      className="nav-links"
      style={{
        position: 'fixed',
        top: 36,
        left: 0,
        right: 0,
        zIndex: 199,
        height: 36,
        background: 'var(--bg)',
        borderBottom: '0.5px solid var(--rule)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.25rem',
        gap: '2rem',
      }}
    >
      {SECTIONS.filter(s => s !== 'hero').map((s) => (
        <a
          key={s}
          href={`#${s}`}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.5625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: active === s ? 'var(--text)' : 'var(--text-muted)',
            transition: 'color 120ms ease',
          }}
        >
          {s}
        </a>
      ))}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{ width: 3, height: 3, background: 'var(--text-dim)' }}
          />
        ))}
      </div>
    </nav>
  )
}

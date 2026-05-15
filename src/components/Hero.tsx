/* pastel top 3, warm beige on the bottom */
const QUAD_COLORS = ['#f2bdc9', '#b8c8f0', '#b8dcc8', '#c8c0a8'] as const

const LINKS = [
  { label: 'github',   href: 'https://github.com/aakwsp',                  display: 'aakwsp' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/moshi-moshiri/', display: 'moshi-moshiri' },
  { label: 'contact',  href: 'mailto:career@aakwsp.xyz',                   display: 'career@aakwsp.xyz' },
]

const mono: React.CSSProperties = { fontFamily: "'Space Mono', monospace" }
const serif: React.CSSProperties = { fontFamily: "'DM Serif Display', Georgia, serif" }

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', paddingTop: 72, overflow: 'hidden', background: 'var(--bg)' }}
    >
      {/* hero grid: color bar | left | right */}
      <div
        className="hero-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '4px 1fr 1fr',
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        {/* ── color bar ───────────────────────────────── */}
        <div
          aria-hidden="true"
          className="hero-color-bar"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
            margin: '10% 0',
          }}
        >
          {QUAD_COLORS.map((c) => (
            <span key={c} style={{ flex: 1, background: c, display: 'block' }} />
          ))}
        </div>

        {/* ── left column ─────────────────────────────── */}
        <div
          className="hero-left"
          style={{
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem) clamp(2.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3.5rem)',
            borderRight: '0.5px solid var(--rule)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* eyebrow */}
          <p style={{
            ...mono,
            fontSize: '0.5625rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '1.75rem',
          }}>
            // software engineer · 2026
          </p>

          {/* headline */}
          <h1 style={{
            ...serif,
            fontSize: 'clamp(2.5rem, 6.5vw, 5.25rem)',
            lineHeight: 1.05,
            color: 'var(--text)',
            fontWeight: 400,
            marginBottom: '2rem',
            letterSpacing: '-0.01em',
          }}>
            i make things i'd<br />want to use.
          </h1>

          {/* body copy */}
          <p style={{
            ...mono,
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            lineHeight: 1.95,
            maxWidth: '36ch',
            marginBottom: '2.75rem',
          }}>
            building systems that breathe.<br />
            obsessed with the space between<br />
            good and exact.
          </p>

        </div>

        {/* ── right column ────────────────────────────── */}
        <div
          style={{
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* decorative kanji */}
          <div style={{ marginBottom: '3rem' }}>
            <div
              className="font-kanji"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                color: 'var(--text-dim)',
                lineHeight: 1,
                fontWeight: 200,
                letterSpacing: '0.06em',
                userSelect: 'none',
              }}
            >
              私の作品
            </div>
          </div>

          {/* link rows */}
          <div>
            {LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="hero-link"
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                style={{
                  ...mono,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 0',
                  borderBottom: i < LINKS.length - 1 ? '0.5px solid var(--rule)' : 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.6875rem',
                  transition: 'color 120ms ease',
                }}
              >
                <div style={{ width: 6, height: 6, background: 'var(--text)', flexShrink: 0 }} />

                {/* label */}
                <span style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  fontSize: '0.5rem',
                  color: 'var(--text-dim)',
                  minWidth: '5rem',
                  flexShrink: 0,
                }}>
                  {link.label}
                </span>

                <div style={{ flex: 1 }} />

                {/* value */}
                <span>{link.display}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

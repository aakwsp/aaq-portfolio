export default function Bottombar() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '0.5px solid var(--rule)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.25rem',
        height: 36,
        gap: '0.875rem',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5625rem',
        letterSpacing: '0.12em',
      }}
    >
      <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        aakwsp // moshi · {year}
      </span>

      <div style={{ flex: 1, height: '0.5px', background: 'var(--rule)' }} />

      <span
        aria-hidden="true"
        style={{
          color: 'var(--text-dim)',
          fontSize: '0.5625rem',
          flexShrink: 0,
          letterSpacing: '0.3em',
        }}
      >
        ✦
      </span>
    </footer>
  )
}

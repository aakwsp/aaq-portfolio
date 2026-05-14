import { useState, useCallback } from 'react'

export default function Topbar() {
  const [spinning, setSpinning] = useState(false)

  const handleDiamond = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setTimeout(() => setSpinning(false), 560)
  }, [spinning])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 36,
        background: 'var(--text)',
        borderBottom: '0.5px solid var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.25rem',
        gap: '0.875rem',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.5625rem',
        letterSpacing: '0.14em',
      }}
    >
      <span style={{ color: 'var(--bg)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        designed by aakwsp // moshi
      </span>

      <div style={{ flex: 1, height: '0.5px', background: 'var(--bg-card)' }} />

      <button
        onClick={handleDiamond}
        aria-label="spin"
        style={{
          appearance: 'none',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: 16,
          height: 16,
        }}
      >
        <div
          className={spinning ? 'diamond-spin' : ''}
          style={{
            width: 8,
            height: 8,
            background: 'var(--bg)',
            transform: 'rotate(45deg)',
            flexShrink: 0,
          }}
        />
      </button>
    </header>
  )
}

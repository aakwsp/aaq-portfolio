import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Card {
  label: string
  value: string
  href?: string
  copy?: string
}

const CARDS: Card[] = [
  { label: 'email',    value: 'career@aakwsp.xyz',             copy: 'career@aakwsp.xyz' },
  { label: 'github',   value: 'github.com/aakwsp',             href: 'https://github.com/aakwsp' },
  { label: 'discord',  value: 'aakwsp',                         copy: 'aakwsp' },
  { label: 'linkedin', value: 'linkedin.com/in/moshi-moshiri', href: 'https://www.linkedin.com/in/moshi-moshiri/' },
  { label: 'location', value: 'ontario, canada' },
]

function ContactCard({ card, delay }: { card: Card; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    if (!card.copy) return
    navigator.clipboard.writeText(card.copy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  const isLink     = !!card.href
  const isCopy     = !!card.copy
  const isInteractive = isLink || isCopy

  const inner = (
    <div
      style={{
        padding: '1.5rem',
        borderRight: '0.5px solid var(--rule)',
        borderBottom: '0.5px solid var(--rule)',
        transition: 'background 0.15s ease',
        cursor: isInteractive ? (isCopy ? 'copy' : 'pointer') : 'default',
      }}
      className={isInteractive ? 'contact-card' : ''}
    >
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.4375rem',
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: 'var(--text-dim)',
        marginBottom: '0.625rem',
      }}>
        {copied ? '// copied.' : card.label}
      </p>
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.75rem',
        color: copied ? 'var(--text-muted)' : 'var(--text)',
        letterSpacing: '0.03em',
        wordBreak: 'break-all',
        transition: 'color 0.15s ease',
      }}>
        {card.value}
      </p>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {isLink ? (
        <a
          href={card.href}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block', color: 'inherit' }}
        >
          {inner}
        </a>
      ) : isCopy ? (
        <button
          onClick={handleCopy}
          style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, color: 'inherit', textAlign: 'left' }}
        >
          {inner}
        </button>
      ) : inner}
    </motion.div>
  )
}

export default function Contact() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="contact" style={{ borderTop: '0.5px solid var(--rule)' }}>

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
          // contact
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.5rem',
          letterSpacing: '0.14em',
          color: 'var(--text-dim)',
        }}>
          open to opportunities
        </span>
      </motion.div>

      {/* 2-column grid */}
      <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}>
        {CARDS.map((card, i) => (
          <ContactCard key={card.label} card={card} delay={i * 0.06} />
        ))}
      </div>

    </section>
  )
}

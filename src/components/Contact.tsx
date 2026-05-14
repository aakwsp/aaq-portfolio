import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  { label: 'email',     value: 'career@aakwsp.xyz',                   href: 'mailto:career@aakwsp.xyz' },
  { label: 'github',    value: 'github.com/aakwsp',                    href: 'https://github.com/aakwsp' },
  { label: 'discord',   value: 'aakwsp',                               href: '#' },
  { label: 'linkedin',  value: 'linkedin.com/in/moshi-moshiri',        href: 'https://www.linkedin.com/in/moshi-moshiri/' },
  { label: 'twitter/x', value: '@aakwsp',                              href: '#' },
  { label: 'location',  value: 'canada',                               href: undefined },
] as const

function ContactCard({ card, delay }: { card: typeof CARDS[number]; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const inner = (
    <div
      style={{
        padding: '1.5rem',
        borderRight: '0.5px solid var(--rule)',
        borderBottom: '0.5px solid var(--rule)',
        transition: 'background 0.15s ease',
      }}
      className={card.href && card.href !== '#' ? 'contact-card' : ''}
    >
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.4375rem',
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: 'var(--text-dim)',
        marginBottom: '0.625rem',
      }}>
        {card.label}
      </p>
      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.75rem',
        color: 'var(--text)',
        letterSpacing: '0.03em',
        wordBreak: 'break-all',
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
      {card.href && card.href !== '#' ? (
        <a
          href={card.href}
          target={card.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
          style={{ display: 'block', color: 'inherit' }}
        >
          {inner}
        </a>
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
      <div style={{
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

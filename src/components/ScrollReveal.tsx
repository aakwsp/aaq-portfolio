import { motion, useReducedMotion } from 'framer-motion'
import type { BezierDefinition } from 'framer-motion'

const EXPO_OUT: BezierDefinition = [0.16, 1, 0.3, 1]

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EXPO_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

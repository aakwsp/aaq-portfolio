import { useEffect, useRef } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    return () => { cancelAnimationFrame(rafRef.current) }
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const { left, top } = cardRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      cardRef.current?.style.setProperty('--mouse-x', `${x}px`)
      cardRef.current?.style.setProperty('--mouse-y', `${y}px`)
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}

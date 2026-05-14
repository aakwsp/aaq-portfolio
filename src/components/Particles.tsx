import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function StarField() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="starfield"
      className="fixed inset-0 -z-10"
      options={{
        background: { color: { value: '#020408' } },
        fpsLimit: 60,
        particles: {
          number: { value: 120, density: { enable: true } },
          color: { value: ['#ffffff', '#a5b4fc', '#7dd3fc'] },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: { enable: true, speed: 0.5, sync: false },
          },
          size: {
            value: { min: 0.5, max: 2 },
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            random: true,
            outModes: { default: 'out' },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

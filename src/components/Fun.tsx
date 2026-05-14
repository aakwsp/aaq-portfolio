import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// ── Row 1: Glass halo ─────────────────────────────────────
function ShaderRow() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = 5.5

    // gradient background via canvas texture
    const bgCanvas = document.createElement('canvas')
    bgCanvas.width = 512; bgCanvas.height = 512
    const ctx = bgCanvas.getContext('2d')!
    const grad = ctx.createRadialGradient(380, 100, 10, 256, 256, 400)
    grad.addColorStop(0,   '#c8aaff')
    grad.addColorStop(0.2, '#7733ee')
    grad.addColorStop(0.6, '#5522cc')
    grad.addColorStop(1,   '#280a78')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)
    scene.background = new THREE.CanvasTexture(bgCanvas)

    // glass torus knot
    const geo = new THREE.TorusKnotGeometry(1.15, 0.38, 256, 48, 2, 3)
    const mat = new THREE.MeshPhysicalMaterial({
      color:        new THREE.Color(0xaa88ff),
      transmission: 0.94,
      thickness:    1.8,
      roughness:    0.04,
      metalness:    0,
      ior:          1.85,
      transparent:  true,
      side:         THREE.DoubleSide,
      envMapIntensity: 0.8,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // key light — warm white, upper right (matches the hotspot in the reference)
    const key = new THREE.PointLight(0xfff0ff, 120, 30)
    key.position.set(5, 5, 4)
    scene.add(key)

    // fill — soft purple from lower left
    const fill = new THREE.PointLight(0x8833ff, 30, 20)
    fill.position.set(-4, -3, 2)
    scene.add(fill)

    // ambient — purple tint
    scene.add(new THREE.AmbientLight(0x9966ff, 2.5))

    let raf: number
    const start = performance.now()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = (performance.now() - start) / 1000
      mesh.rotation.x = t * 0.18
      mesh.rotation.y = t * 0.28
      renderer.render(scene, camera)
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas); resize(); animate()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
}

// ── Rows 2+3: Physics sandbox ─────────────────────────────
const PHYSICS_SHAPES = [
  { geo: () => new THREE.CylinderGeometry(0.8, 0.8, 1.8, 3),          r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.ConeGeometry(0.9, 2.0, 4),                    r: 1.4, color: 0x8a7e8e },
  { geo: () => new THREE.CylinderGeometry(0.8, 0.8, 1.8, 5),          r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.TorusKnotGeometry(0.8, 0.25, 100, 12, 2, 3), r: 1.5, color: 0x8a7e8e },
  { geo: () => new THREE.ConeGeometry(0.9, 2.0, 3),                    r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.DodecahedronGeometry(1.2),                    r: 1.5, color: 0x8a7e8e },
  { geo: () => new THREE.CylinderGeometry(0.8, 0.8, 1.8, 6),          r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.IcosahedronGeometry(1.2, 1),                  r: 1.5, color: 0x8a7e8e },
  { geo: () => new THREE.BoxGeometry(1.3, 1.3, 1.3),                   r: 1.4, color: 0xd8cab8 },
  { geo: () => new THREE.TorusKnotGeometry(0.8, 0.22, 80, 10, 3, 5),  r: 1.5, color: 0x8a7e8e },
  { geo: () => new THREE.ConeGeometry(0.9, 2.0, 6),                    r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.TorusGeometry(1.0, 0.18, 20, 56),             r: 1.4, color: 0x8a7e8e },
  { geo: () => new THREE.CylinderGeometry(0.8, 0, 1.8, 4),            r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.OctahedronGeometry(1.3),                      r: 1.4, color: 0x8a7e8e },
  { geo: () => new THREE.ConeGeometry(0.9, 2.0, 8),                    r: 1.3, color: 0xd8cab8 },
  { geo: () => new THREE.TorusKnotGeometry(0.8, 0.20, 80, 10, 4, 3),  r: 1.5, color: 0x8a7e8e },
]

function PhysicsRow() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setClearColor(0x141216, 1)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const world = { w: 14, h: 7 }
    const camera = new THREE.OrthographicCamera(-world.w, world.w, world.h, -world.h, 0.1, 100)
    camera.position.z = 20

    type Body = {
      mesh: THREE.Mesh
      vel: { x: number; y: number }
      radius: number
      rotSpd: [number, number, number]
    }

    const rng = (a: number, b: number) => a + Math.random() * (b - a)

    const bodies: Body[] = PHYSICS_SHAPES.map(({ geo, r, color }) => {
      const mesh = new THREE.Mesh(
        geo(),
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.7 })
      )
      mesh.position.set(rng(-world.w * 0.8, world.w * 0.8), rng(-world.h * 0.8, world.h * 0.8), rng(-1, 1))
      scene.add(mesh)
      return {
        mesh,
        vel: { x: rng(-0.04, 0.04), y: rng(-0.04, 0.04) },
        radius: r,
        rotSpd: [rng(0.003, 0.009), rng(0.003, 0.009), rng(0.001, 0.005)],
      }
    })

    let dragging: Body | null = null
    let prevMouse = { x: 0, y: 0 }
    let dragVel   = { x: 0, y: 0 }

    const toWorld = (cx: number, cy: number) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: ((cx - rect.left) / rect.width  * 2 - 1) * world.w,
        y: (1 - (cy - rect.top) / rect.height * 2)  * world.h,
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      const m = toWorld(e.clientX, e.clientY)
      let best: Body | null = null, bestDist = Infinity
      for (const b of bodies) {
        const dx = b.mesh.position.x - m.x, dy = b.mesh.position.y - m.y
        const d = Math.sqrt(dx*dx + dy*dy)
        if (d < b.radius * 1.6 && d < bestDist) { bestDist = d; best = b }
      }
      if (best) { dragging = best; best.vel = { x: 0, y: 0 }; prevMouse = m }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      const m = toWorld(e.clientX, e.clientY)
      dragVel = { x: m.x - prevMouse.x, y: m.y - prevMouse.y }
      dragging.mesh.position.x = m.x
      dragging.mesh.position.y = m.y
      prevMouse = m
    }

    const onMouseUp = () => {
      if (dragging) { dragging.vel = { x: dragVel.x * 0.9, y: dragVel.y * 0.9 }; dragging = null }
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)

      for (const b of bodies) {
        b.mesh.rotation.x += b.rotSpd[0]
        b.mesh.rotation.y += b.rotSpd[1]
        b.mesh.rotation.z += b.rotSpd[2]
        if (b === dragging) continue

        b.vel.x *= 0.985; b.vel.y *= 0.985
        b.mesh.position.x += b.vel.x
        b.mesh.position.y += b.vel.y

        const { x, y } = b.mesh.position
        if (x + b.radius > world.w)  { b.mesh.position.x = world.w  - b.radius; b.vel.x *= -0.75 }
        if (x - b.radius < -world.w) { b.mesh.position.x = -world.w + b.radius; b.vel.x *= -0.75 }
        if (y + b.radius > world.h)  { b.mesh.position.y = world.h  - b.radius; b.vel.y *= -0.75 }
        if (y - b.radius < -world.h) { b.mesh.position.y = -world.h + b.radius; b.vel.y *= -0.75 }
      }

      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j]
          const dx = b.mesh.position.x - a.mesh.position.x
          const dy = b.mesh.position.y - a.mesh.position.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          const min  = a.radius + b.radius
          if (dist < min && dist > 0.001) {
            const nx = dx / dist, ny = dy / dist
            const overlap = (min - dist) / 2
            if (a !== dragging) { a.mesh.position.x -= nx * overlap; a.mesh.position.y -= ny * overlap }
            if (b !== dragging) { b.mesh.position.x += nx * overlap; b.mesh.position.y += ny * overlap }
            const dvx = a.vel.x - b.vel.x, dvy = a.vel.y - b.vel.y
            const dot = dvx * nx + dvy * ny
            if (dot > 0) {
              const imp = dot * 0.85
              if (a !== dragging) { a.vel.x -= imp * nx; a.vel.y -= imp * ny }
              if (b !== dragging) { b.vel.x += imp * nx; b.vel.y += imp * ny }
            }
          }
        }
      }

      renderer.render(scene, camera)
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      renderer.setSize(width, height, false)
      const a = width / height
      world.w = 7 * a; world.h = 7
      camera.left = -world.w; camera.right = world.w
      camera.top  =  world.h; camera.bottom = -world.h
      camera.updateProjectionMatrix()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas); resize(); animate()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      bodies.forEach(({ mesh }) => { mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose() })
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
    />
  )
}

// ── Section ───────────────────────────────────────────────

export default function Fun() {
  return (
    <motion.section
      id="fun"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '0.5px solid var(--rule)' }}
    >
      {/* header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 1.5rem', borderBottom: '0.5px solid var(--rule)',
        fontFamily: "'Space Mono', monospace",
      }}>
        <span style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
          // fun
        </span>
        <span style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'var(--text-dim)' }}>
          shaders · physics
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '70vh' }}>
        <div style={{ borderRight: '0.5px solid var(--rule)', overflow: 'hidden' }}>
          <ShaderRow />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <PhysicsRow />
        </div>
      </div>
    </motion.section>
  )
}

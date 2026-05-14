import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vert = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const frag = /* glsl */`
  uniform float uTime;
  uniform vec2  uRes;
  varying vec2  vUv;

  /* ── Simplex 2D ─────────────────────────── */
  vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
  }
  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
     -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy  -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(
      dot(x0,      x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m * m * m * m;
    vec3 x   = 2.0 * fract(p * C.www) - 1.0;
    vec3 h   = abs(x) - 0.5;
    vec3 ox  = floor(x + 0.5);
    vec3 a0  = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* ── FBM ───────────────────────────────── */
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p  = p * 2.1 + vec2(3.1, 1.7);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = vUv;
    st.x *= uRes.x / uRes.y;
    st   *= 1.8;

    float t = uTime * 0.055;

    /* domain warp — two passes */
    vec2 q = vec2(
      fbm(st + t),
      fbm(st + vec2(5.2, 1.3) + t)
    );
    vec2 r = vec2(
      fbm(st + 2.0 * q + vec2(1.7, 9.2) + 0.7 * t),
      fbm(st + 2.0 * q + vec2(8.3, 2.8) + 0.7 * t)
    );
    float f = fbm(st + 2.4 * r + 0.45 * t);
    f = f * 0.5 + 0.5; /* → [0, 1] */

    vec3 dark  = vec3(0.051, 0.051, 0.043);   /* #0d0d0b */
    vec3 warm  = vec3(0.135, 0.125, 0.100);   /* soft dark gold */
    vec3 beige = vec3(0.784, 0.753, 0.659);   /* #c8c0a8 */

    vec3 col = dark;
    col = mix(col, warm,  smoothstep(0.30, 0.60, f));
    col = mix(col, beige, smoothstep(0.68, 0.88, f) * 0.22);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function HeroShader() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(wrap.clientWidth, wrap.clientHeight)
    wrap.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      uTime: { value: 0 },
      uRes:  { value: new THREE.Vector2(wrap.clientWidth, wrap.clientHeight) },
    }

    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms })
    scene.add(new THREE.Mesh(geo, mat))

    const clock = new THREE.Clock()
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    tick()

    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth, h = wrap.clientHeight
      renderer.setSize(w, h)
      uniforms.uRes.value.set(w, h)
    })
    ro.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
    />
  )
}

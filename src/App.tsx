import { useState, useEffect } from 'react'
import Topbar    from './components/Topbar'
import Nav       from './components/Nav'
import Hero      from './components/Hero'
import Projects  from './components/Projects'
import Skills    from './components/Skills'
import Work      from './components/Work'
import Contact   from './components/Contact'
import Bottombar from './components/Bottombar'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'beige'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'beige' : 'dark')

  return (
    <>
      <a
        href="#hero"
        style={{
          position: 'fixed',
          top: -100,
          left: '1rem',
          padding: '0.375rem 0.75rem',
          background: 'var(--bg)',
          color: 'var(--text)',
          border: '0.5px solid var(--rule)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6875rem',
          zIndex: 9999,
          transition: 'top 150ms ease',
        }}
        onFocus={(e) => (e.currentTarget.style.top = '1rem')}
        onBlur={(e)  => (e.currentTarget.style.top = '-100px')}
      >
        skip to content
      </a>

      <Topbar onToggle={toggle} />
      <Nav />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Work />
        <Contact />
      </main>

      <Bottombar />
    </>
  )
}

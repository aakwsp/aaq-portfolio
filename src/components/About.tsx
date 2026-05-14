import ScrollReveal from './ScrollReveal'

const stack = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'HTML/CSS'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
  Tooling: ['Git', 'Vite', 'Linux', 'Figma'],
}

export default function About() {
  return (
    <section id="about" className="px-6 sm:px-10 lg:px-20 py-32">

      <ScrollReveal>
        <div className="section-rule mb-14">
          <h2 className="text-xs font-normal tracking-widest" style={{ color: 'var(--fg-3)' }}>
            // about
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-28 max-w-5xl">

        {/* bio + skills */}
        <div>
          <ScrollReveal delay={0.06}>
            <p
              className="text-sm mb-12"
              style={{ color: 'var(--fg-2)', lineHeight: '1.95', maxWidth: '58ch' }}
            >
              i'm moshi — a software engineer who cares deeply about the craft of building things.
              interfaces, systems, the small decisions that make a product feel right.
              currently self-directed: building, learning, and shipping.
            </p>
          </ScrollReveal>

          {/* redacted skills */}
          <ScrollReveal delay={0.12}>
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
              <p className="text-xs tracking-widest mb-5" style={{ color: 'var(--fg-3)' }}>
                // skills
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  'Advanced TypeScript Patterns',
                  'System Design & Architecture',
                  'Performance Engineering',
                  'Technical Leadership',
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <span
                      className="text-sm px-1.5 py-px"
                      style={{
                        background: 'var(--fg-4)',
                        color: 'transparent',
                        userSelect: 'none',
                        minWidth: `${skill.length * 0.58}em`,
                      }}
                      aria-hidden="true"
                    >
                      {skill}
                    </span>
                  </div>
                ))}
                <p className="text-xs mt-3 tracking-wider" style={{ color: 'var(--fg-3)' }}>
                  // [REDACTED] — not yet public
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* stack */}
        <ScrollReveal delay={0.18}>
          <div className="flex flex-col gap-9">
            {Object.entries(stack).map(([category, items]) => (
              <div key={category}>
                <div className="section-rule mb-3">
                  <p className="text-xs tracking-widest" style={{ color: 'var(--fg-3)' }}>
                    ./{category.toLowerCase()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

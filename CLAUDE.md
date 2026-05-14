# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start vite dev server (hot reload)
npm run build     # tsc type-check then vite build → dist/
npm run preview   # preview the production build locally
```

No test suite exists yet.

## Stack

- **React 19** + **TypeScript** via Vite (SWC plugin)
- **Tailwind CSS v4** — configured as a Vite plugin (`@tailwindcss/vite`), no `tailwind.config.*` file; utility classes are used directly in JSX
- **Framer Motion** — available for animation (imported but not yet heavily used)
- **tsparticles** (`@tsparticles/react` + `@tsparticles/slim`) — used in `Particles.tsx` for an optional starfield effect (currently not mounted in `App.tsx`)

## Architecture

The app is a single-page portfolio with a fixed full-screen background and scrollable sections. Entry point is `src/main.tsx` → `src/App.tsx`.

**Background layer** — `Aurora.tsx` renders four blurred radial-gradient blobs (`.aurora-blob` CSS classes in `index.css`) fixed behind everything (`-z-10`, `bg-[#06040f]`). `Particles.tsx` (StarField) is an alternative/additive starfield background using tsparticles; it is built but not currently mounted.

**Nav** — `Nav.tsx` is a fixed top bar styled as a floating glass pill: `backdrop-blur-2xl`, `bg-white/[0.06]`, `border-white/15` with an inset highlight shadow. Links scroll to `#about`, `#work`, `#contact` anchors.

**Hero** — `Hero.tsx` is the landing section. Uses a blinking `cursor` CSS animation (defined in `index.css`) on the name. CTA buttons use the same liquid-glass treatment as the nav.

**Placeholder sections** — `#about`, `#work`, `#contact` are stub `<section>` elements in `App.tsx`, each `min-h-screen`, ready to receive components.

## Design system

- Font stack: Maple Mono NF → JetBrains Mono → Fira Code (monospace throughout)
- Color palette: near-black `#06040f` base; purple `#6d28d9`, cyan `#0e7490`, indigo `#4f46e5`, teal `#0f766e` aurora accents; `indigo-300/400` for interactive highlights
- All glass surfaces follow the pattern: `border border-white/15 bg-white/[0.06..0.12] backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]`
- Text uses fractional opacity (`text-white/90`, `/70`, `/50`, `/35`) for hierarchy; never hard white except headings
- Comment-style labels use `// slug` or `./slug` convention (matches the monospace/terminal aesthetic)

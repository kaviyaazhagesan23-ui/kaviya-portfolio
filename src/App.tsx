import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { CursorGlow } from './components/CursorGlow'
import { Education } from './components/Education'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { JDAnalyzer } from './components/JDAnalyzer'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { resolveProfile, type ProfileOverride } from './config/profiles'
import { DEFAULT_ROLE, parseRole, writeRoleToUrl, type RoleId } from './lib/role'

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [role, setRole] = useState<RoleId>(() => parseRole(window.location.search))
  const [override, setOverride] = useState<ProfileOverride | null>(null)
  const [loading, setLoading] = useState(() => !prefersReduced())
  const [showBackTop, setShowBackTop] = useState(false)
  const showTools = new URLSearchParams(window.location.search).get('tools') === 'jd'

  useEffect(() => {
    if (!loading) return
    const t = window.setTimeout(() => setLoading(false), 1500)
    return () => window.clearTimeout(t)
  }, [loading])

  useEffect(() => {
    const onPop = () => { setRole(parseRole(window.location.search)); setOverride(null) }
    const onScroll = () => setShowBackTop(window.scrollY > 700)
    window.addEventListener('popstate', onPop)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('scroll', onScroll) }
  }, [])

  const profile = useMemo(() => resolveProfile(role, override), [role, override])

  const changeRole = useCallback((r: RoleId) => { setRole(r); setOverride(null); writeRoleToUrl(r) }, [])
  const reset = useCallback(() => changeRole(DEFAULT_ROLE), [changeRole])
  const apply = useCallback((o: ProfileOverride) => { setRole(o.baseRole); setOverride(o) }, [])

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <CursorGlow />
      <ScrollProgress />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[90] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
      <Nav />
      <main>
        <Hero profile={profile} />
        <About />
        <Skills profile={profile} />
        <Projects profile={profile} />
        <Achievements profile={profile} />
        <Education />
        <Contact />
        {showTools && <JDAnalyzer active={override} onApply={apply} onReset={reset} />}
      </main>
      <Footer />
      {showBackTop && (
        <a href="#home" aria-label="Back to top" className="fixed bottom-5 right-5 z-40 btn btn-primary !px-4 shadow-lg">↑</a>
      )}
    </>
  )
}

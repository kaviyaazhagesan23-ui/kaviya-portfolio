import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'
import { site } from '../config/site'
import type { Profile } from '../config/profiles'
import { useFinePointer } from '../hooks/useMedia'
import { ResumeButton } from './ResumeButton'



interface Props {
  profile: Profile
}
export function Hero({ profile }: Props) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const on = fine && !reduce // pointer + scroll parallax only on desktop without reduced motion

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 20 })
  const sy = useSpring(my, { stiffness: 90, damping: 20 })
  const photoX = useTransform(sx, [-1, 1], [-6, 6])
  const photoY = useTransform(sy, [-1, 1], [-6, 6])
  const lineX = useTransform(sx, [-1, 1], [10, -10])
  const lineY = useTransform(sy, [-1, 1], [10, -10])
  const driftX = useTransform(sx, [-1, 1], [-16, 16])
  const { scrollY } = useScroll()
  const lift = useTransform(scrollY, [0, 700], [0, -36])

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!on) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  const words = profile.headline.split(' ')
  const after = 0.1 + words.length * 0.07
  const fadeUp = (d: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 20 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: Math.max(0, after + d), ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  })

  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40" onMouseMove={onMove} aria-label="Introduction">
      <motion.span aria-hidden="true" style={on ? { x: driftX } : undefined} className="hidden sm:block absolute right-[6%] top-28">
        <span className="float-slow block h-16 w-16 rounded-full border border-accent/40" />
      </motion.span>
      <span aria-hidden="true" className="float-slower hidden sm:block absolute left-[46%] bottom-10 h-3 w-3 rounded-full bg-accent/60" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p className="eyebrow" {...fadeUp(-0.4)}>{site.roleLabel} · {site.location}</motion.p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mt-5" aria-label={profile.headline}>
            {words.map((w, i) => (
              <span key={`${profile.id}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="mt-7 max-w-xl text-lg text-muted leading-relaxed" {...fadeUp(0)}>{profile.summary}</motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" {...fadeUp(0.12)}>
            <a href="#projects" className="btn btn-primary">{profile.cta}</a>
            <a href="#contact" className="btn btn-ghost">Contact me</a>
            <ResumeButton />
          </motion.div>
          
        </div>

        <motion.div style={on ? { y: lift } : undefined} className="mx-auto w-full max-w-sm px-5 py-5" {...(reduce ? {} : { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, delay: 0.3 } })}>
          <div className="portrait">
            <motion.div aria-hidden="true" className="portrait-outline" style={on ? { x: lineX, y: lineY } : undefined} />
            <motion.div aria-hidden="true" className="portrait-outline alt" style={on ? { x: photoX, y: photoY } : undefined} />
            <motion.div className="portrait-photo" style={on ? { x: photoX, y: photoY } : undefined}>
              <img src={site.photo} alt="Portrait of Kaviya A. in a black blazer" width={800} height={1000} fetchPriority="high" />
              <span className="portrait-sheen" aria-hidden="true" />
            </motion.div>
            <span className="portrait-chip float-slow">AI/ML · SRMIST</span>
            <span className="portrait-dot float-slower" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

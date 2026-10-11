import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/** Thin accent bar showing page scroll progress. Hidden with reduced motion. */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  if (reduce) return null
  return <motion.div aria-hidden="true" className="fixed top-0 left-0 right-0 z-[55] h-0.5 origin-left bg-accent" style={{ scaleX }} />
}

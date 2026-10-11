import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps { children: ReactNode; delay?: number; className?: string }

/** Scroll-triggered fade/slide. Content is fully visible when reduced motion is requested. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Section heading whose words rise into view one after another. */
export function RevealText({ text, className = 'h2' }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  return (
    <motion.h2
      className={className}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.06 }}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
          <motion.span className="inline-block" variants={{ hidden: { y: '110%' }, show: { y: 0 } }} transition={{ duration: 0.6, ease }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useFinePointer } from '../hooks/useMedia'

/** Subtle pointer-following ring. Disabled on touch devices and with reduced motion. */
export function CursorGlow() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e: MouseEvent) => { x.set(e.clientX - 14); y.set(e.clientY - 14) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-7 w-7 rounded-full border border-accent/70"
      style={{ x: sx, y: sy }}
    />
  )
}

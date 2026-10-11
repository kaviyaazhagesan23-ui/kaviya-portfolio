import { motion } from 'framer-motion'

/** Blur-to-sharp wordmark. The parent removes it after ~1.5s; it never blocks keyboard focus. */
export function Preloader() {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <span className="preload-word font-display text-5xl sm:text-7xl">
        KAVIYA<span className="text-accent">.</span>
      </span>
    </motion.div>
  )
}

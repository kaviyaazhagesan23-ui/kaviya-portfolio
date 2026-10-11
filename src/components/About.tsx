import { motion, useReducedMotion } from 'framer-motion'
import { useNarration } from '../hooks/useNarration'
import { site } from '../config/site'
import { Reveal, RevealText } from './Reveal'

export function About() {
  const reduce = useReducedMotion()
  const a = site.about
  const n = useNarration(site.narration)
  const label = n.state === 'speaking' ? `Speaking — sentence ${n.index + 1} of ${n.total}` : n.state === 'paused' ? 'Paused' : 'Ready'

  return (
    <section id="about" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex justify-center">
          <motion.div
            style={{ transformOrigin: 'top center' }}
            animate={reduce ? undefined : { rotate: [-2.5, 2.5] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <div className="badge-line" aria-hidden="true" />
            <div className="badge-clip" aria-hidden="true" />
            <div className="card w-64 p-4 -mt-1 shadow-lg">
              <img src={site.photo} alt="Kaviya A. ID badge photo" className="h-60 w-full rounded-xl object-cover object-[center_20%]" loading="lazy" />
              <p className="font-display text-2xl mt-4">{site.name}</p>
              <p className="text-sm text-muted">B.Tech CSE (AI &amp; ML)</p>
              <p className="text-xs text-muted mt-1">SRMIST · 2023–2027</p>
              <div className="mt-3 h-1.5 w-16 rounded bg-accent" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">About</p>
            <RevealText text="A student who likes to ship working things." />
          </Reveal>
          <Reveal delay={0.05}>
            <dl className="space-y-6 text-muted leading-relaxed">
              {([['Background', a.background], ['Interests', a.interests], ['Working style', a.workingStyle], ['Goals', a.goals]] as const).map(([k, v]) => (
                <div key={k}><dt className="text-ink font-semibold">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3" role="group" aria-label="Voice narration">
              <button type="button" className="btn btn-primary" onClick={n.play} disabled={!n.supported || n.state !== 'idle'}>▶ Play</button>
              <button type="button" className="btn btn-ghost" onClick={n.togglePause} disabled={!n.supported || n.state === 'idle'}>
                {n.state === 'paused' ? '▶ Resume' : '❚❚ Pause'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={n.stop} disabled={!n.supported || n.state === 'idle'}>■ Stop</button>
            </div>
            <p className="mt-3 text-sm text-muted" aria-live="polite">
              {n.supported ? label : "Voice narration isn't supported in this browser."}
              {n.supported && n.voiceName ? ` · Voice: ${n.voiceName}` : ''}
            </p>
            {n.supported && <p className="text-xs text-muted mt-1">Uses your browser's built-in voices; the sound quality depends on your browser and device.</p>}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

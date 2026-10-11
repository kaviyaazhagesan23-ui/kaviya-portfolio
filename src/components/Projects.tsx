import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PROJECTS, type Project } from '../config/projects'
import type { Profile } from '../config/profiles'
import { ProjectArt } from './ProjectArt'
import { Reveal, RevealText } from './Reveal'

function StatusTag({ p }: { p: Project }) {
  return <span className={`chip text-xs border tag-${p.status}`}>{p.status === 'implemented' ? 'Implemented' : 'Prototype'}</span>
}

function Links({ p }: { p: Project }) {
  if (!p.github && !p.demo) return <span className="text-xs text-muted">Repository / demo link not added yet.</span>
  return (
    <div className="flex gap-4 text-sm">
      {p.github && <a className="text-accent underline underline-offset-4" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
      {p.demo && <a className="text-accent underline underline-offset-4" href={p.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}
    </div>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-ink/50 p-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog" aria-modal="true" aria-label={p.name}
        className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
        initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div><h3 className="font-display text-3xl">{p.name}</h3><p className="text-muted mt-1">{p.title}</p></div>
          <button ref={closeRef} type="button" className="btn btn-ghost !py-2" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3"><StatusTag p={p} /><span className="text-sm text-muted">{p.statusNote}</span></div>
        <div className="mt-5"><ProjectArt id={p.id} /></div>
        <h4 className="mt-6 font-semibold">Problem</h4><p className="text-muted">{p.problem}</p>
        <h4 className="mt-5 font-semibold">My contribution</h4>
        <ul className="list-disc pl-5 text-muted space-y-1">{p.contribution.map((c) => <li key={c}>{c}</li>)}</ul>
        {p.metric && <p className="mt-5 text-sm"><strong>Reported result:</strong> {p.metric}</p>}
        <ul className="mt-5 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="chip text-xs">{t}</li>)}</ul>
        <div className="mt-6"><Links p={p} /></div>
      </motion.div>
    </motion.div>
  )
}

export function Projects({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState<Project | null>(null)
  const ordered = profile.projectOrder.map((id) => PROJECTS.find((p) => p.id === id)).filter((p): p is Project => Boolean(p))
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow">Projects</p><RevealText text="Selected work." /></Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {ordered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.2 }} className="card p-6 h-full flex flex-col hover:shadow-xl">
                <ProjectArt id={p.id} />
                <div className="mt-5 flex items-center gap-3"><StatusTag p={p} />{i === 0 && <span className="text-xs text-accent font-semibold"></span>}</div>
                <h3 className="font-display text-3xl mt-3">{p.name}</h3>
                <p className="text-sm text-muted mt-1">{p.title}</p>
                <p className="mt-3 text-muted">{p.problem}</p>
                {profile.projectFocus[p.id] && <p className="mt-3 text-sm text-ink border-l-2 border-accent pl-3">{profile.projectFocus[p.id]}</p>}
                <ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="chip text-xs">{t}</li>)}</ul>
                <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                  <button type="button" className="btn btn-primary !py-2" onClick={() => setOpen(p)}>View details</button>
                  <Links p={p} />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

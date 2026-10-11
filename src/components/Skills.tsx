import { motion } from 'framer-motion'
import { PROJECTS } from '../config/projects'
import { SKILL_CATEGORIES } from '../config/skills'
import type { Profile } from '../config/profiles'
import { Reveal, RevealText } from './Reveal'

const usedIn = (skill: string) =>
  PROJECTS.filter((p) => p.tech.concat(p.skills).some((t) => t.toLowerCase() === skill.toLowerCase())).map((p) => p.name)

export function Skills({ profile }: { profile: Profile }) {
  const cats = [...SKILL_CATEGORIES].sort((a, b) => profile.skillOrder.indexOf(a.id) - profile.skillOrder.indexOf(b.id))
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow">Skills</p><RevealText text="Tools I actually use." /></Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="card p-6 h-full hover:shadow-lg hover:border-accent/50 transition-shadow">
                <h3 className="font-display text-2xl">{c.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.items.map((s) => {
                    const where = usedIn(s)
                    return (
                      <li key={s} className="chip" title={where.length ? `Used in: ${where.join(', ')}` : 'Listed on resume'}>{s}</li>
                    )
                  })}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">No proficiency percentages are shown on purpose. Hover a skill to see which projects use it.</p>
      </div>
    </section>
  )
}

import { ACHIEVEMENTS } from '../config/achievements'
import type { Profile } from '../config/profiles'
import { Reveal, RevealText } from './Reveal'

export function Achievements({ profile }: { profile: Profile }) {
  const items = [...ACHIEVEMENTS].sort((a, b) => profile.achievementOrder.indexOf(a.id) - profile.achievementOrder.indexOf(b.id))
  return (
    <section id="achievements" className="section">
      <div className="container-x">
        <Reveal><p className="eyebrow">Achievements</p><RevealText text="Recognition &amp; leadership." /></Reveal>
        <ol className="grid gap-4 md:grid-cols-2">
          {items.map((a, i) => (
            <li key={a.id}>
              <Reveal delay={i * 0.05}>
                <div className={`card p-6 flex gap-5 ${a.highlight ? 'border-accent' : ''}`}>
                  <span className="font-display text-4xl text-accent/80 w-10 shrink-0" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">{a.title}</p>
                    <h3 className="font-display text-2xl">{a.org}</h3>
                    <p className="text-muted mt-1">{a.note}</p>
                    
{a.link && (
  <a
    href={a.link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-white transition-colors"
  >
    Read Published Paper <span aria-hidden="true">↗</span>
  </a>
)}

                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

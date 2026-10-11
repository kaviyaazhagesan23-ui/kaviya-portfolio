import { CERTIFICATIONS, EDUCATION, LANGUAGES } from '../config/achievements'
import { Reveal, RevealText } from './Reveal'

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal><p className="eyebrow">Education</p><RevealText text="Where I study." /></Reveal>
          <div className="space-y-4">
            {EDUCATION.map((e) => (
              <Reveal key={e.school}>
                <div className="card p-6">
                  <p className="text-sm text-accent font-semibold">{e.period}</p>
                  <h3 className="font-display text-2xl">{e.school}</h3>
                  <p className="text-muted">{e.degree}{e.place ? ` · ${e.place}` : ''}</p>
                  <p className="mt-2 font-semibold">{e.score}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Languages: {LANGUAGES.join(' · ')}</p>
        </div>
        <div>
          <Reveal><p className="eyebrow">Certifications</p><RevealText text="Courses completed." /></Reveal>
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 0.04}>
                  <div className="card px-5 py-4"><p className="font-semibold">{c.title}</p><p className="text-sm text-muted">{c.issuer}</p></div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

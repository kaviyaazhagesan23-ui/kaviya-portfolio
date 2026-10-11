import { useState } from 'react'
import { analyzeJobDescription, type Finding, type Report } from '../lib/jdAnalyzer'
import { PROFILES, type ProfileOverride } from '../config/profiles'
import { PROJECTS } from '../config/projects'

const SAMPLE = `ML Engineer Intern
- Build and evaluate machine learning models in Python using Pandas and scikit-learn.
- Develop REST APIs with FastAPI and connect them to a React dashboard.
- Experience with Docker and AWS is a plus. Knowledge of PyTorch preferred.`

interface Props { active: ProfileOverride | null; onApply: (o: ProfileOverride) => void; onReset: () => void }

function List({ title, items, tone }: { title: string; items: Finding[]; tone: string }) {
  return (
    <div className="card p-5">
      <h4 className={`font-semibold ${tone}`}>{title} ({items.length})</h4>
      {items.length === 0 ? <p className="text-sm text-muted mt-2">None found.</p> : (
        <ul className="mt-2 space-y-2 text-sm">
          {items.map((f) => <li key={f.entry.name}><strong>{f.entry.name}</strong> <span className="text-muted">— {f.entry.note}</span></li>)}
        </ul>
      )}
    </div>
  )
}

/** Private tool, shown only at /?tools=jd. Keyword matching only; not AI. */
export function JDAnalyzer({ active, onApply, onReset }: Props) {
  const [text, setText] = useState('')
  const [report, setReport] = useState<Report | null>(null)
  const nameOf = (id: string) => PROJECTS.find((p) => p.id === id)?.name ?? id

  return (
    <section id="jd-analyzer" className="section bg-card">
      <div className="container-x">
        <p className="eyebrow">Private tool</p>
        <h2 className="h2">Job description analyzer</h2>
        <p className="text-muted max-w-2xl mb-6">
          Deterministic keyword matching against a fixed skill catalog, run entirely in your browser. It is not AI. Skills that are not on your resume are reported as missing or partial and are never added to your portfolio.
        </p>
        <label htmlFor="jd-text" className="text-sm font-semibold">Paste a job description</label>
        <textarea id="jd-text" rows={9} className="field mt-1" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => setReport(analyzeJobDescription(text))}>Analyze</button>
          <button type="button" className="btn btn-ghost" onClick={() => { setText(SAMPLE); setReport(analyzeJobDescription(SAMPLE)) }}>Try sample</button>
          {active && <button type="button" className="btn btn-ghost" onClick={onReset}>Reset to default</button>}
        </div>

        {report && (report.empty ? <p className="mt-6 text-muted">Paste some text first.</p> : (
          <div className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <List title="Matched (verified)" items={report.matched} tone="text-emerald-800" />
              <List title="Partially supported" items={report.partial} tone="text-amber-800" />
              <List title="Missing (not on resume)" items={report.missing} tone="text-red-800" />
            </div>
            {report.responsibilities.length > 0 && (
              <div className="card p-5"><h4 className="font-semibold">Responsibilities detected</h4>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted">{report.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul></div>
            )}
            <div className="card p-5">
              <h4 className="font-semibold">Project recommendations</h4>
              <ul className="mt-2 space-y-3 text-sm">
                {report.recommendations.map((r) => (
                  <li key={r.project.id}><strong>{r.project.name}</strong> (score {r.score})
                    {r.reasons.length ? <ul className="list-disc pl-5 text-muted">{r.reasons.map((x) => <li key={x}>{x}</li>)}</ul> : <span className="text-muted"> — no verified overlap with this JD.</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5 border-accent">
              <h4 className="font-semibold">Proposed configuration (preview)</h4>
              <p className="text-sm text-muted mt-1">{report.roleReason}</p>
              <p className="text-sm mt-2">Base: <strong>{PROFILES[report.proposal.baseRole].label}</strong> · Project order: {report.proposal.projectOrder.map(nameOf).join(' → ')}</p>
              <button type="button" className="btn btn-primary mt-4" onClick={() => onApply(report.proposal)}>Apply to this view</button>
              <p className="text-xs text-muted mt-2">Applies only to this browser tab. Your master data is never changed; refresh or Reset to undo.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

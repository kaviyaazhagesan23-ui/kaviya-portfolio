import { useState, type FormEvent } from 'react'
import { site } from '../config/site'
import { Reveal, RevealText } from './Reveal'
import { ResumeButton } from './ResumeButton'

interface Errors { name?: string; email?: string; message?: string }

export function validate(v: { name: string; email: string; message: string }): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [opened, setOpened] = useState(false)

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`)
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const Err = ({ id, msg }: { id: string; msg?: string }) => (msg ? <p id={id} role="alert" className="text-sm text-red-700 mt-1">{msg}</p> : null)

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <RevealText text="Let's build something." />
          <ul className="space-y-3 text-lg">
            <li><a className="text-accent underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></li>
            {site.showPhone && <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>}
            {site.github && <li><a className="underline underline-offset-4 hover:text-accent" href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>}
            {site.linkedin && <li><a className="underline underline-offset-4 hover:text-accent" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>}
          </ul>
          <div className="mt-6"><ResumeButton /></div>
        </Reveal>
        <Reveal delay={0.08}>
          <form onSubmit={submit} noValidate className="card p-6 space-y-4" aria-label="Contact form">
            <div>
              <label htmlFor="c-name" className="text-sm font-semibold">Name</label>
              <input id="c-name" className="field mt-1" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby="e-name" autoComplete="name" />
              <Err id="e-name" msg={errors.name} />
            </div>
            <div>
              <label htmlFor="c-email" className="text-sm font-semibold">Email</label>
              <input id="c-email" type="email" className="field mt-1" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby="e-email" autoComplete="email" />
              <Err id="e-email" msg={errors.email} />
            </div>
            <div>
              <label htmlFor="c-msg" className="text-sm font-semibold">Message</label>
              <textarea id="c-msg" rows={5} className="field mt-1" value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby="e-msg" />
              <Err id="e-msg" msg={errors.message} />
            </div>
            <button type="submit" className="btn btn-primary">Open in my email app</button>
            <p className="text-xs text-muted" aria-live="polite">
              {opened ? 'Your email app should have opened with the message ready to send.' : 'This form does not send messages by itself; it opens your email app with the message filled in.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

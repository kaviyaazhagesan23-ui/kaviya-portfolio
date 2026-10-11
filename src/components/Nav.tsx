import { useState } from 'react'
import { site } from '../config/site'

const LINKS = [
  ['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
  ['Achievements', '#achievements'], ['Education', '#education'], ['Contact', '#contact'],
] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-xl">{site.shortName}<span className="text-accent">.</span></a>
        <nav aria-label="Primary" className="hidden lg:flex gap-7 text-sm">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="text-muted hover:text-accent transition-colors">{label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="lg:hidden btn btn-ghost !py-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="lg:hidden border-t border-line bg-paper">
          <ul className="container-x py-3">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block py-3 text-lg border-b border-line/60">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

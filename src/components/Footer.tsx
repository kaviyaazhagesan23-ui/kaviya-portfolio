import { site } from '../config/site'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} {site.name} All rights reserved.</p>
        <div className="flex gap-5">
          {site.github && <a className="hover:text-accent" href={site.github} target="_blank" rel="noreferrer">GitHub</a>}
          {site.linkedin && <a className="hover:text-accent" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          <a className="hover:text-accent" href={`mailto:${site.email}`}>Email</a>
        </div>
        <a href="#home" className="btn btn-ghost !py-2">↑ Back to top</a>
      </div>
    </footer>
  )
}

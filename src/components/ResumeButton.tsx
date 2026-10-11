import { site } from '../config/site'
import { useResumeAvailable } from '../hooks/useMedia'

export function ResumeButton({ className = '' }: { className?: string }) {
  const available = useResumeAvailable(site.resumeUrl)
  if (available) {
    return <a className={`btn btn-ghost ${className}`} href={site.resumeUrl} download>Download Resume</a>
  }
  return (
    <button type="button" disabled className={`btn btn-ghost opacity-60 cursor-not-allowed ${className}`} title="Add public/resume/RA2311026050229_KAVIYA_A_2026-27.pdf to enable">
      Resume (PDF not added yet)
    </button>
  )
}

import { useEffect, useState } from 'react'

/** True on devices with a mouse-like pointer. Used to disable cursor effects on touch. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

/** Checks the resume PDF exists (dev servers return HTML for missing files, so check the type). */
export function useResumeAvailable(url: string): boolean {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    let alive = true
    fetch(url, { method: 'HEAD' })
      .then((r) => alive && setOk(r.ok && (r.headers.get('content-type') ?? '').includes('pdf')))
      .catch(() => alive && setOk(false))
    return () => { alive = false }
  }, [url])
  return ok
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { loadVoices, pickVoice } from '../lib/voice'

export type NarrationState = 'idle' | 'speaking' | 'paused'
const GAP_MS = 320 // natural pause between sentences

/** Speaks lines one sentence at a time with Play / Pause / Resume / Stop and no overlapping speech. */
export function useNarration(lines: string[]) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
  const [state, setState] = useState<NarrationState>('idle')
  const [index, setIndex] = useState(0)
  const [voiceName, setVoiceName] = useState<string | null>(null)
  const runId = useRef(0)
  const timer = useRef<number | undefined>(undefined)
  const paused = useRef(false)
  const nextIndex = useRef(0)
  const voice = useRef<SpeechSynthesisVoice | null>(null)

  const speakFrom = useCallback((i: number, id: number) => {
    if (id !== runId.current) return
    if (i >= lines.length) { setState('idle'); setIndex(0); return }
    const u = new SpeechSynthesisUtterance(lines[i])
    if (voice.current) u.voice = voice.current
    u.lang = voice.current?.lang ?? 'en-US'
    u.rate = 0.95
    u.pitch = 1
    u.onstart = () => id === runId.current && setIndex(i)
    u.onend = () => {
      if (id !== runId.current) return
      nextIndex.current = i + 1
      if (paused.current) return
      timer.current = window.setTimeout(() => speakFrom(i + 1, id), GAP_MS)
    }
    u.onerror = (e) => {
      if (id !== runId.current || e.error === 'canceled' || e.error === 'interrupted') return
      runId.current++
      setState('idle')
    }
    window.speechSynthesis.speak(u)
  }, [lines])

  const stop = useCallback(() => {
    runId.current++
    window.clearTimeout(timer.current)
    paused.current = false
    if (supported) { window.speechSynthesis.cancel(); window.speechSynthesis.resume() }
    setState('idle')
    setIndex(0)
  }, [supported])

  const play = useCallback(async () => {
    if (!supported) return
    stop()
    const id = ++runId.current
    setState('speaking')
    const voices = await loadVoices()
    if (id !== runId.current) return
    voice.current = pickVoice(voices)
    setVoiceName(voice.current?.name ?? null)
    speakFrom(0, id)
  }, [supported, stop, speakFrom])

  const togglePause = useCallback(() => {
    if (!supported) return
    const id = runId.current
    if (state === 'speaking') {
      paused.current = true
      window.clearTimeout(timer.current)
      window.speechSynthesis.pause()
      setState('paused')
    } else if (state === 'paused') {
      paused.current = false
      window.speechSynthesis.resume()
      if (!window.speechSynthesis.speaking) speakFrom(nextIndex.current, id)
      setState('speaking')
    }
  }, [supported, state, speakFrom])

  useEffect(() => {
    window.addEventListener('beforeunload', stop)
    window.addEventListener('pagehide', stop)
    return () => { window.removeEventListener('beforeunload', stop); window.removeEventListener('pagehide', stop); stop() }
  }, [stop])

  return { supported, state, index, total: lines.length, voiceName, play, togglePause, stop }
}

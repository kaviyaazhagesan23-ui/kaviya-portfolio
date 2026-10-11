/** Chooses the most natural-sounding English voice the browser actually offers. */
export function scoreVoice(v: Pick<SpeechSynthesisVoice, 'name' | 'lang' | 'localService' | 'default'>): number {
  const name = v.name.toLowerCase()
  const lang = v.lang.toLowerCase().replace('_', '-')
  if (!/^en(-|$)/.test(lang)) return -Infinity
  let s = lang === 'en-in' ? 30 : lang === 'en-us' ? 26 : lang === 'en-gb' ? 22 : 10
  if (/natural|neural|online/.test(name)) s += 40
  if (/premium|enhanced/.test(name)) s += 35
  if (/google|microsoft|samantha|aria|jenny|neerja|zira|karen|daniel/.test(name)) s += 8
  if (!v.localService) s += 3
  if (/espeak|compact|novelty|zarvox|bells|bad news|whisper|albert|junior/.test(name)) s -= 60
  if (v.default) s += 2
  return s
}

export function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  let best: SpeechSynthesisVoice | null = null
  let bestScore = -Infinity
  for (const v of voices) {
    const s = scoreVoice(v)
    if (s > bestScore) { best = v; bestScore = s }
  }
  return best
}

/** Resolves once voices are available (they load asynchronously), or after a timeout with whatever exists. */
export function loadVoices(timeoutMs = 1500): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis
  return new Promise((resolve) => {
    const now = synth.getVoices()
    if (now.length) return resolve(now)
    const done = () => { synth.removeEventListener('voiceschanged', done); window.clearTimeout(t); resolve(synth.getVoices()) }
    const t = window.setTimeout(done, timeoutMs)
    synth.addEventListener('voiceschanged', done)
  })
}

import { describe, expect, it } from 'vitest'
import { pickVoice } from './voice'

const v = (name: string, lang: string, localService = true, def = false) =>
  ({ name, lang, localService, default: def, voiceURI: name }) as SpeechSynthesisVoice

describe('pickVoice', () => {
  it('prefers neural/natural English voices', () => {
    const picked = pickVoice([v('Basic Voice', 'en-US', true, true), v('Microsoft Neerja Online (Natural)', 'en-IN', false), v('Deutsch', 'de-DE')])
    expect(picked?.name).toContain('Neerja')
  })
  it('ignores non-English voices and returns null when none exist', () => {
    expect(pickVoice([v('Deutsch', 'de-DE')])).toBeNull()
    expect(pickVoice([])).toBeNull()
  })
  it('avoids robotic voices when alternatives exist', () => {
    expect(pickVoice([v('eSpeak English', 'en-US'), v('Google UK English Female', 'en-GB', false)])?.name).toContain('Google')
  })
})

import { describe, expect, it } from 'vitest'
import { analyzeJobDescription, findKeyword } from './jdAnalyzer'
import { parseRole } from './role'
import { resolveProfile } from '../config/profiles'

const SAMPLE = `We are hiring an ML Engineer.
- Build and deploy machine learning models using Python, Pandas and scikit-learn.
- Experience with Docker, AWS and PyTorch is required.
- Familiarity with TypeScript and React is a plus.
- Java developers welcome.`

describe('role parsing', () => {
  it('accepts valid roles', () => {
    expect(parseRole('?role=fullstack')).toBe('fullstack')
    expect(parseRole('?role=data')).toBe('data')
  })
  it('falls back safely for invalid or missing roles', () => {
    expect(parseRole('?role=banana')).toBe('ai-ml')
    expect(parseRole('')).toBe('ai-ml')
  })
})

describe('keyword matching', () => {
  it('does not match java inside javascript', () => {
    expect(findKeyword('We use JavaScript daily', ['java'])).toBeNull()
    expect(findKeyword('We use Java daily', ['java'])).toBe('java')
  })
  it('handles C++ and Node.js', () => {
    expect(findKeyword('Strong C++ skills', ['c++'])).toBe('c++')
    expect(findKeyword('Node.js backend', ['node.js'])).toBe('node.js')
  })
})

describe('JD analyzer honesty', () => {
  const report = analyzeJobDescription(SAMPLE)
  const names = (list: { entry: { name: string } }[]) => list.map((f) => f.entry.name)
  it('lists verified skills as matched', () => {
    expect(names(report.matched)).toEqual(expect.arrayContaining(['Python', 'Pandas', 'Scikit-learn', 'React', 'Machine learning']))
  })
  it('keeps TypeScript as partial, not matched', () => {
    expect(names(report.partial)).toContain('TypeScript')
    expect(names(report.matched)).not.toContain('TypeScript')
  })
  it('reports Docker, AWS, PyTorch, Java as missing', () => {
    expect(names(report.missing)).toEqual(expect.arrayContaining(['Docker', 'AWS', 'PyTorch', 'Java']))
  })
  it('never recommends a project because of a missing skill', () => {
    for (const r of report.recommendations) {
      expect(r.reasons.join(' ')).not.toMatch(/Docker|AWS|PyTorch|Java \(/)
    }
  })
  it('handles empty input', () => {
    expect(analyzeJobDescription('   ').empty).toBe(true)
  })
})

describe('profile override', () => {
  it('reorders projects without losing any', () => {
    const p = resolveProfile('ai-ml', { baseRole: 'data', projectOrder: ['visionedit'] })
    expect(p.projectOrder[0]).toBe('visionedit')
    expect(p.projectOrder).toHaveLength(4)
  })
})

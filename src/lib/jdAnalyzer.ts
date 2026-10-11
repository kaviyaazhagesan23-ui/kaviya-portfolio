/**
 * Deterministic job-description analyzer.
 * This is keyword matching against a fixed catalog, NOT machine learning. It never adds skills:
 * only terms present in the catalog are reported, and each is classified by the catalog's level.
 */
import { SKILL_CATALOG, type CatalogEntry } from './skillCatalog'
import { PROJECTS, type Project } from '../config/projects'
import { PROFILES, type ProfileOverride } from '../config/profiles'
import { DEFAULT_ROLE, ROLE_IDS, type RoleId } from './role'

export interface Finding { entry: CatalogEntry; keyword: string }
export interface Recommendation { project: Project; score: number; reasons: string[] }
export interface Report {
  empty: boolean
  matched: Finding[]
  partial: Finding[]
  missing: Finding[]
  responsibilities: string[]
  recommendations: Recommendation[]
  proposal: ProfileOverride
  roleReason: string
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function findKeyword(text: string, aliases: string[]): string | null {
  for (const alias of aliases) {
    const re = new RegExp(`(?<![a-z0-9+#])${escapeRegExp(alias)}(?![a-z0-9+#])`, 'i')
    if (re.test(text)) return alias
  }
  return null
}

const ACTION = /\b(build|develop|design|implement|analy[sz]e|deploy|maintain|collaborate|create|optimi[sz]e|monitor|train|evaluate|clean|visuali[sz]e|report|test)\w*/i

export function extractResponsibilities(text: string): string[] {
  return text
    .split(/\r?\n|(?<=[.;])\s+/)
    .map((l) => l.replace(/^[\s\-•*\d.)]+/, '').trim())
    .filter((l) => l.length >= 20 && l.length <= 220 && ACTION.test(l))
    .slice(0, 8)
}

export function analyzeJobDescription(
  text: string,
  projects: Project[] = PROJECTS,
  fallbackRole: RoleId = DEFAULT_ROLE,
): Report {
  const clean = text.trim()
  const empty: Report = {
    empty: true, matched: [], partial: [], missing: [], responsibilities: [], recommendations: [],
    proposal: { baseRole: fallbackRole, projectOrder: PROFILES[fallbackRole].projectOrder },
    roleReason: 'No job description provided.',
  }
  if (!clean) return empty

  const found: Finding[] = []
  for (const entry of SKILL_CATALOG) {
    const keyword = findKeyword(clean, entry.aliases)
    if (keyword) found.push({ entry, keyword })
  }
  const byLevel = (level: CatalogEntry['level']) => found.filter((f) => f.entry.level === level)
  const matched = byLevel('verified')
  const partial = byLevel('partial')
  const missing = byLevel('missing')

  const weight = (f: Finding) => (f.entry.level === 'verified' ? 2 : f.entry.level === 'partial' ? 1 : 0)

  // Closest role: overlap between found skills and each role's focus list.
  let baseRole = fallbackRole
  let best = -1
  let bestCount = 0
  for (const id of ROLE_IDS) {
    const focus = PROFILES[id].focusSkills
    const hits = found.filter((f) => focus.includes(f.entry.name))
    const score = hits.reduce((s, f) => s + weight(f), 0)
    if (score > best) { best = score; baseRole = id; bestCount = hits.length }
  }
  if (best <= 0) baseRole = fallbackRole
  const roleReason = best > 0
    ? `Closest role presentation: ${PROFILES[baseRole].label} (${bestCount} overlapping skill terms).`
    : `No role-specific skills detected, keeping ${PROFILES[baseRole].label}.`

  const baseOrder = PROFILES[baseRole].projectOrder
  const recommendations: Recommendation[] = projects
    .map((project) => {
      const reasons: string[] = []
      let score = 0
      for (const f of found) {
        if (f.entry.level !== 'missing' && project.skills.includes(f.entry.name)) {
          score += weight(f)
          reasons.push(`${f.entry.name} (${f.entry.level}) — "${f.keyword}" appears in the JD.`)
        }
      }
      return { project, score, reasons }
    })
    .sort((a, b) => b.score - a.score || baseOrder.indexOf(a.project.id) - baseOrder.indexOf(b.project.id))

  const ranked = recommendations.filter((r) => r.score > 0).map((r) => r.project.id)
  const projectOrder = [...ranked, ...baseOrder.filter((id) => !ranked.includes(id))]

  return {
    empty: false, matched, partial, missing,
    responsibilities: extractResponsibilities(clean),
    recommendations, proposal: { baseRole, projectOrder }, roleReason,
  }
}

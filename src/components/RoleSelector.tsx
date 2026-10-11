import { ROLE_IDS, type RoleId } from '../lib/role'
import { PROFILES } from '../config/profiles'

interface Props { active: RoleId; onChange: (role: RoleId) => void; tailored: boolean; onReset: () => void }

export function RoleSelector({ active, onChange, tailored, onReset }: Props) {
  return (
    <div role="group" aria-label="Choose portfolio focus" className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-muted mr-1">View as</span>
      {ROLE_IDS.map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={active === id && !tailored}
          onClick={() => onChange(id)}
          className={`chip transition-colors ${active === id ? 'border-ink bg-ink !text-paper' : 'hover:border-accent'}`}
        >
          {PROFILES[id].label}
        </button>
      ))}
      {tailored && (
        <button type="button" onClick={onReset} className="chip border-accent text-accent">Tailored view · Reset</button>
      )}
    </div>
  )
}

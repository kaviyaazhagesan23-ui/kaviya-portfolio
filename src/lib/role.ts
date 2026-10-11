export const ROLE_IDS = ['ai-ml', 'fullstack', 'data'] as const
export type RoleId = (typeof ROLE_IDS)[number]
export const DEFAULT_ROLE: RoleId = 'fullstack'

/** Reads ?role= from a query string. Unknown or missing values fall back to the default. */
export function parseRole(search: string): RoleId {
  const value = new URLSearchParams(search).get('role') ?? ''
  return (ROLE_IDS as readonly string[]).includes(value) ? (value as RoleId) : DEFAULT_ROLE
}

/** Updates the address bar without reloading. The default role keeps a clean URL. */
export function writeRoleToUrl(role: RoleId): void {
  const url = new URL(window.location.href)
  if (role === DEFAULT_ROLE) url.searchParams.delete('role')
  else url.searchParams.set('role', role)
  window.history.replaceState(null, '', url.toString())
}

import type { BundleState, PersistedBundleState } from "./types"

const STORAGE_KEY = "ecomexperts-bundle-builder:v1"

export function saveToStorage(state: BundleState): void {
  const payload: PersistedBundleState = {
    version: 1,
    savedAt: new Date().toISOString(),
    state,
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // storage quota exceeded — ignore
  }
}

export function loadFromStorage(): BundleState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedBundleState
    if (parsed.version !== 1 || !parsed.state) return null
    return parsed.state
  } catch {
    return null
  }
}

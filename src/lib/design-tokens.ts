// Mirrors CSS tokens for use in TypeScript logic (e.g. dynamic styles, tests).
// The CSS variables in tokens.css are authoritative — keep these in sync.

export const tokens = {
  color: {
    pageBg: "var(--color-page-bg)",
    surface: "var(--color-surface)",
    surfaceMuted: "var(--color-surface-muted)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    border: "var(--color-border)",
    borderSelected: "var(--color-border-selected)",
    accent: "var(--color-accent)",
    accentFg: "var(--color-accent-foreground)",
    savings: "var(--color-savings)",
  },
  radius: {
    card: "var(--radius-card)",
    button: "var(--radius-button)",
    badge: "var(--radius-badge)",
    chip: "var(--radius-chip)",
    panel: "var(--radius-panel)",
  },
} as const

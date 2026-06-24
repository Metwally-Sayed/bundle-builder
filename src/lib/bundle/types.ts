export type ReviewCategory = "cameras" | "sensors" | "accessories" | "plan"

export interface ProductVariant {
  id: string
  label: string
  /** URL to variant thumbnail image shown in chip */
  image?: string
  price?: number
  compareAtPrice?: number
  initialQuantity?: number
}

export interface BundleProduct {
  id: string
  stepId: string
  reviewCategory: ReviewCategory
  title: string
  description?: string
  learnMoreUrl?: string
  /** Main product image */
  image: string
  /** e.g. "Save 22%" */
  badge?: string
  price: number
  compareAtPrice?: number
  /** /mo or /yr suffix */
  unit?: string
  hasStepper: boolean
  initialQuantity?: number
  /** Cannot be removed or decremented to 0 */
  locked?: boolean
  /** Override price display to "FREE" */
  freeOverride?: boolean
  variants?: ProductVariant[]
}

export interface BundleStep {
  id: string
  order: number
  eyebrow: string
  title: string
  icon: string
  nextLabel?: string
  products: BundleProduct[]
}

export interface BundleData {
  steps: BundleStep[]
}

// ── State ─────────────────────────────────────────────────────────────────────

export interface BundleState {
  activeStepId: string
  /** productId → variantId (for products with variants) */
  activeVariantByProductId: Record<string, string>
  /**
   * "productId" for non-variant products
   * "productId::variantId" for variant quantities
   */
  quantities: Record<string, number>
  savedAt?: string
}

export interface PersistedBundleState {
  version: 1
  savedAt: string
  state: BundleState
}

// ── Derived ───────────────────────────────────────────────────────────────────

export interface SelectedItem {
  key: string
  product: BundleProduct
  variant?: ProductVariant
  quantity: number
  unitPrice: number
  unitCompareAtPrice: number
}

export interface BundleTotals {
  subtotal: number
  compareAtSubtotal: number
  savings: number
  shipping: number
  total: number
}

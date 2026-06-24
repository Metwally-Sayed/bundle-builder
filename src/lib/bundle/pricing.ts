import type { SelectedItem, BundleTotals } from "./types"

export function calcTotals(items: SelectedItem[]): BundleTotals {
  let subtotal = 0
  let compareAtSubtotal = 0
  for (const item of items) {
    subtotal += item.unitPrice * item.quantity
    compareAtSubtotal += item.unitCompareAtPrice * item.quantity
  }
  const savings = Math.max(0, compareAtSubtotal - subtotal)
  const shipping = 0 // free shipping per design
  return { subtotal, compareAtSubtotal, savings, shipping, total: subtotal + shipping }
}

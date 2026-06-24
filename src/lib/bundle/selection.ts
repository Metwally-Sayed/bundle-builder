import type { BundleData, BundleProduct, BundleState, SelectedItem } from "./types"

export function makeKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}::${variantId}` : productId
}

export function createInitialBundleState(data: BundleData): BundleState {
  const quantities: Record<string, number> = {}
  const activeVariantByProductId: Record<string, string> = {}

  for (const step of data.steps) {
    for (const product of step.products) {
      if (product.variants && product.variants.length > 0) {
        activeVariantByProductId[product.id] = product.variants[0].id
        for (const variant of product.variants) {
          quantities[makeKey(product.id, variant.id)] = variant.initialQuantity ?? 0
        }
      } else {
        quantities[product.id] = product.initialQuantity ?? 0
      }
    }
  }

  return {
    activeStepId: data.steps[0]?.id ?? "",
    activeVariantByProductId,
    quantities,
  }
}

export function deriveSelectedItems(data: BundleData, state: BundleState): SelectedItem[] {
  const items: SelectedItem[] = []

  for (const step of data.steps) {
    for (const product of step.products) {
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          const key = makeKey(product.id, variant.id)
          const qty = state.quantities[key] ?? 0
          if (qty > 0) {
            const basePrice = variant.price ?? product.price
            const unitPrice = product.freeOverride ? 0 : basePrice
            const unitCompareAt = variant.compareAtPrice ?? product.compareAtPrice ?? basePrice
            items.push({ key, product, variant, quantity: qty, unitPrice, unitCompareAtPrice: unitCompareAt })
          }
        }
      } else {
        const qty = state.quantities[product.id] ?? 0
        if (qty > 0) {
          items.push({
            key: product.id,
            product,
            variant: undefined,
            quantity: qty,
            unitPrice: product.freeOverride ? 0 : product.price,
            unitCompareAtPrice: product.compareAtPrice ?? product.price,
          })
        }
      }
    }
  }

  return items
}

export function getStepSelectedCount(step: { products: BundleProduct[] }, state: BundleState): number {
  let count = 0
  for (const product of step.products) {
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        if ((state.quantities[makeKey(product.id, variant.id)] ?? 0) > 0) count++
      }
    } else {
      if ((state.quantities[product.id] ?? 0) > 0) count++
    }
  }
  return count
}

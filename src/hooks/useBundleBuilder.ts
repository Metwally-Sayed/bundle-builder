import { useState, useCallback, useMemo } from "react"
import type { BundleData, BundleState, SelectedItem, BundleTotals } from "@/lib/bundle/types"
import { createInitialBundleState, deriveSelectedItems, getStepSelectedCount, makeKey } from "@/lib/bundle/selection"
import { calcTotals } from "@/lib/bundle/pricing"
import { saveToStorage, loadFromStorage } from "@/lib/bundle/storage"

function buildInitialState(data: BundleData): BundleState {
  const saved = loadFromStorage()
  if (saved) return saved
  return createInitialBundleState(data)
}

export function useBundleBuilder(data: BundleData) {
  const [state, setState] = useState<BundleState>(() => buildInitialState(data))
  const [saveLabel, setSaveLabel] = useState<string>("Save my system for later")

  const setActiveStepId = useCallback((id: string) => {
    setState((s) => ({ ...s, activeStepId: id }))
  }, [])

  const goToNextStep = useCallback((currentStepId: string) => {
    const idx = data.steps.findIndex((s) => s.id === currentStepId)
    const next = data.steps[idx + 1]
    if (next) setState((s) => ({ ...s, activeStepId: next.id }))
  }, [data.steps])

  const selectVariant = useCallback((productId: string, variantId: string) => {
    setState((s) => ({
      ...s,
      activeVariantByProductId: { ...s.activeVariantByProductId, [productId]: variantId },
    }))
  }, [])

  const getQuantity = useCallback(
    (productId: string, variantId?: string): number =>
      state.quantities[makeKey(productId, variantId)] ?? 0,
    [state.quantities]
  )

  const increment = useCallback((productId: string, variantId?: string) => {
    const key = makeKey(productId, variantId)
    setState((s) => ({ ...s, quantities: { ...s.quantities, [key]: (s.quantities[key] ?? 0) + 1 } }))
  }, [])

  const decrement = useCallback((productId: string, variantId?: string) => {
    const product = data.steps.flatMap((st) => st.products).find((p) => p.id === productId)
    if (product?.locked) return  // locked items cannot be decremented
    const key = makeKey(productId, variantId)
    setState((s) => ({ ...s, quantities: { ...s.quantities, [key]: Math.max(0, (s.quantities[key] ?? 0) - 1) } }))
  }, [data.steps])

  // Plan-style (no stepper): single-select within step, toggle off if already selected
  const toggle = useCallback((productId: string) => {
    const product = data.steps.flatMap((st) => st.products).find((p) => p.id === productId)
    if (!product) return

    setState((s) => {
      const current = s.quantities[productId] ?? 0
      if (product.reviewCategory === "plan") {
        const stepProducts = data.steps.find((st) => st.id === product.stepId)?.products ?? []
        const newQty: Record<string, number> = { ...s.quantities }
        for (const p of stepProducts) newQty[p.id] = 0
        newQty[productId] = current > 0 ? 0 : 1
        return { ...s, quantities: newQty }
      }
      return { ...s, quantities: { ...s.quantities, [productId]: current > 0 ? 0 : 1 } }
    })
  }, [data.steps])

  const selectedItems = useMemo<SelectedItem[]>(() => deriveSelectedItems(data, state), [data, state])
  const totals = useMemo<BundleTotals>(() => calcTotals(selectedItems), [selectedItems])

  const getStepCount = useCallback(
    (stepId: string): number => {
      const step = data.steps.find((s) => s.id === stepId)
      return step ? getStepSelectedCount(step, state) : 0
    },
    [data.steps, state]
  )

  const saveSystem = useCallback(() => {
    saveToStorage(state)
    setSaveLabel("System saved!")
    setTimeout(() => setSaveLabel("Save my system for later"), 3000)
  }, [state])

  return {
    activeStepId: state.activeStepId,
    setActiveStepId,
    goToNextStep,
    activeVariantByProductId: state.activeVariantByProductId,
    selectVariant,
    getQuantity,
    increment,
    decrement,
    toggle,
    getStepCount,
    selectedItems,
    totals,
    saveSystem,
    saveLabel,
  }
}

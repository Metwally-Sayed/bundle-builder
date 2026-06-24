import { useBundleBuilder } from "@/hooks/useBundleBuilder"
import { BundleAccordion } from "./BundleAccordion"
import { ReviewPanel } from "./ReviewPanel"
import bundleData from "@/data/bundle-data.json"
import type { BundleData } from "@/lib/bundle/types"

const data = bundleData as BundleData

export function BundleBuilderPage() {
  const {
    activeStepId,
    setActiveStepId,
    activeVariantByProductId,
    selectVariant,
    getQuantity,
    getStepCount,
    increment,
    decrement,
    toggle,
    goToNextStep,
    selectedItems,
    totals,
    saveSystem,
    saveLabel,
  } = useBundleBuilder(data)

  const accordionProps = {
    data,
    activeStepId,
    activeVariantByProductId,
    getQuantity,
    getStepCount,
    onIncrement: increment,
    onDecrement: decrement,
    onToggle: toggle,
    onSelectVariant: selectVariant,
    onStepOpen: setActiveStepId,
    onNext: goToNextStep,
  }

  const reviewProps = {
    selectedItems,
    totals,
    onIncrement: increment,
    onDecrement: decrement,
    onToggle: toggle,
    onSave: saveSystem,
    saveLabel,
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans)" }}>
      <main className="mx-auto px-4 sm:px-6 py-6 sm:py-8" style={{ maxWidth: "1280px" }}>

        {/* Mobile-only heading — "Let's get started!" (hidden at sm+ where accordion stays expanded) */}
        <h1 className="block sm:hidden text-center text-2xl font-bold text-[var(--color-text-primary)] mb-6">
          Let's get started!
        </h1>

        {/* Desktop/tablet layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: Builder accordion */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            <BundleAccordion {...accordionProps} />
          </div>

          {/* Right: Review panel — sticky on desktop, hidden on mobile (shown below) */}
          <div className="hidden lg:block w-95 shrink-0">
            <ReviewPanel {...reviewProps} />
          </div>
        </div>

        {/* Mobile/tablet: review panel below */}
        <div className="block lg:hidden mt-6">
          <ReviewPanel {...reviewProps} compact />
        </div>
      </main>
    </div>
  )
}

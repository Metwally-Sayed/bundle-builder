import type { BundleData } from "@/lib/bundle/types"
import { BundleStep } from "./BundleStep"
import { cn } from "@/lib/utils"

interface BundleAccordionProps {
  data: BundleData
  activeStepId: string
  activeVariantByProductId: Record<string, string>
  getQuantity: (productId: string, variantId?: string) => number
  getStepCount: (stepId: string) => number
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
  onSelectVariant: (productId: string, variantId: string) => void
  onStepOpen: (stepId: string) => void
  onNext: (currentStepId: string) => void
}

export function BundleAccordion({
  data,
  activeStepId,
  activeVariantByProductId,
  getQuantity,
  getStepCount,
  onIncrement,
  onDecrement,
  onToggle,
  onSelectVariant,
  onStepOpen,
  onNext,
}: BundleAccordionProps) {
  return (
    /* No card wrapper — each step is a flat section separated by dividers */
    <div>
      {data.steps.map((step) => (
        <div key={step.id} className={cn( step.id !== activeStepId && "border-b border-[#CED6DE]")}>
          <BundleStep
            step={step}
            isOpen={step.id === activeStepId}
            selectedCount={getStepCount(step.id)}
            activeVariantByProductId={activeVariantByProductId}
            getQuantity={getQuantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onToggle={onToggle}
            onSelectVariant={onSelectVariant}
            onHeaderClick={() => onStepOpen(step.id === activeStepId ? "" : step.id)}
            onNext={step.nextLabel ? () => onNext(step.id) : undefined}
          />
        </div>
      ))}
    </div>
  )
}

import type { BundleStep as BundleStepType } from "@/lib/bundle/types"
import { ProductGrid } from "./ProductGrid"
import { StepIcon } from "./StepIcon"
import { cn } from "@/lib/utils"

interface BundleStepProps {
  step: BundleStepType
  isOpen: boolean
  selectedCount: number
  activeVariantByProductId: Record<string, string>
  getQuantity: (productId: string, variantId?: string) => number
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
  onSelectVariant: (productId: string, variantId: string) => void
  onHeaderClick: () => void
  onNext?: () => void
}

export function BundleStep({
  step,
  isOpen,
  selectedCount,
  activeVariantByProductId,
  getQuantity,
  onIncrement,
  onDecrement,
  onToggle,
  onSelectVariant,
  onHeaderClick,
  onNext,
}: BundleStepProps) {
  return (
    <div className={cn(isOpen && "bg-[var(--color-panel-bg)] rounded-xl")}>

      {/* Eyebrow — "STEP X OF 4" with generous top padding */}
      <div className="px-6 pt-2 pb-2">
        <span className="text-[var(--color-eyebrow)] text-[12px] font-semibold tracking-widest uppercase">
          {step.eyebrow}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#CED6DE]" />

      {/* Header row — tall click target to match Figma */}
      <button
        type="button"
        className={cn(
          "w-full flex items-center gap-4 px-6 py-6 text-left transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-accent)]",
          !isOpen && "hover:bg-gray-50/50"
        )}
        onClick={onHeaderClick}
        aria-expanded={isOpen}
      >
        {/* Icon in thin bordered box */}
        <span className={cn(
          "flex items-center justify-center w-9 h-9 flex-shrink-0 ",
          isOpen ? "border-[var(--color-accent)]/30" : "border-[var(--color-border)]"
        )}>
          <StepIcon
            name={step.icon}
            className={cn(
              "w-5 h-5",
              isOpen ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"
            )}
          />
        </span>

        {/* Title */}
        <h2 className="flex-1 text-[var(--color-text-primary)] text-[22px] font-bold leading-tight">
          {step.title}
        </h2>

        {/* Right: count + filled triangle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {selectedCount > 0 && (
            <span className="text-[var(--color-accent)] text-[13px] ">
              {selectedCount} selected
            </span>
          )}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            className={cn(
              "flex-shrink-0 fill-[var(--color-accent)] transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          >
            <path d="M6 7.5L0.803847 0.75L11.1962 0.75L6 7.5Z" />
          </svg>
        </div>
      </button>

      {/* Open content — periwinkle bg */}
      {isOpen && (
        <>
          <div className="px-6 py-5 animate-fade-in-up">
            <ProductGrid
              products={step.products}
              activeVariantByProductId={activeVariantByProductId}
              getQuantity={getQuantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onToggle={onToggle}
              onSelectVariant={onSelectVariant}
            />
            {step.nextLabel && onNext && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={onNext}
                  className={cn(
                    "px-12 h-12 rounded-[var(--radius-button)] border border-[var(--color-accent)]",
                    "text-[var(--color-accent)] text-[15px] font-semibold bg-white",
                    "hover:bg-[var(--color-accent-light)] transition-colors"
                  )}
                >
                  Next: {step.nextLabel}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

import type { ProductVariant } from "@/lib/bundle/types"
import { cn } from "@/lib/utils"

interface VariantSelectorProps {
  variants: ProductVariant[]
  activeVariantId: string
  productTitle: string
  onSelect: (variantId: string) => void
  /** "row" = wrapped chips (desktop); "col" = full-width stacked (tablet/mobile) */
  orientation?: "row" | "col"
}

export function VariantSelector({ variants, activeVariantId, productTitle, onSelect, orientation = "row" }: VariantSelectorProps) {
  const isCol = orientation === "col"
  return (
    <div
      className={cn("flex gap-1.5", isCol ? "flex-col items-stretch" : "flex-wrap")}
      role="group"
      aria-label={`${productTitle} variant`}
    >
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId
        return (
          <button
            key={variant.id}
            type="button"
            aria-pressed={isActive}
            aria-label={`${productTitle} — ${variant.label}`}
            onClick={() => onSelect(variant.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-chip)] border text-xs font-medium transition-all",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-accent)]",
              isCol && "w-full justify-start",
              isActive
                ? "border-[var(--color-variant-selected)] bg-white text-[var(--color-text-primary)]"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-gray-400"
            )}
          >
            {variant.image && (
              <img
                src={variant.image}
                alt={variant.label}
                width={18}
                height={18}
                className="w-[18px] h-[18px] object-contain rounded-sm flex-shrink-0"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />
            )}
            <span>{variant.label}</span>
          </button>
        )
      })}
    </div>
  )
}

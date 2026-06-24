import type { BundleProduct } from "@/lib/bundle/types"
import { QuantityStepper } from "./QuantityStepper"
import { VariantSelector } from "./VariantSelector"
import { formatCurrency } from "@/lib/bundle/format"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: BundleProduct
  activeVariantId?: string
  getQuantity: (productId: string, variantId?: string) => number
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
  onSelectVariant: (productId: string, variantId: string) => void
  className?: string
}

export function ProductCard({
  product,
  activeVariantId,
  getQuantity,
  onIncrement,
  onDecrement,
  onToggle,
  onSelectVariant,
  className,
}: ProductCardProps) {
  const hasVariants = Boolean(product.variants?.length)
  const currentVariantId = hasVariants ? (activeVariantId ?? product.variants![0].id) : undefined
  const currentQty = hasVariants ? getQuantity(product.id, currentVariantId) : getQuantity(product.id)

  const isSelected = hasVariants
    ? (product.variants ?? []).some((v) => getQuantity(product.id, v.id) > 0)
    : currentQty > 0

  const activeVariant = hasVariants ? product.variants?.find((v) => v.id === currentVariantId) : undefined
  const displayPrice = activeVariant?.price ?? product.price
  const displayCompareAt = activeVariant?.compareAtPrice ?? product.compareAtPrice
  const displayImage = (hasVariants && activeVariant?.image) ? activeVariant.image : product.image

  const imageEl = (
    <img
      src={displayImage}
      alt={product.title}
      className="w-full h-auto object-contain max-h-[130px]"
      onError={(e) => { e.currentTarget.src = `https://placehold.co/120x100/f5f5f5/aaa?text=Wyze` }}
    />
  )

  const stepperEl = product.hasStepper ? (
    <QuantityStepper
      value={currentQty}
      onIncrement={() => onIncrement(product.id, currentVariantId)}
      onDecrement={() => onDecrement(product.id, currentVariantId)}
      locked={product.locked}
      size="card"
    />
  ) : (
    <button
      type="button"
      onClick={() => onToggle(product.id)}
      className={cn(
        "px-4 h-8 rounded-[var(--radius-button)] text-xs font-semibold border transition-all",
        currentQty > 0
          ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
          : "bg-white text-[var(--color-accent)] border-[var(--color-accent)] hover:bg-[var(--color-accent-light)]"
      )}
    >
      {currentQty > 0 ? "Selected" : "Select"}
    </button>
  )

  const priceEl = (
    <div className="flex flex-row items-baseline gap-1.5 lg:flex-col lg:items-end lg:gap-0 leading-tight">
      {displayCompareAt && displayCompareAt > displayPrice && (
        <span className="text-[#D8392B] text-[16px] line-through">
          {formatCurrency(displayCompareAt)}
        </span>
      )}
      <span className={cn(
        "font-bold text-[16px]",
        product.freeOverride ? "text-[var(--color-price-free)]" : "text-[var(--color-text-primary)]"
      )}>
        {product.freeOverride ? "FREE" : `${formatCurrency(displayPrice)}${product.unit ?? ""}`}
      </span>
    </div>
  )

  return (
    <div
      className={cn(
        "relative flex flex-col lg:flex-row rounded-[var(--radius-card)] border-2 bg-white transition-all duration-[var(--duration-base)] overflow-hidden ",
        isSelected
          ? "border-[var(--color-border-selected)]"
          : "border-transparent shadow-[var(--shadow-card)] hover:border-[var(--color-border)]",
        className
      )}
    >
      {/* Save badge — absolute overlay top-left */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 inline-block px-2 py-0.5 rounded-[var(--radius-badge)] bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] text-[11px] font-bold">
          {product.badge}
        </span>
      )}

      {/* Image — top (mobile) / left column (desktop) */}
      <div className="flex items-center justify-center p-3 pt-9 w-full lg:w-[130px] lg:flex-shrink-0">
        {imageEl}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 px-4 pb-4 lg:py-4 lg:pr-4 lg:pl-2 flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-[var(--color-text-primary)] font-bold text-[17px] leading-snug">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-[var(--color-text-secondary)] text-[13px] leading-snug">
            {product.description}
            {product.learnMoreUrl && (
              <>
                {" "}
                <a
                  href={product.learnMoreUrl}
                  className="text-[#0000EE]! underline! "
                  onClick={(e) => e.preventDefault()}
                >
                  Learn More
                </a>
              </>
            )}
          </p>
        )}

        {/* Variants — row */}
        {hasVariants && product.variants && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={currentVariantId!}
            productTitle={product.title}
            onSelect={(vid) => onSelectVariant(product.id, vid)}
          />
        )}

        {/* Stepper + Price row — pinned to bottom */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 lg:pt-1">
          {stepperEl}
          {priceEl}
        </div>
      </div>
    </div>
  )
}

import type { SelectedItem, BundleTotals } from "@/lib/bundle/types"
import { ReviewGroup } from "./ReviewGroup"
import { formatCurrency } from "@/lib/bundle/format"
import { cn } from "@/lib/utils"

const REVIEW_CATEGORIES = [
  { id: "cameras" as const,     label: "CAMERAS" },
  { id: "sensors" as const,     label: "SENSORS" },
  { id: "accessories" as const, label: "ACCESSORIES" },
  { id: "plan" as const,        label: "PLAN" },
]

/** "100% Wyze satisfaction guarantee" scalloped badge */
function WyzeSeal({ className }: { className?: string }) {
  return (
    <img
      src="/icons/satisfaction-seal.png"
      alt="100% Wyze satisfaction guarantee"
      className={cn("flex-shrink-0 object-contain", className ?? "w-[72px] h-[72px]")}
    />
  )
}

interface ReviewPanelProps {
  selectedItems: SelectedItem[]
  totals: BundleTotals
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
  onSave: () => void
  saveLabel: string
  /** If true, renders as compact mobile bottom panel */
  compact?: boolean
}

export function ReviewPanel({
  selectedItems,
  totals,
  onIncrement,
  onDecrement,
  onToggle,
  onSave,
  saveLabel,
  compact = false,
}: ReviewPanelProps) {
  const isEmpty = selectedItems.length === 0
  const monthlyFinancing = totals.total / 12

  function handleCheckout() {
    alert("Checkout is not implemented in this prototype.")
  }

  const financingPill = (
    <div className="inline-flex items-center px-2  rounded-[3px] bg-[var(--color-accent)] text-white text-[12px] font-light">
      as low as {formatCurrency(monthlyFinancing)}/mo
    </div>
  )

  const priceRow = (totalClass: string) =>
    totals.savings > 0 ? (
      <div className="flex items-baseline gap-1.5">
        <span className="text-[#6F7882] line-through font-medium text-[18px]">
          {formatCurrency(totals.compareAtSubtotal)}
        </span>
        <span className={cn("text-[#4E2FD2] font-bold", totalClass)}>
          {formatCurrency(totals.total)}
        </span>
      </div>
    ) : (
        <span className={cn("text-[#4E2FD2] font-bold", totalClass)}>
          {formatCurrency(totals.total)}
        </span>
    )

  return (
    <div className={cn(
      "rounded-[var(--radius-panel)] bg-[var(--color-panel-bg)]",
      !compact && "sticky top-4 overflow-y-auto"
    )}>
      {/* <md (mobile) and desktop sidebar → stacked. md+ compact (tablet) → two columns. */}
      <div className={cn(compact && "md:flex md:items-stretch")}>

        {/* LEFT column: header + line items + shipping */}
        <div className={cn(compact && "md: md:min-w-0")}>
          {/* Header */}
          <div className="px-5 pt-5 pb-3">
            <p className="text-[var(--color-eyebrow)] text-[10px] font-semibold tracking-widest uppercase">
              REVIEW
            </p>
            <h2 className="text-[var(--color-text-primary)] text-xl font-bold mt-0.5">
              Your security system
            </h2>
            <p className="text-[var(--color-text-secondary)] text-[11px] mt-0.5 leading-snug">
              Review your personalized protection system designed to keep what matters most safe.
            </p>
          </div>

          {/* Line items */}
          <div className="px-5 pb-3">
            {isEmpty ? (
              <p className="text-[var(--color-text-muted)] text-sm py-6 text-center">
                Add products to build your system
              </p>
            ) : (
              REVIEW_CATEGORIES.map((cat) => {
                const items = selectedItems.filter((i) => i.product.reviewCategory === cat.id)
                return (
                  <ReviewGroup
                    key={cat.id}
                    title={cat.label}
                    items={items}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onToggle={onToggle}
                  />
                )
              })
            )}
          </div>

          {/* Shipping FREE row */}
          <div className="px-5  ">

            <div className="flex items-center justify-between border-t border-[#CED6DE] pt-[15px]">
  <div className="flex items-center gap-2.5 text-[13px] text-[var(--color-text-primary)] ">
              <span className="flex-shrink-0 w-10 h-10 rounded-md bg-white flex items-center justify-center">
                <img src="/icons/delivery.svg" alt="" width={20} height={20} className="w-5 h-5" />
              </span>
              Fast Shipping
            </div>
            <div className="text-right flex flex-col items-center ">
              <span className="text-[#6F7882] text-[13px] line-through mr-1.5">$5.99</span>
              <span className="text-[#4E2FD2] text-[13px] font-semibold">FREE</span>
            </div>
            </div>
 
         
          </div>
        </div>

        {/* RIGHT column: seal + returns + price + congrats + CTA */}
        <div className={cn(
          compact && "md:w-[440px] md:flex-shrink-0 md:border-l md:border-[#CED6DE] md:flex md:flex-col"
        )}>
          {/* Summary */}
          <div className={cn("px-5 py-4 ", compact && "md:border-t-0 md:px-6")}>
            <div className={cn("flex justify-between items-center gap-3 py-[10px]", compact && "md:gap-4", compact && "border-0")}>
              <WyzeSeal className={cn("w-[72px] h-[72px]", compact && "md:w-[100px] md:h-[100px]")} />

              {/* WIDE (two-col): returns blurb */}
              {compact && (
                <div className="hidden md:block ">
                  <p className="text-[var(--color-text-primary)] text-[18px] font-bold leading-tight">
                    30-day hassle-free returns
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-[14px] mt-1.5 leading-snug">
                    If you're not totally in love with the product, we will refund you 100%.
                  </p>
                </div>
              )}

              {/* NARROW: pill + price beside seal */}
              <div className={cn("flex flex-col items-end", compact && "md:hidden")}>
                <div className="mb-2">{financingPill}</div>
                {priceRow("text-2xl")}
              </div>
            </div>

            {/* WIDE (two-col): pill + price row */}
            {compact && (
              <div className="hidden md:flex md:items-center md:justify-between md:mt-5">
                {financingPill}
                {priceRow("text-[28px]")}
              </div>
            )}

            {/* Savings congrats */}
            {totals.savings > 0 && (
              <p className={cn(
                "text-[var(--color-savings)] text-[11px] font-medium mt-2",
                compact && "md:text-center md:text-[13px] md:mt-4"
              )}>
                Congrats! You're saving {formatCurrency(totals.savings)} on your security bundle!
              </p>
            )}
          </div>

          {/* CTA */}
          <div className={cn("px-5 pb-5 flex flex-col gap-2", compact && "md:px-6")}>
            <button
              type="button"
              onClick={handleCheckout}
              className={cn(
                "w-full h-11 rounded-[var(--radius-button)]",
                "bg-[var(--color-accent)] text-white text-sm font-semibold",
                "hover:bg-[var(--color-accent-hover)] transition-colors"
              )}
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={onSave}
              className="text-xs text-center italic text-[var(--color-text-secondary)] underline underline-offset-2 hover:text-[var(--color-text-primary)] transition-colors"
            >
              {saveLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

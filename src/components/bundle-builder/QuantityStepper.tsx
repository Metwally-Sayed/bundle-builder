import { cn } from "@/lib/utils"

interface QuantityStepperProps {
  value: number
  min?: number
  onIncrement: () => void
  onDecrement: () => void
  locked?: boolean
  size?: "card" | "review"
}

export function QuantityStepper({ value, min = 0, onIncrement, onDecrement, locked, size = "card" }: QuantityStepperProps) {
  const isReview = size === "review"
  const canDecrement = !locked && value > min

  const btn = cn(
    "flex items-center justify-center rounded-[var(--radius-stepper)] transition-colors",
    "bg-[var(--color-stepper-btn-bg)] hover:bg-[var(--color-stepper-btn-hover)]",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
    isReview ? "w-6 h-6 text-sm" : "w-8 h-8 text-lg"
  )

  return (
    <div className={cn("inline-flex items-center", isReview ? "gap-1.5" : "gap-2")}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        disabled={!canDecrement}
        className={cn(btn, !canDecrement && "opacity-50 cursor-not-allowed hover:bg-[var(--color-stepper-btn-bg)]",
          canDecrement ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]")}
      >
        −
      </button>
      <span className={cn(
        "tabular-nums font-semibold text-[var(--color-text-primary)] select-none text-center",
        isReview ? "min-w-[18px] text-sm" : "min-w-[22px] text-base"
      )}>
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        disabled={locked}
        className={cn(btn, locked && "opacity-50 cursor-not-allowed hover:bg-[var(--color-stepper-btn-bg)]",
          locked ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)]")}
      >
        +
      </button>
    </div>
  )
}

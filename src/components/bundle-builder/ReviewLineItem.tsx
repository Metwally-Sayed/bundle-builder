import type { SelectedItem } from "@/lib/bundle/types"
import { QuantityStepper } from "./QuantityStepper"
import { formatCurrency } from "@/lib/bundle/format"
import { cn } from "@/lib/utils"

interface ReviewLineItemProps {
  item: SelectedItem
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
}

export function ReviewLineItem({ item, onIncrement, onDecrement, onToggle }: ReviewLineItemProps) {
  const { product, variant, quantity, unitPrice, unitCompareAtPrice } = item
  const total = unitPrice * quantity
  const compareTotal = unitCompareAtPrice * quantity
  const hasSavings = compareTotal > total && !product.freeOverride

  const label = variant ? `${product.title} (${variant.label})` : product.title
  const thumb = (variant?.image ?? product.image)
console.log(product, "product");

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-white/60  flex items-center justify-center overflow-hidden">
        <img
          src={thumb}
          alt={label}
          width={36}
          height={36}
          className="object-contain w-9 h-9"
          onError={(e) => { e.currentTarget.src = `https://placehold.co/36x36/f0f0f0/999?text=${encodeURIComponent(product.title.charAt(0))}` }}
        />
      </div>

      {/* Name + stepper */}
      <div className="flex-1 min-w-0 ">
       { product.id !=="plan-cam-unlimited" ? <p className="text-[var(--color-text-primary)] text-[11px] font-medium">
          {label}
        </p> : <div>
          <span className=" text-[16px] font-bold">{label.split(' ')[0]}</span> 
          {" "}
          <span className="text-[#4E2FD2] text-[16px] font-bold">{label.split(' ').slice(1).join(' ')}</span>
          </div> }

      
      </div>
      <div className="mt-1">
        {product.hasStepper ? (
          <QuantityStepper
            value={quantity}
            onIncrement={() => onIncrement(product.id, variant?.id)}
            onDecrement={() => onDecrement(product.id, variant?.id)}
            locked={product.locked}
            size="review"
          />
        ) : (
          <button
              type="button"
              onClick={() => onToggle(product.id)}
              className="text-[10px] text-[var(--color-text-secondary)] underline hover:text-[var(--color-text-primary)]"
            >
              Remove
            </button>
          )}
        </div>
      {/* Price */}
      <div className="shrink-0 text-right">
        {hasSavings && (
          <div className="text-[#6F7882] text-[14px] line-through leading-none">
            {formatCurrency(compareTotal)}
          </div>
        )}
        <div className={cn(
          "text-xs font-semibold leading-none",
          product.freeOverride ? "text-[#4E2FD2]" : "text-[var(--color-price-active)] text-[14px]"
        )}>
          {product.freeOverride ? "FREE" : formatCurrency(total)}
          {product.unit && <span className="font-normal text-[9px]">{product.unit}</span>}
        </div>
      </div>
    </div>
  )
}

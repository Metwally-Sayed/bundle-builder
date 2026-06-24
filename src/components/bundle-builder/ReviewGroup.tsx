import type { SelectedItem } from "@/lib/bundle/types"
import { ReviewLineItem } from "./ReviewLineItem"

interface ReviewGroupProps {
  title: string
  items: SelectedItem[]
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
}

export function ReviewGroup({ title, items, onIncrement, onDecrement, onToggle }: ReviewGroupProps) {
  if (items.length === 0) return null

  return (
    <div className=" border-t border-[#CED6DE] py-[15px]">
      <p className="text-[var(--color-eyebrow)] text-[10px] font-semibold tracking-widest uppercase mb-1 mt-3 first:mt-0">
        {title}
      </p>
      <div className="divide-y divide-white/40">
        {items.map((item) => (
          <ReviewLineItem
            key={item.key}
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}

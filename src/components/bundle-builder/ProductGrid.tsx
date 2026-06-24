import type { BundleProduct } from "@/lib/bundle/types"
import { ProductCard } from "./ProductCard"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  products: BundleProduct[]
  activeVariantByProductId: Record<string, string>
  getQuantity: (productId: string, variantId?: string) => number
  onIncrement: (productId: string, variantId?: string) => void
  onDecrement: (productId: string, variantId?: string) => void
  onToggle: (productId: string) => void
  onSelectVariant: (productId: string, variantId: string) => void
}

export function ProductGrid({
  products,
  activeVariantByProductId,
  getQuantity,
  onIncrement,
  onDecrement,
  onToggle,
  onSelectVariant,
}: ProductGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:grid lg:grid-cols-2">
      {products.map((product, idx) => {
        const isOddLast = products.length % 2 === 1 && idx === products.length - 1
        return (
          <ProductCard
            key={product.id}
            product={product}
            activeVariantId={activeVariantByProductId[product.id]}
            getQuantity={getQuantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onToggle={onToggle}
            onSelectVariant={onSelectVariant}
            /* <lg: fixed-size wrapped cards. lg: 2-col grid, last odd card centered. */
            className={cn(
              "w-[244.6px] min-h-[331.1px] lg:w-full lg:min-h-0",
              isOddLast && "lg:col-span-2 lg:max-w-[calc(50%-6px)] lg:mx-auto"
            )}
          />
        )
      })}
    </div>
  )
}

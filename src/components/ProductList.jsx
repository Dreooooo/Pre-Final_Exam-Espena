
import ProductCard from './ProductCard'

function ProductList({
  products,
  onAddToCart,
  onQuantityChange,
  onViewDetails,
  onDeleteProduct
}) {
  if (products.length === 0) {
    return (
      <p className="col-span-full py-10 text-center text-slate-500">
        No products found in this category.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
            <div
            key={product.id}
            className="animate-[fadeIn_0.25s_ease-out]"
            >
            <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onQuantityChange={onQuantityChange}
                onViewDetails={onViewDetails}
                onDeleteProduct={onDeleteProduct}
            />
            </div>
        ))}
    </div>
  )
}

export default ProductList

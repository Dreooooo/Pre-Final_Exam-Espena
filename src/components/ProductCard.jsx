
function ProductCard({
  product,
  onAddToCart,
  onQuantityChange,
  onViewDetails,
  onDeleteProduct,
}) {
  const isLowStock = product.quantity < 5

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Clickable product picture */}
      <button
        type="button"
        onClick={() => onViewDetails(product.id)}
        className="block w-full cursor-pointer text-left"
        aria-label={`View ${product.name} details`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover transition duration-300 hover:scale-105"
        />
      </button>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          {/* Clickable product name */}
          <button
            type="button"
            onClick={() => onViewDetails(product.id)}
            className="text-left text-lg font-bold text-slate-800 transition hover:text-emerald-700"
          >
            {product.name}
          </button>

          {isLowStock && (
            <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
              Low Stock
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500">{product.category}</p>

        <p className="text-xl font-bold text-emerald-700">
          ₱{product.price.toLocaleString('en-PH')}
        </p>

        <p className="text-sm text-slate-600">
          Stock: {product.quantity}
        </p>

        <p className="text-sm text-slate-600">
          Subtotal: ₱
          {(product.price * product.quantity).toLocaleString('en-PH')}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onQuantityChange(product.id, -1)}
            disabled={product.quantity <= 0}
            className="rounded bg-slate-200 px-3 py-1 font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span className="font-medium">{product.quantity}</span>

          <button
            type="button"
            onClick={() => onQuantityChange(product.id, 1)}
            className="rounded bg-slate-200 px-3 py-1 font-bold"
          >
            +
          </button>
        </div>

        {/* Side-by-side action buttons */}
        <div className="flex items-stretch gap-2 pt-1">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.quantity <= 0}
            className="min-w-0 flex-[1.4] rounded-lg bg-emerald-600 px-2 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to Cart
          </button>

          <button
            type="button"
            onClick={() => onDeleteProduct(product.id)}
            className="min-w-0 flex-1 rounded-lg border border-red-200 bg-white px-2 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
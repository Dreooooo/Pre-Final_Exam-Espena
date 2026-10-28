
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">Product Not Found</h1>
          <p className="mt-2 text-slate-500">This product may have been removed.</p>
          <Link to="/" className="mt-5 inline-block font-semibold text-emerald-700">
            ← Back to Products
          </Link>
        </div>
      </main>
    )
  }

  const isLowStock = product.quantity < 5
  const subtotal = product.price * quantity

  const handleAddToCart = () => {
    const success = onAddToCart(product, quantity)

    if (success) {
      setMessage(`${quantity} × ${product.name} added to your cart.`)
      setQuantity(1)
    } else {
      setMessage('')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-5 inline-flex font-semibold text-emerald-700 hover:text-emerald-900"
        >
          ← Back to Products
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
          <div className="flex min-h-72 items-center justify-center bg-slate-100 p-6 sm:p-10">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
                {product.category}
              </span>
              {isLowStock && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                  Low Stock
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-800">
              {product.name}
            </h1>

            <p className="mt-3 text-3xl font-bold text-emerald-700">
              ₱{product.price.toLocaleString('en-PH')}
            </p>

            <p className="mt-5 leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-5 space-y-2 border-t border-slate-200 pt-5 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Specifications:</span>{' '}
                {product.specifications}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Rating:</span>{' '}
                ⭐ {product.rating} / 5
              </p>
              <p>
                <span className="font-semibold text-slate-800">Available stock:</span>{' '}
                {product.quantity}
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <label className="mb-3 block font-semibold text-slate-700">
                Quantity to purchase
              </label>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  disabled={quantity <= 1 || product.quantity <= 0}
                  className="h-11 w-11 rounded-lg border border-slate-300 bg-white text-xl font-bold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease purchase quantity"
                >
                  −
                </button>

                <span className="min-w-8 text-center text-lg font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((current) => Math.min(product.quantity, current + 1))}
                  disabled={quantity >= product.quantity}
                  className="h-11 w-11 rounded-lg border border-slate-300 bg-white text-xl font-bold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase purchase quantity"
                >
                  +
                </button>

                <div className="ml-auto text-right">
                  <p className="text-sm text-slate-500">Subtotal</p>
                  <p className="text-lg font-bold text-slate-800">
                    ₱{subtotal.toLocaleString('en-PH')}
                  </p>
                </div>
              </div>
            </div>

            {message && (
              <p role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
                {message}
              </p>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
              className="mt-5 w-full rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {product.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
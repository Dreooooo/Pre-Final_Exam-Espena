import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'

function Home({
  products,
  cartItems,
  cartOpen,
  setCartOpen,
  onAddToCart,
  onChangeStock,
  onChangeCartQuantity,
  onRemoveFromCart,
  onDeleteProduct,
}) {
  const [category, setCategory] = useState('All')
  const navigate = useNavigate()

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts =
    category === 'All'
      ? products
      : products.filter((product) => product.category === category)

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  )

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-emerald-700">
              Inventory Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">
              Product Management
            </h1>
            <p className="mt-2 text-slate-500">
              Manage your products, stock, and shopping cart.
            </p>
          </div>

          <button
            onClick={() => navigate('/add-product')}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            + Add Product
          </button>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Products
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Units in Stock
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {products.reduce(
                (sum, product) => sum + product.quantity,
                0
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Inventory Value
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-700">
              ₱{inventoryValue.toLocaleString('en-PH')}
            </p>
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Your Products
            </h2>
            <p className="text-sm text-slate-500">
              Browse your inventory and view product details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="category"
              className="text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-32 cursor-pointer appearance-none rounded-xl border border-emerald-200 bg-white px-4 py-2.5 pr-9 text-sm font-semibold text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-emerald-400 hover:shadow-md focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m5 7 5 5 5-5" />
                </svg>
              </span>
            </div>
          </div>
        </section>

        <ProductList
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onQuantityChange={onChangeStock}
          onViewDetails={(id) => navigate(`/product/${id}`)}
          onDeleteProduct={onDeleteProduct}
        />

        {cartOpen && (
          <Cart
            items={cartItems}
            onQuantityChange={onChangeCartQuantity}
            onRemoveItem={onRemoveFromCart}
            onClose={() => setCartOpen(false)}
          />
        )}
      </main>
    </>
  )
}

export default Home
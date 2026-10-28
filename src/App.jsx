import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import productsData from './data/products'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import ProductDetails from './pages/ProductDetails'
import ProductForm from './components/ProductForm'

function Home({
  products,
  setProducts,
  cartItems,
  cartOpen,
  setCartOpen,
  onAddToCart,
  onChangeStock,
  onChangeCartQuantity,
  onRemoveFromCart,
  onDeleteProduct
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
            <p className="text-sm font-medium text-slate-500">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Units in Stock</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {products.reduce((sum, product) => sum + product.quantity, 0)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Inventory Value</p>
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

function loadSavedState(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [products, setProducts] = useState(() =>
  loadSavedState('product-management-products', productsData)
  )

  const [cartItems, setCartItems] = useState(() =>
  loadSavedState('product-management-cart', [])
  )

  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('product-management-products', JSON.stringify(products))
    } catch {
      alert('Unable to save products. Try using a smaller image.')
    }
  }, [products])

  useEffect(() => {
    try {
      localStorage.setItem('product-management-cart', JSON.stringify(cartItems))
    } catch {
      alert('Unable to save your cart. Try using a smaller image.')
    }
  }, [cartItems])

  const addToCart = (product, amount = 1) => {
    const currentProduct = products.find((item) => item.id === product.id)

    if (!currentProduct || currentProduct.quantity <= 0) {
      alert('This product is out of stock.')
      return false
    }

    const existing = cartItems.find((item) => item.id === product.id)
    const currentCartQuantity = existing ? existing.cartQuantity : 0

    if (
      !Number.isInteger(amount) ||
      amount < 1 ||
      currentCartQuantity + amount > currentProduct.quantity
    ) {
      alert('The requested quantity exceeds the available stock.')
      return false
    }

    if (existing) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === product.id
            ? {
                ...currentProduct,
                cartQuantity: item.cartQuantity + amount,
              }
            : item
        )
      )
    } else {
      setCartItems((items) => [
        ...items,
        { ...currentProduct, cartQuantity: amount },
      ])
    }

    return true
  }

  const changeStock = (id, amount) => {
    const product = products.find((item) => item.id === id)
    if (!product) return

    const nextStock = Math.max(0, product.quantity + amount)

    setProducts((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: nextStock } : item
      )
    )

    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: nextStock,
                cartQuantity: Math.min(item.cartQuantity, nextStock),
              }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    )
  }

  const changeCartQuantity = (id, amount) => {
    const item = cartItems.find((cartItem) => cartItem.id === id)
    if (!item) return

    const nextQuantity = item.cartQuantity + amount

    if (nextQuantity > item.quantity) {
      alert('You cannot exceed the available stock.')
      return
    }

    if (nextQuantity <= 0) {
      setCartItems((items) => items.filter((cartItem) => cartItem.id !== id))
      return
    }

    setCartItems((items) =>
      items.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, cartQuantity: nextQuantity }
          : cartItem
      )
    )
  }

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  
  const deleteProduct = (id) => {
    setProducts((items) =>
      items.filter((product) => product.id !== id)
    )

    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    )
  }


  const addProduct = (newProduct) => {
    setProducts((items) => {
      const newId = Math.max(0, ...items.map((item) => item.id)) + 1
      return [...items, { ...newProduct, id: newId }]
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              setProducts={setProducts}
              cartItems={cartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              onAddToCart={addToCart}
              onChangeStock={changeStock}
              onChangeCartQuantity={changeCartQuantity}
              onRemoveFromCart={removeFromCart}
              onDeleteProduct={deleteProduct}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              onAddToCart={addToCart}
              onDeleteProduct={deleteProduct}
            />
          }
        />

        <Route
          path="/add-product"
          element={<ProductForm onAddProduct={addProduct} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
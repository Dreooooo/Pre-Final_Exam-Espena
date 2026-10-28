import { useEffect, useState } from 'react'
import productsData from './data/products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import ProductForm from './components/ProductForm'

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
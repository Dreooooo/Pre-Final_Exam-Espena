
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialForm = {
  name: '',
  category: '',
  image: '',
  description: '',
  specifications: '',
  rating: '',
  price: '',
  quantity: '',
}

function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState(initialForm)
  const [imageName, setImageName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }

    // Read the selected picture so the app can display it.
    const reader = new FileReader()

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: reader.result,
      }))
      setImageName(file.name)
      setError('')
    }

    reader.onerror = () => {
      setError('Unable to read this image. Please try another one.')
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.image ||
      !form.description.trim() ||
      !form.specifications.trim() ||
      form.rating === '' ||
      form.price === '' ||
      form.quantity === ''
    ) {
      setError('Please complete all fields and choose a product image.')
      return
    }

    const rating = Number(form.rating)
    const price = Number(form.price)
    const quantity = Number(form.quantity)

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      setError('Rating must be between 0 and 5.')
      return
    }

    if (!Number.isFinite(price) || price < 0) {
      setError('Price must be zero or greater.')
      return
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      setError('Quantity must be a whole number of zero or greater.')
      return
    }

    onAddProduct({
      name: form.name.trim(),
      category: form.category.trim(),
      image: form.image,
      description: form.description.trim(),
      specifications: form.specifications.trim(),
      rating,
      price,
      quantity,
    })

    navigate('/')
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-5 inline-flex font-semibold text-emerald-700 hover:text-emerald-900"
        >
          ← Back to Products
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Add New Product
          </h1>
          <p className="mt-2 text-slate-500">
            Enter the product information and select a picture from your device.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="image" className="mb-2 block font-semibold text-slate-700">
                Product Picture
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:font-semibold file:text-emerald-700`}
              />
              <p className="mt-2 text-sm text-slate-500">
                Choose a photo from your computer or phone gallery.
              </p>

              {imageName && (
                <p className="mt-2 text-sm text-emerald-700">
                  Selected: {imageName}
                </p>
              )}

              {form.image && (
                <img
                  src={form.image}
                  alt="Product preview"
                  className="mt-4 h-48 w-full rounded-xl border border-slate-200 object-contain bg-slate-50"
                />
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-semibold text-slate-700">
                  Product Name
                </label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="e.g. Wireless Mouse" required />
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block font-semibold text-slate-700">
                  Category
                </label>
                <input id="category" name="category" value={form.category} onChange={handleChange} className={inputClass} placeholder="e.g. Electronics" required />
              </div>

              <div>
                <label htmlFor="price" className="mb-2 block font-semibold text-slate-700">
                  Price (₱)
                </label>
                <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className={inputClass} placeholder="0.00" required />
              </div>

              <div>
                <label htmlFor="quantity" className="mb-2 block font-semibold text-slate-700">
                  Available Stock
                </label>
                <input id="quantity" name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} className={inputClass} placeholder="0" required />
              </div>

              <div>
                <label htmlFor="rating" className="mb-2 block font-semibold text-slate-700">
                  Rating (0–5)
                </label>
                <input id="rating" name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} className={inputClass} placeholder="4.5" required />
              </div>

              <div>
                <label htmlFor="specifications" className="mb-2 block font-semibold text-slate-700">
                  Specifications
                </label>
                <input id="specifications" name="specifications" value={form.specifications} onChange={handleChange} className={inputClass} placeholder="e.g. Bluetooth, USB-C" required />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block font-semibold text-slate-700">
                Description
              </label>
              <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} className={inputClass} placeholder="Describe the product..." required />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Link to="/" className="rounded-lg border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <button type="submit" className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ProductForm
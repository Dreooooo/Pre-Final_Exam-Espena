
import { Link } from 'react-router-dom'

function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold">
          Product Manager
        </Link>

        <button
          onClick={onOpenCart}
          className="rounded-lg bg-white px-4 py-2 font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          Cart ({cartCount})
        </button>
      </nav>
    </header>
  )
}

export default Navbar

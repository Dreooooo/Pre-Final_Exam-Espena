function Cart({ items, onQuantityChange, onRemoveItem, onClose }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  )

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white p-5 shadow-2xl sm:mt-10 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>
            <p className="mt-1 text-sm text-slate-500">
              {items.reduce((sum, item) => sum + item.cartQuantity, 0)} item(s)
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
            <p className="text-lg font-semibold text-slate-700">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-500">
              Add a product to see it here.
            </p>
          </div>
        ) : (
          <>
            <div className="max-h-[55vh] space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-full rounded-lg bg-slate-50 object-contain sm:w-24"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      ₱{item.price.toLocaleString('en-PH')} each
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => onQuantityChange(item.id, -1)}
                        className="rounded-lg bg-slate-100 px-3 py-1 font-bold hover:bg-slate-200"
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center font-semibold">
                        {item.cartQuantity}
                      </span>
                      <button
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => onQuantityChange(item.id, 1)}
                        disabled={item.cartQuantity >= item.quantity}
                        className="rounded-lg bg-slate-100 px-3 py-1 font-bold hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="font-bold text-emerald-700">
                      ₱{(item.price * item.cartQuantity).toLocaleString('en-PH')}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-2xl font-bold text-emerald-700">
                ₱{total.toLocaleString('en-PH')}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
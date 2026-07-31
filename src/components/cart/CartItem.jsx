function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
}) {
  const price =
    item.sellingPrice ?? item.price;

  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3">
      {/* Product Image */}
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            📦
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          ₹{price} × {item.quantity}
        </p>

        <p className="mt-1 font-bold text-green-600">
          ₹{price * item.quantity}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              decreaseQuantity(item.id)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
          >
            −
          </button>

          <span className="w-5 text-center font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQuantity(item.id)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
          >
            +
          </button>
        </div>

        <button
          onClick={() =>
            deleteFromCart(item.id)
          }
          className="text-xs font-medium text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
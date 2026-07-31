function CartHeader({
  cartCount,
  onClose,
}) {
  return (
    <div className="shrink-0 border-b bg-white px-5 py-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            🛒 Shopping Cart
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {cartCount} Item
            {cartCount !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-xl
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-red-500
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default CartHeader;
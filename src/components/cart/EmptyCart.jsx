function EmptyCart({ onContinueShopping }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="text-6xl">🛒</div>

      <h2 className="mt-5 text-2xl font-bold text-gray-900">
        Your cart is empty
      </h2>

      <p className="mt-2 text-center text-gray-500">
        Looks like you haven't added any products yet.
      </p>

      <button
        onClick={onContinueShopping}
        className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default EmptyCart;
function ToastNotification({
  toast,
  setToast,
  setShowCart,
}) {
  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 bg-white p-4 rounded-xl shadow-2xl z-50 w-80 animate-pulse">

      <div className="flex gap-3 items-center">

        <img
          src={toast.image}
          alt={toast.name}
          className="w-16 h-16 object-contain"
        />

        <div className="flex-1">
          <p className="font-bold text-green-600">
            ✓ {toast.name} added to cart
          </p>

          <button
            onClick={() => {
              setShowCart(true);
              setToast(null);
            }}
            className="text-green-600 font-semibold mt-1"
          >
            View Cart →
          </button>
        </div>

        <button
          onClick={() => setToast(null)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>

      </div>

    </div>
  );
}

export default ToastNotification;
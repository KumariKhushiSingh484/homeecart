function ToastNotification({ toast, setToast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 w-80 rounded-xl shadow-2xl p-4 text-white transition-all duration-300
        ${
          toast.type === "success"
            ? "bg-green-600"
            : toast.type === "error"
            ? "bg-red-600"
            : toast.type === "warning"
            ? "bg-yellow-500"
            : "bg-blue-600"
        }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold capitalize">
            {toast.type || "Info"}
          </h3>

          <p className="text-sm mt-1">
            {toast.message}
          </p>
        </div>

        <button
          onClick={() => setToast(null)}
          className="ml-4 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ToastNotification;
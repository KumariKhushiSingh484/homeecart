import { useNavigate } from "react-router-dom";

function LoginRequired({ closeCheckout }) {
  const navigate = useNavigate();

  function handleLogin() {
  // Remember that the user wanted to checkout
  sessionStorage.setItem(
    "redirectAfterLogin",
    "checkout"
  );

  closeCheckout();

  navigate("/login");
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center">

       <div className="text-6xl mb-4">
  🛒
</div>

<h2 className="text-2xl font-bold text-gray-900">
  Almost There!
</h2>

<p className="mt-3 text-gray-600">
  Please login to complete your order.
</p>

<p className="mt-2 text-sm text-gray-500">
  Your cart is safely saved and will be waiting for you after login.
</p>

        <button
          onClick={handleLogin}
          className="
            mt-8
            w-full
            rounded-xl
            bg-green-600
            py-3
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-green-700
          "
        >
          📱 Login
        </button>

        <button
          onClick={closeCheckout}
          className="
            mt-3
            w-full
            rounded-xl
            border
            border-gray-300
            py-3
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
          "
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default LoginRequired;
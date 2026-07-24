import { generateInvoice } from "../utils/invoice/generateInvoice";
import { useShopping } from "../context/ShoppingContext";

function OrderSuccessModal() {
  const {
    orderPlaced,
    placedOrder,
    closeOrderSuccess,
  } = useShopping();

  if (!orderPlaced || !placedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

        {/* Success Icon */}

        <div className="text-6xl mb-4">
          🎉
        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h2>

        <p className="mt-4 text-lg font-semibold">
          Order #{placedOrder.orderNumber}
        </p>

        <div className="mt-5">
  <p className="text-lg font-semibold text-gray-800">
    🛒 We're processing your order.
  </p>

  <p className="mt-2 text-gray-600">
    📞 Our team will contact you shortly to confirm your order details.
  </p>
</div>

        <p className="mt-5 text-gray-500 leading-relaxed">
          Thank you for shopping with
          <br />
          <span className="font-semibold text-green-700">
            HomeEcart ❤️
          </span>
        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3">

          <button
            onClick={() =>
              generateInvoice(placedOrder)
            }
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            📄 Download Invoice
          </button>

          <button
            onClick={closeOrderSuccess}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccessModal;
import { useCart } from "../context/CartContext";

function OrderSummary() {
  const {
    cartItems,
    cartSubtotal,
    cartDelivery,
    cartTotal,
  } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-5">
        📦 Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-4">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-3"
          >
            <div>

              <p className="font-semibold">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>

            </div>

            <p className="font-semibold">
              ₹
              {(item.sellingPrice ?? item.price) *
                item.quantity}
            </p>

          </div>
        ))}

      </div>

      {/* Totals */}

      <div className="border-t mt-6 pt-5 space-y-3">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>
            ₹{cartSubtotal}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Delivery</span>

          {cartDelivery === 0 ? (

            <span className="text-green-600 font-semibold">
              FREE 🎉
            </span>

          ) : (

            <span>
              ₹{cartDelivery}
            </span>

          )}

        </div>

        <div className="flex justify-between border-t pt-4 text-2xl font-bold">

          <span>Total</span>

          <span className="text-green-600">
            ₹{cartTotal}
          </span>

        </div>

      </div>

    </div>
  );
}

export default OrderSummary;
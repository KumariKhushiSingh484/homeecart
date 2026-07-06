import { calculateCartTotal } from "../utils/cart/calculateCartTotal";
function CartModal({
  showCart,
  setShowCart,
  cartItems,
  addToCart,
  removeFromCart,
}) {
  if (!showCart) return null;

  const { subtotal, delivery, total } =
  calculateCartTotal(cartItems);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[95%] md:w-96 max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Shopping Cart
          </h2>

          <button
            onClick={() => setShowCart(false)}
            className="text-red-500 font-bold text-xl"
          >
            ✖
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border-b py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 border-t pt-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Delivery</span>

                <span>
                  {delivery === 0 ? (
                    <span className="text-green-600 font-bold">
                      FREE 🎉
                    </span>
                  ) : (
                    `₹${delivery}`
                  )}
                </span>
              </div>

              <div className="flex justify-between mt-4 text-2xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>

            <button
              onClick={() => setShowCart(false)}
              className="w-full bg-green-600 text-white py-3 rounded-xl mt-5 text-lg font-bold hover:bg-green-700"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
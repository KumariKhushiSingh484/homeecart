import { useCart } from "../context/CartContext";
import { useShopping } from "../context/ShoppingContext";

function CartModal() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    cartDelivery,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
  } = useCart();

  const {
    showCart,
    closeCart,
    openCheckout,
  } = useShopping();

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <div>
            <h2 className="text-2xl font-bold">
              🛒 Shopping Cart
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {cartCount} Item{cartCount !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={closeCart}
            className="text-2xl text-gray-400 hover:text-red-500 transition"
          >
            ✕
          </button>

        </div>

        {/* ================= PRODUCTS ================= */}

        <div className="flex-1 overflow-y-auto px-6 py-4">

          {cartItems.length === 0 ? (

            <div className="flex flex-col items-center justify-center h-full py-16">

              <div className="text-7xl mb-5">
                🛒
              </div>

              <h3 className="text-2xl font-bold">
                Your cart is empty
              </h3>

              <p className="text-gray-500 text-center mt-3">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={closeCart}
                className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            cartItems.map((item) => {

              const price =
                item.sellingPrice ?? item.price;

              return (

                <div
                  key={item.id}
                  className="flex gap-4 py-5 border-b last:border-b-0"
                >

                  {/* Image */}

                  <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        📦
                      </div>

                    )}

                  </div>

                  {/* Product Details */}

                  <div className="flex-1">

                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{price} × {item.quantity}
                    </p>

                    <p className="text-lg font-bold text-green-600 mt-1">
                      ₹{price * item.quantity}
                    </p>

                    <button
                      onClick={() =>
                        deleteFromCart(item.id)
                      }
                      className="mt-2 text-sm text-red-500 hover:text-red-700 transition"
                    >
                      🗑 Remove
                    </button>

                  </div>

                  {/* Quantity Controls */}

                  <div className="flex flex-col justify-center">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold transition"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              );

            })

          )}

        </div>

        {/* ================= FOOTER ================= */}

        {cartItems.length > 0 && (

          <div className="border-t bg-gray-50 px-6 py-5 rounded-b-3xl">

            <div className="flex justify-between mb-2">

              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-medium">
                ₹{cartSubtotal}
              </span>

            </div>

            <div className="flex justify-between mb-2">

              <span className="text-gray-600">
                Delivery
              </span>

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

            <div className="flex justify-between border-t pt-3 mt-3 text-2xl font-bold">

              <span>Total</span>

              <span>
                ₹{cartTotal}
              </span>

            </div>

            <button
              onClick={openCheckout}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Proceed to Checkout →
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default CartModal;
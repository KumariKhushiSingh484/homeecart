function OrderSummary({
  items = [],
  subtotal = 0,
  delivery = null,
  total = 0,
}) {
  const summary = delivery?.summary;

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        📦 Order Summary
      </h2>

      {/* Products */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const price =
              (item.sellingPrice ?? item.price ?? 0) *
              (item.quantity ?? 0);

            return (
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
                  ₹{price}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Pricing */}
      <div className="mt-6 space-y-3 border-t pt-5">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>₹{subtotal}</span>
        </div>

        {summary && (
          <>
            <div className="flex justify-between">
              <span>Delivery Charge</span>

              <span>
                ₹{summary.baseDeliveryCharge}
              </span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>PV Reward</span>

              <span>
                -₹{summary.deliveryReward}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Final Delivery</span>

              <span>
                {summary.finalDeliveryCharge === 0
                  ? "FREE 🎉"
                  : `₹${summary.finalDeliveryCharge}`}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Total Weight</span>

              <span>
                {(summary.totalWeight / 1000).toFixed(
                  2
                )}{" "}
                kg
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Total PV</span>

              <span>{summary.totalPV}</span>
            </div>
          </>
        )}

        <div className="flex justify-between border-t pt-4 text-2xl font-bold">
          <span>Total</span>

          <span className="text-green-600">
            ₹{total}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
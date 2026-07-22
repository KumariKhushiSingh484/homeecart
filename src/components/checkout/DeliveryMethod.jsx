function DeliveryMethod({
  deliveryMethod,
  setDeliveryMethod,
}) {
  return (
    <div className="mt-8 rounded-2xl border bg-gray-50 p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Delivery Method
      </h2>

      <div className="space-y-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition hover:bg-white">
          <input
            type="radio"
            name="deliveryMethod"
            value="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={(e) =>
              setDeliveryMethod(e.target.value)
            }
          />

          <div>
            <p className="font-semibold">
              🚚 Home Delivery
            </p>

            <p className="text-sm text-gray-500">
              Get your groceries delivered to your doorstep.
            </p>
          </div>
        </label>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition hover:bg-white">
          <input
            type="radio"
            name="deliveryMethod"
            value="pickup"
            checked={deliveryMethod === "pickup"}
            onChange={(e) =>
              setDeliveryMethod(e.target.value)
            }
          />

          <div>
            <p className="font-semibold">
              🏪 Store Pickup
            </p>

            <p className="text-sm text-gray-500">
              Collect your order directly from the HomeeCart store.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default DeliveryMethod;
function DeliveryRulesSection({
  settings,
  handleChange,
}) {
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="mb-6 mt-2 border-b pb-2 text-xl font-semibold text-gray-800">
          🚚 Delivery Rules
        </h2>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Delivery Charge (₹)
        </label>

        <input
          type="number"
          min="0"
          className="w-full rounded-lg border p-3"
          value={settings.baseDeliveryCharge}
          onChange={(e) =>
            handleChange(
              "baseDeliveryCharge",
              Number(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Delivery Radius (km)
        </label>

        <input
          type="number"
          min="0"
          className="w-full rounded-lg border p-3"
          value={settings.maxDeliveryDistance}
          onChange={(e) =>
            handleChange(
              "maxDeliveryDistance",
              Number(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Maximum Order Weight (kg)
        </label>

        <input
          type="number"
          min="0"
          className="w-full rounded-lg border p-3"
          value={settings.maxOrderWeight}
          onChange={(e) =>
            handleChange(
              "maxOrderWeight",
              Number(e.target.value)
            )
          }
        />
      </div>
    </>
  );
}

export default DeliveryRulesSection;
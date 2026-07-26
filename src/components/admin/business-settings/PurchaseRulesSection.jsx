function PurchaseRulesSection({
  settings,
  handleChange,
}) {
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="mb-6 mt-2 border-b pb-2 text-xl font-semibold text-gray-800">
          💰 Purchase Rules
        </h2>
      </div>

      <div className="md:col-span-2">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.minimumPurchasePVEnabled}
            onChange={(e) =>
              handleChange(
                "minimumPurchasePVEnabled",
                e.target.checked
              )
            }
          />

          <span className="font-medium">
            Enable Minimum Purchase PV
          </span>
        </label>

        <p className="mt-2 text-sm text-gray-500">
          Customers must reach the minimum PV
          before they can place an order.
        </p>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Minimum Purchase PV
        </label>

        <input
          type="number"
          min="0"
          className="
            w-full
            rounded-lg
            border
            p-3
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
          disabled={
            !settings.minimumPurchasePVEnabled
          }
          value={settings.minimumPurchasePV}
          onChange={(e) =>
            handleChange(
              "minimumPurchasePV",
              Number(e.target.value)
            )
          }
        />
      </div>
    </>
  );
}

export default PurchaseRulesSection;
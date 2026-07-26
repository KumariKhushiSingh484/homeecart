function StoreInformationSection({
  settings,
  handleChange,
}) {
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="mb-6 border-b pb-2 text-xl font-semibold text-gray-800">
          🏪 Store Information
        </h2>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Store Name
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3"
          value={settings.storeName}
          onChange={(e) =>
            handleChange(
              "storeName",
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Store Phone
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3"
          value={settings.storePhone}
          onChange={(e) =>
            handleChange(
              "storePhone",
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Store Address
        </label>

        <textarea
          rows={3}
          className="w-full resize-none rounded-lg border p-3"
          value={settings.storeAddress}
          onChange={(e) =>
            handleChange(
              "storeAddress",
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Store Pincode
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3"
          value={settings.storePincode}
          onChange={(e) =>
            handleChange(
              "storePincode",
              e.target.value
            )
          }
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block font-medium">
          Serviceable Pincodes
        </label>

        <textarea
          rows={3}
          className="w-full resize-none rounded-lg border p-3"
          placeholder="Example: 821307, 821305, 821306"
          value={
            Array.isArray(
              settings.serviceablePincodes
            )
              ? settings.serviceablePincodes.join(
                  ", "
                )
              : ""
          }
          onChange={(e) =>
            handleChange(
              "serviceablePincodes",
              e.target.value
                .split(",")
                .map((pin) => pin.trim())
                .filter(Boolean)
            )
          }
        />

        <p className="mt-2 text-sm text-gray-500">
          Enter multiple pincodes separated
          by commas.
        </p>
      </div>
    </>
  );
}

export default StoreInformationSection;
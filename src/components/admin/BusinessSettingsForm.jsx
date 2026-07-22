function BusinessSettingsForm({
  settings,
  setSettings,
  saveSettings,
  loading,
}) {
  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white shadow rounded-xl p-8 max-w-5xl">

      <h1 className="text-3xl font-bold mb-8">
        Business Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block font-medium mb-2">
            Store Name
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.storeName}
            onChange={(e) =>
              handleChange("storeName", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Store Phone
          </label>

          <input
            className="w-full border rounded-lg p-3"
            value={settings.storePhone}
            onChange={(e) =>
              handleChange("storePhone", e.target.value)
            }
          />
        </div>
<div>
  <label className="block font-medium mb-2">
    Store Address
  </label>

  <textarea
    rows="3"
    className="w-full border rounded-lg p-3 resize-none"
    value={settings.storeAddress}
    onChange={(e) =>
      handleChange("storeAddress", e.target.value)
    }
  />
</div>

<div>
  <label className="block font-medium mb-2">
    Store Pincode
  </label>

  <input
    type="text"
    className="w-full border rounded-lg p-3"
    value={settings.storePincode || ""}
    onChange={(e) =>
      handleChange("storePincode", e.target.value)
    }
  />
</div>
        <div>
          <label className="block font-medium mb-2">
            Delivery Charge (₹)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
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
          <label className="block font-medium mb-2">
            Delivery Radius (km)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={settings.maxDeliveryDistance}
            onChange={(e) =>
              handleChange(
                "maxDeliveryDistance",
                Number(e.target.value)
              )
            }
          />
        </div>
<div className="md:col-span-2">
  <label className="block font-medium mb-2">
    Serviceable Pincodes
  </label>

  <textarea
    rows="3"
    className="w-full border rounded-lg p-3 resize-none"
    placeholder="Example: 821307,821305,821306"
    value={
      Array.isArray(settings.serviceablePincodes)
        ? settings.serviceablePincodes.join(", ")
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
    Enter multiple pincodes separated by commas.
  </p>
</div>
        <div>
          <label className="block font-medium mb-2">
            Maximum Order Weight (g)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={settings.maxOrderWeight}
            onChange={(e) =>
              handleChange(
                "maxOrderWeight",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            PV Reward (%)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={settings.pvRewardPercentage}
            onChange={(e) =>
              handleChange(
                "pvRewardPercentage",
                Number(e.target.value)
              )
            }
          />
        </div>

      </div>

      <div className="mt-8 flex gap-4">

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={settings.isStoreOpen}
            onChange={(e) =>
              handleChange(
                "isStoreOpen",
                e.target.checked
              )
            }
          />

          Store Open

        </label>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={settings.isOrderingEnabled}
            onChange={(e) =>
              handleChange(
                "isOrderingEnabled",
                e.target.checked
              )
            }
          />

          Ordering Enabled

        </label>

      </div>

      <button
        onClick={saveSettings}
        disabled={loading}
        className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>

    </div>
  );
}

export default BusinessSettingsForm;
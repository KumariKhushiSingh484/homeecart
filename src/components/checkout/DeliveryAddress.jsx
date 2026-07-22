function DeliveryAddress({
  pincode,
  setPincode,
  pincodeStatus,
  deliveryAddress,
  setDeliveryAddress,
}) {
  const updateField = (field, value) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        Delivery Details
      </h2>

      {/* Pincode */}

      <label className="mb-2 block font-medium">
        Pincode
      </label>

      <input
        type="text"
        value={pincode}
        maxLength={6}
        onChange={(e) =>
          setPincode(
            e.target.value.replace(/\D/g, "")
          )
        }
        placeholder="Enter your pincode"
        className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {pincode && (
        <div
          className={`mt-3 rounded-xl p-3 text-sm font-medium ${
            pincodeStatus.isValid
              ? "border border-green-300 bg-green-100 text-green-700"
              : "border border-red-300 bg-red-100 text-red-700"
          }`}
        >
          {pincodeStatus.message}
        </div>
      )}

      {/* House Number */}

      <label className="mt-6 mb-2 block font-medium">
        House No. / Flat No.
      </label>

      <input
        type="text"
        value={deliveryAddress.houseNo}
        onChange={(e) =>
          updateField("houseNo", e.target.value)
        }
        placeholder="House No. / Flat No."
        className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Landmark */}

      <label className="mt-6 mb-2 block font-medium">
        Landmark (Optional)
      </label>

      <input
        type="text"
        value={deliveryAddress.landmark}
        onChange={(e) =>
          updateField("landmark", e.target.value)
        }
        placeholder="Near school, temple, hospital..."
        className="w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Address */}

      <label className="mt-6 mb-2 block font-medium">
        Address
      </label>

      <textarea
        rows={4}
        value={deliveryAddress.addressLine}
        onChange={(e) =>
          updateField("addressLine", e.target.value)
        }
        placeholder="Street, Area, Colony..."
        className="w-full resize-none rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

export default DeliveryAddress;
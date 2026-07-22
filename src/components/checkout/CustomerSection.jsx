function CustomerSection({
  customerName,
  phone,
}) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        Customer Information
      </h2>

      <input
        type="text"
        value={customerName}
        readOnly
        className="w-full rounded-xl border bg-gray-100 p-4 text-gray-700"
      />

      <p className="mt-2 text-sm text-gray-500">
        Name is taken from your profile.
      </p>

      <input
        type="text"
        value={phone}
        readOnly
        className="mt-5 w-full rounded-xl border bg-gray-100 p-4 text-gray-700"
      />

      <p className="mt-2 text-sm text-gray-500">
        Phone number cannot be changed during checkout.
      </p>
    </div>
  );
}

export default CustomerSection;
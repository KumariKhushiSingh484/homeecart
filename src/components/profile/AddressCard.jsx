import { useNavigate } from "react-router-dom";

function AddressCard({ customer }) {
  const navigate = useNavigate();

  const addresses = customer.addresses || [];

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          🏠 Saved Addresses
        </h2>

        <button
          onClick={() => navigate("/manage-addresses")}
          className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
        >
          Manage
        </button>

      </div>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">

          <div className="text-5xl">
            📍
          </div>

          <p className="mt-4 text-gray-500">
            No saved addresses yet.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {addresses.map((address) => (
            <div
              key={address.id}
              className={`rounded-2xl border p-5 ${
                address.isDefault
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    {address.label}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {address.address}
                  </p>

                </div>

                {address.isDefault && (
                  <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                    Default
                  </span>
                )}

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AddressCard;
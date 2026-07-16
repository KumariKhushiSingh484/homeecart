function PrimeCard({ customer }) {
  const isPrime = customer?.prime?.isActive;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          ⭐ Prime Membership
        </h2>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            isPrime
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {isPrime ? "ACTIVE" : "INACTIVE"}
        </span>

      </div>

      {isPrime ? (
        <>

          <div className="rounded-2xl border border-green-300 bg-green-50 p-5">

            <p className="text-sm text-gray-500">
              Prime Code
            </p>

            <p className="mt-2 text-lg font-semibold">
              {customer.prime.code}
            </p>

          </div>

          <p className="mt-5 text-green-700">
            🎉 You're enjoying Prime Member benefits.
          </p>

        </>
      ) : (
        <>

          <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-5">

            <p className="text-gray-700">
              Become a HomeEcart Prime Member to unlock
              exclusive offers, discounts, and future
              benefits.
            </p>

          </div>

          <button
            className="mt-6 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
          >
            Activate Prime
          </button>

        </>
      )}

    </div>
  );
}

export default PrimeCard;
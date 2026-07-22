function LocationSection({
  location,
  getLocation,
}) {
  return (
    <div className="mt-8 rounded-2xl border bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Current Location (Optional)
      </h2>

      <p className="mb-5 text-sm text-gray-500">
        Sharing your location helps us verify your address
        and calculate delivery distance in future updates.
      </p>

      <button
        type="button"
        onClick={getLocation}
        className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
      >
        📍 Use My Current Location
      </button>

      {location && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-medium text-green-700">
            ✅ Location Captured Successfully
          </p>

          <a
            href={location}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block break-all text-sm text-blue-600 underline"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default LocationSection;
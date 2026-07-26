function StoreStatusSection({
  settings,
  handleChange,
}) {
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="mb-6 mt-2 border-b pb-2 text-xl font-semibold text-gray-800">
          ⚙️ Store Status
        </h2>
      </div>

      <div className="md:col-span-2 flex flex-wrap gap-8">
        <label className="flex items-center gap-3">
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

          <span className="font-medium">
            Store Open
          </span>
        </label>

        <label className="flex items-center gap-3">
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

          <span className="font-medium">
            Ordering Enabled
          </span>
        </label>
      </div>
    </>
  );
}

export default StoreStatusSection;
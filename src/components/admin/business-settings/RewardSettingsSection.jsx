function RewardSettingsSection({
  settings,
  handleChange,
}) {
  return (
    <>
      <div className="md:col-span-2">
        <h2 className="mb-6 mt-2 border-b pb-2 text-xl font-semibold text-gray-800">
          🎁 Reward Settings
        </h2>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          PV Reward (%)
        </label>

        <input
          type="number"
          min="0"
          max="100"
          className="w-full rounded-lg border p-3"
          value={settings.pvRewardPercentage}
          onChange={(e) =>
            handleChange(
              "pvRewardPercentage",
              Number(e.target.value)
            )
          }
        />
      </div>
    </>
  );
}

export default RewardSettingsSection;
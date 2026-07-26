import StoreInformationSection from "./business-settings/StoreInformationSection";
import DeliveryRulesSection from "./business-settings/DeliveryRulesSection";
import PurchaseRulesSection from "./business-settings/PurchaseRulesSection";
import RewardSettingsSection from "./business-settings/RewardSettingsSection";
import StoreStatusSection from "./business-settings/StoreStatusSection";

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
    <div className="max-w-5xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        Business Settings
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <StoreInformationSection
          settings={settings}
          handleChange={handleChange}
        />

        <DeliveryRulesSection
          settings={settings}
          handleChange={handleChange}
        />

        <PurchaseRulesSection
          settings={settings}
          handleChange={handleChange}
        />

        <RewardSettingsSection
          settings={settings}
          handleChange={handleChange}
        />

        <StoreStatusSection
          settings={settings}
          handleChange={handleChange}
        />

      </div>

      <div className="mt-10 border-t pt-6">
        <button
          onClick={saveSettings}
          disabled={loading}
          className="
            rounded-lg
            bg-green-700
            px-6
            py-3
            text-white
            transition
            hover:bg-green-800
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>

    </div>
  );
}

export default BusinessSettingsForm;
import { useEffect, useState } from "react";

import BusinessSettingsForm from "../components/admin/BusinessSettingsForm";

import {
  getBusinessSettings,
  saveBusinessSettings,
} from "../services/settingsService";

import useToast from "../hooks/useToast";
import ToastNotification from "../components/AppToast";

const DEFAULT_SETTINGS = {
  storeName: "",
  storePhone: "",
  storeAddress: "",

  // New Fields
  storePincode: "",
  serviceablePincodes: [],

  // Existing Fields
  storeLatitude: 0,
  storeLongitude: 0,

  baseDeliveryCharge: 100,
  maxDeliveryDistance: 3,
  maxOrderWeight: 30000,

  pvRewardPercentage: 10,

  minimumOrderAmount: 0,

  isStoreOpen: true,
  isOrderingEnabled: true,
};
function BusinessSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const [loading, setLoading] = useState(false);

  const {
  toast,
  setToast,
  showToast,
} = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getBusinessSettings();

      if (data) {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...data,
        });
      }
    } catch (error) {
  console.error("Failed to load settings", error);

  showToast(
    "error",
    "Failed to load business settings"
  );
} finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setLoading(true);

      await saveBusinessSettings(settings);

      showToast(
  "success",
  "Business settings saved successfully"
);
    } catch (error) {
      console.error(error);

      showToast(
  "error",
  "Failed to save business settings"
);
    } finally {
      setLoading(false);
    }
  }

 return (
  <>
    <ToastNotification
      toast={toast}
      setToast={setToast}
    />

    <BusinessSettingsForm
      settings={settings}
      setSettings={setSettings}
      saveSettings={handleSave}
      loading={loading}
    />
  </>
);
}

export default BusinessSettings;
import { useEffect, useState } from "react";

import BusinessSettingsForm from "../components/admin/BusinessSettingsForm";

import {
  getBusinessSettings,
  saveBusinessSettings,
} from "../services/settingsService";

import useToast from "../hooks/useToast";
import ToastNotification from "../components/AppToast";

const DEFAULT_SETTINGS = {
  // =========================
  // Store Information
  // =========================
  storeName: "",
  storePhone: "",
  storeAddress: "",

  // =========================
  // Delivery Area
  // =========================
  storePincode: "",
  serviceablePincodes: [],

  storeLatitude: 0,
  storeLongitude: 0,

  // =========================
  // Delivery Rules
  // =========================
  baseDeliveryCharge: 100,
  maxDeliveryDistance: 3,
  maxOrderWeight: 30,

  freeDeliveryEnabled: true,
  freeDeliveryMinimum: 100,

  // =========================
  // Purchase Rules
  // =========================
  minimumOrderAmount: 0,

  minimumPurchasePVEnabled: true,
  minimumPurchasePV: 250,

  // =========================
  // Rewards
  // =========================
  pvRewardPercentage: 10,

  // =========================
  // Store Status
  // =========================
  isStoreOpen: true,
  isOrderingEnabled: true,
};

function BusinessSettings() {
  const [settings, setSettings] =
    useState(DEFAULT_SETTINGS);

  const [loading, setLoading] =
    useState(false);

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

      const data =
        await getBusinessSettings();

      setSettings({
        ...DEFAULT_SETTINGS,
        ...(data || {}),
      });
    } catch (error) {
      console.error(
        "Failed to load settings",
        error
      );

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

      await saveBusinessSettings(
        settings
      );

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
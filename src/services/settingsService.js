import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const BUSINESS_SETTINGS_DOC = doc(db, "settings", "business");

/**
 * Fetch business settings from Firestore.
 */
export async function getBusinessSettings() {
  const snapshot = await getDoc(BUSINESS_SETTINGS_DOC);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

/**
 * Create or update business settings.
 */
export async function saveBusinessSettings(settings) {
  await setDoc(BUSINESS_SETTINGS_DOC, settings);
}
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

export const setupRecaptcha = async () => {
  // Clear old verifier if it exists
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
    }
  );

  await window.recaptchaVerifier.render();
};

export const sendOTP = async (phoneNumber) => {
  await setupRecaptcha();

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    window.recaptchaVerifier
  );

  window.confirmationResult = confirmationResult;

  return confirmationResult;
};

export const verifyOTP = async (otp) => {
  const result = await window.confirmationResult.confirm(otp);

  // Clean up after successful verification
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }

  window.confirmationResult = null;

  return result.user;
};

export const logoutCustomer = async () => {
  await signOut(auth);
};
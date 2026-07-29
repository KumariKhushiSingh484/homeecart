import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import { incrementLogins } from "./analyticsService";
import { updateCustomerLogin } from "./customerService";
/**
 * Initialize reCAPTCHA only once.
 * Reuse the existing verifier for OTP resend.
 */
export const setupRecaptcha = async () => {
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

  return window.recaptchaVerifier;
};

/**
 * Send OTP to customer's phone.
 */
export const sendOTP = async (phoneNumber) => {
  const appVerifier = await setupRecaptcha();

  const confirmationResult =
    await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

  window.confirmationResult =
    confirmationResult;

  return confirmationResult;
};

/**
 * Verify OTP entered by customer.
 */
export const verifyOTP = async (otp) => {
  if (!window.confirmationResult) {
    throw new Error(
      "OTP session expired. Please request a new OTP."
    );
  }

  const result =
  await window.confirmationResult.confirm(otp);

await incrementLogins();

await updateCustomerLogin(result.user.uid);

  // Clean up after successful verification
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }

  window.confirmationResult = null;

  return result.user;
};

/**
 * Logout customer.
 */
export const logoutCustomer = async () => {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }

  window.confirmationResult = null;

  await signOut(auth);
};
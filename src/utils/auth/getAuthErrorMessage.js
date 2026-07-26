export function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-phone-number":
      return "Please enter a valid mobile number.";

    case "auth/too-many-requests":
      return "Too many OTP requests. Please try again after a few minutes.";

    case "auth/invalid-verification-code":
      return "The OTP you entered is incorrect.";

    case "auth/code-expired":
      return "Your OTP has expired. Please request a new one.";

    case "auth/network-request-failed":
      return "Please check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
}
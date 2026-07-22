export function validatePincode(
  pincode,
  serviceablePincodes
) {
  const cleanedPincode = pincode.trim();

  if (!/^\d{6}$/.test(cleanedPincode)) {
    return {
      isValid: false,
      message: "Enter a valid 6-digit pincode.",
    };
  }

  if (
    !serviceablePincodes.includes(cleanedPincode)
  ) {
    return {
      isValid: false,
      message:
        "Sorry! We don't deliver to this pincode yet.",
    };
  }

  return {
    isValid: true,
    message: "Delivery available.",
  };
}
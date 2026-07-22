export function validateCheckout({
  customerName,
  phone,
  deliveryAddress,
  cartItems,
  deliveryMethod,
}) {
  /* -------------------------------------------------- */
  /* Customer Name                                      */
  /* -------------------------------------------------- */

  if (!customerName.trim()) {
    return {
      isValid: false,
      message: "Please enter your name.",
    };
  }

  /* -------------------------------------------------- */
  /* Phone Number                                       */
  /* -------------------------------------------------- */

  if (!phone.trim()) {
    return {
      isValid: false,
      message: "Please enter your phone number.",
    };
  }

  const normalizedPhone = phone
    .trim()
    .replace(/\s+/g, "")
    .replace(/^(\+91|91)/, "");

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    return {
      isValid: false,
      message: "Please enter a valid 10-digit phone number.",
    };
  }

  /* -------------------------------------------------- */
  /* Delivery Address                                   */
  /* -------------------------------------------------- */
if (deliveryMethod !== "pickup") {
  if (!deliveryAddress.houseNo.trim()) {
    return {
      isValid: false,
      message: "Please enter house number.",
    };
  }

  if (!deliveryAddress.addressLine.trim()) {
    return {
      isValid: false,
      message: "Please enter your address.",
    };
  }
}

  /* -------------------------------------------------- */
  /* Cart                                               */
  /* -------------------------------------------------- */

  if (!cartItems || cartItems.length === 0) {
    return {
      isValid: false,
      message: "Your cart is empty.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}
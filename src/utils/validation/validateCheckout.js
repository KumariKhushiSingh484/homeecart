export function validateCheckout({
  customerName,
  phone,
  address,
  cartItems,
}) {
  if (!customerName.trim()) {
    return {
      isValid: false,
      message: "Please enter your name.",
    };
  }

  if (!phone.trim()) {
    return {
      isValid: false,
      message: "Please enter your phone number.",
    };
  }

  // Remove spaces and +91 if present
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

  if (!address.trim()) {
    return {
      isValid: false,
      message: "Please enter your delivery address.",
    };
  }

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
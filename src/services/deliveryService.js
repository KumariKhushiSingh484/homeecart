import { convertToGrams } from "../utils/unitConverter";

/**
 * Calculate total shipment weight in grams.
 */
export function calculateTotalWeight(cartItems = []) {
  return cartItems.reduce((totalWeight, item) => {
    const weightInGrams = convertToGrams(
      item.weight,
      item.unit
    );

    return (
      totalWeight +
      weightInGrams * Number(item.quantity || 0)
    );
  }, 0);
}

/**
 * Calculate total Purchase Value (PV).
 */
export function calculateTotalPV(cartItems = []) {
  return cartItems.reduce((totalPV, item) => {
    return (
      totalPV +
      Number(item.pv || 0) * Number(item.quantity || 0)
    );
  }, 0);
}

/**
 * Calculate reward amount from PV.
 */
function calculateDeliveryReward(
  totalPV,
  rewardPercentage
) {
  return Number(
    (
      totalPV *
      (Number(rewardPercentage || 0) / 100)
    ).toFixed(2)
  );
}

/**
 * Calculate final delivery charge.
 */
function calculateDeliveryCharge(
  baseCharge,
  reward
) {
  return Math.max(
    0,
    Number(
      (
        Number(baseCharge || 0) - reward
      ).toFixed(2)
    )
  );
}

/**
 * Validate maximum order weight.
 */
function validateWeight(
  totalWeight,
  maxWeight
) {
  if (
    maxWeight > 0 &&
    totalWeight > maxWeight
  ) {
    return {
      valid: false,
      message: `Maximum order weight is ${maxWeight} grams.`,
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/**
 * Validate delivery distance.
 */
function validateDistance(
  customerDistance,
  maxDistance
) {
  if (
    maxDistance > 0 &&
    customerDistance > maxDistance
  ) {
    return {
      valid: false,
      message:
        "Delivery is not available at your location.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/**
 * Main Delivery Engine
 */
export function calculateDelivery(
  cartItems = [],
  businessSettings = {},
  customerDistance = 0
) {
  const {
    maxOrderWeight = 0,
    maxDeliveryDistance = 0,
    baseDeliveryCharge = 0,
    pvRewardPercentage = 0,
  } = businessSettings;

  const totalWeight =
    calculateTotalWeight(cartItems);

  const totalPV =
    calculateTotalPV(cartItems);

  const weightValidation =
    validateWeight(
      totalWeight,
      maxOrderWeight
    );

  if (!weightValidation.valid) {
    return {
      success: false,
      message: weightValidation.message,
      validation: {
        weight: false,
        distance: true,
      },
    };
  }

  const distanceValidation =
    validateDistance(
      customerDistance,
      maxDeliveryDistance
    );

  if (!distanceValidation.valid) {
    return {
      success: false,
      message: distanceValidation.message,
      validation: {
        weight: true,
        distance: false,
      },
    };
  }

  const deliveryReward =
    calculateDeliveryReward(
      totalPV,
      pvRewardPercentage
    );

  const finalDeliveryCharge =
    calculateDeliveryCharge(
      baseDeliveryCharge,
      deliveryReward
    );

  return {
    success: true,
    message: "",
    validation: {
      weight: true,
      distance: true,
    },
    summary: {
      totalWeight,
      totalPV,
      baseDeliveryCharge,
      deliveryReward,
      finalDeliveryCharge,
    },
  };
}
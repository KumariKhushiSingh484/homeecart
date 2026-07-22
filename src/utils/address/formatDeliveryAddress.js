export function formatDeliveryAddress(deliveryAddress = {}) {
  const {
    houseNo = "",
    landmark = "",
    addressLine = "",
  } = deliveryAddress;

  return [houseNo, landmark, addressLine]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(", ");
}
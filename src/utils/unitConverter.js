export function convertToGrams(weight, unit) {
  const value = Number(weight);

  switch (unit) {
    case "kg":
      return value * 1000;

    case "g":
      return value;

    default:
      return 0;
  }
}

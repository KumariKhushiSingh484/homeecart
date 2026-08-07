export function sortProducts(products) {
  return [...products].sort((a, b) => {
    const pvA = Number(a.pv || 0);
    const pvB = Number(b.pv || 0);

    // Higher PV first
    if (pvB !== pvA) {
      return pvB - pvA;
    }

    const priceA = Number(a.sellingPrice || 0);
    const priceB = Number(b.sellingPrice || 0);

    // Higher selling price first
    if (priceB !== priceA) {
      return priceB - priceA;
    }

    // Alphabetical if everything else is equal
    return a.name.localeCompare(b.name, "en", {
      sensitivity: "base",
    });
  });
}
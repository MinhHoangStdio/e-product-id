export const formatVNDCurrency = (price: number): string =>
  price.toLocaleString("it-IT", { style: "currency", currency: "VND" });

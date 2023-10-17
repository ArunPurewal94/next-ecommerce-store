export const FormatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
};

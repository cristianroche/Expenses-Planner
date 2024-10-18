export const formatQuantity = (quantity) => {
  return Number(quantity).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const generateID = () => {
  const date = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return random + date;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

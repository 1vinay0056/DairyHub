import api from "./api";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (
  product_id: string,
  quantity: number = 1
) => {
  const response = await api.post("/cart", {
    product_id,
    quantity,
  });

  return response.data;
};

export const updateCart = async (
  product_id: string,
  quantity: number
) => {
  const response = await api.put(
    `/cart/${product_id}?quantity=${quantity}`
  );

  return response.data;
};

export const removeCart = async (
  product_id: string
) => {
  const response = await api.delete(
    `/cart/${product_id}`
  );

  return response.data;
};
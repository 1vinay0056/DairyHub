import api from "./api";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  stock: number;
}

/* -------------------- GET ALL PRODUCTS -------------------- */

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

/* -------------------- GET SINGLE PRODUCT -------------------- */

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

/* -------------------- ADD PRODUCT -------------------- */

export const addProduct = async (product: Product) => {
  const response = await api.post("/products", product);
  return response.data;
};

/* -------------------- UPDATE PRODUCT -------------------- */

export const updateProduct = async (
  id: string,
  product: Product
) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

/* -------------------- DELETE PRODUCT -------------------- */

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
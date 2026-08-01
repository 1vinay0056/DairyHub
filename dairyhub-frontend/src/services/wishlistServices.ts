import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================
// Add To Wishlist
// ==========================
export const addToWishlist = async (productId: string) => {
  const response = await API.post("/wishlist/", {
    product_id: productId,
  });

  return response.data;
};

// ==========================
// Get Wishlist
// ==========================
export const getWishlist = async () => {
  const response = await API.get("/wishlist/");

  return response.data;
};

// ==========================
// Remove From Wishlist
// ==========================
export const removeFromWishlist = async (productId: string) => {
  const response = await API.delete(`/wishlist/${productId}`);

  return response.data;
};

// ==========================
// Wishlist Count
// ==========================
export const getWishlistCount = async () => {
  const response = await API.get("/wishlist/count");

  return response.data.count;
};
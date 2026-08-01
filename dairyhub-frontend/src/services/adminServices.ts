import api from "./api";

// ==============================
// Dashboard
// ==============================
export const getDashboardStats = async () => {
  const orders = await api.get("/admin/orders");
  const products = await api.get("/products");

  const users = await api.get("/admin/users");

  const revenue = orders.data.reduce(
    (sum: number, order: any) => sum + order.total,
    0
  );

  return {
    totalOrders: orders.data.length,
    totalProducts: products.data.length,
    totalUsers: users.data.length,
    totalRevenue: revenue,
    recentOrders: orders.data.slice(0, 5),
  };
};

// ==============================
// Orders
// ==============================
export const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  const response = await api.put(
    `/admin/orders/${orderId}?status=${status}`
  );

  return response.data;
};

// ==============================
// Products
// ==============================
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const addProduct = async (data: any) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: any
) => {
  const response = await api.put(
    `/products/${id}`,
    data
  );

  return response.data;
};

export const deleteProduct = async (
  id: string
) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};

// ==============================
// Users
// ==============================
export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const deleteUser = async (
  id: string
) => {
  const response = await api.delete(
    `/admin/users/${id}`
  );

  return response.data;
};
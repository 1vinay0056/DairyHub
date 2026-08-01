import api from "./api";

export interface PlaceOrderData {
  address: string;
  payment_method: "COD" | "ONLINE";
}

export const placeOrder = async (
  data: PlaceOrderData
) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderDetails = async (
  id: string
) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const response = await api.put(
    `/admin/orders/${id}?status=${status}`
  );

  return response.data;
};

export const getUnreadOrderCount = async () => {
  const response = await api.get("/orders/unread-count");
  return response.data.count;
};

export const markOrdersSeen = async () => {
  const response = await api.put("/orders/read-all");
  return response.data;
};
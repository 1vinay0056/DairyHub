import api from "./api";

export const getMessages = async () => {
  const response = await api.get("/contact");
  return response.data;
};
export const getUnreadCount = async () => {
  const response = await api.get("/contact/unread-count");
  return response.data.count;
};

export const markAsRead = async (id: string) => {
  const response = await api.put(`/contact/read/${id}`);
  return response.data;
};

export const getLatestMessages = async () => {
  const response = await api.get("/contact/latest");
  return response.data;
};
export const markAllMessagesRead = async () => {
  const response = await api.put("/contact/read-all");
  return response.data;
};
export const markMessageRead = async (id: string) => {
  const response = await api.put(`/contact/read/${id}`);
  return response.data;
};
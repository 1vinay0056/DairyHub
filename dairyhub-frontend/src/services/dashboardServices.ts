import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const globalSearch = async (query: string) => {
  const response = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};
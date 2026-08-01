import axios from "axios";


const API = "http://127.0.0.1:8000";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/admin/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
import api from "./api";

export const globalSearch = async (query: string) => {
  const response = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};
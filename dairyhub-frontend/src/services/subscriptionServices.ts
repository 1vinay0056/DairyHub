import api from "./api";

export const subscribe = async (
  email: string
) => {
  const response = await api.post(
    "/subscription",
    {
      email,
    }
  );

  return response.data;
};
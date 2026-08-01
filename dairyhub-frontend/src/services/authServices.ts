import api from "./api";

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", userData);
  return response.data;
};

// Login User (OAuth2 Form Data)
export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const formData = new URLSearchParams();

  formData.append("username", userData.email);
  formData.append("password", userData.password);

  const response = await api.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get JWT Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get Logged-in User
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
import api from "./api";

// ==============================
// Get Logged-in User Profile
// ==============================
export const getProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

// ==============================
// Update Profile
// ==============================
export const updateProfile = async (
  name: string,
  email: string
) => {
  const response = await api.put(
    "/profile/update",
    {
      name,
      email,
    }
  );

  return response.data;
};

// ==============================
// Upload Profile Image
// ==============================
export const uploadProfileImage = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/profile/upload-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
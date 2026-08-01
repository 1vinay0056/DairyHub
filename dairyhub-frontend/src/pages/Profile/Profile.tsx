import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  ShoppingBag,
  Heart,
  LogOut,
  Pencil,
  Camera,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../../services/ProfileServices";

interface UserData {
  name: string;
  email: string;
  role: string;
  profile_image?: string;
}

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    role: "",
    profile_image: "",
  });

  const [editOpen, setEditOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data);

      setFormData({
        name: data.name,
        email: data.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await updateProfile(
        formData.name,
        formData.email
      );

      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert("Profile Updated Successfully");

      setEditOpen(false);
    } catch (error: any) {
      alert(
        error?.response?.data?.detail ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    try {
      setUploading(true);

      const res = await uploadProfileImage(
        e.target.files[0]
      );

      const updatedUser = {
        ...user,
        profile_image: res.image,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert("Profile Photo Updated");
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* Header */}

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-center text-white">

            <div className="relative mx-auto h-36 w-36">

              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.name}
                  className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-xl"
                />
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl">

                  <User
                    size={70}
                    className="text-green-600"
                  />

                </div>
              )}

              <label className="absolute bottom-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700">

                <Camera size={18} />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading}
                  onChange={handleImageUpload}
                />

              </label>

            </div>

            <h1 className="mt-5 text-4xl font-bold">
              {user.name || "Guest User"}
            </h1>

            <p className="mt-2 text-green-100">
              {user.email || "No Email"}
            </p>

          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-2">

            {/* Left Side */}

            <div className="space-y-6">

              <div className="flex items-center gap-4 rounded-xl border p-5 shadow-sm">

                <User className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <h3 className="text-lg font-semibold">
                    {user.name}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-xl border p-5 shadow-sm">

                <Mail className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <h3 className="text-lg font-semibold">
                    {user.email}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-xl border p-5 shadow-sm">

                <Shield className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Account Type
                  </p>

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>

                </div>

              </div>

            </div>

            {/* Right Side */}
                        <div className="space-y-5">

              <button
                onClick={() => setEditOpen(true)}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-5 transition hover:bg-green-50"
              >
                <Pencil />
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-5 transition hover:bg-green-50"
              >
                <ShoppingBag />
                My Orders
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-5 transition hover:bg-green-50"
              >
                <Heart />
                Wishlist
              </button>

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl bg-red-600 p-5 font-medium text-white transition hover:bg-red-700"
              >
                <LogOut />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Edit Profile
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-5">

              <div>

                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600"
                />

              </div>

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setEditOpen(false)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save size={18} />

                {saving ? "Saving..." : "Save Changes"}

              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
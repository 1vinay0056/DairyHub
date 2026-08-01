import { useEffect, useState } from "react";

import {
  getUsers,
  deleteUser,
} from "../../services/adminServices";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      console.log("Users:", data);

      setUsers(data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    console.log("Deleting:", id);

    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      alert("User deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete user.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

   

      <div className="flex-1 p-8">

        <div className="mt-0">

          <p className="text-gray-500">
            Manage registered users
          </p>

        </div>

        <div className="my-6">

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border bg-white p-4 outline-none focus:border-green-600"
          />

        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

            <tbody>
  {filteredUsers.length === 0 ? (
    <tr>
      <td
        colSpan={5}
        className="py-12 text-center text-gray-500"
      >
        No users found.
      </td>
    </tr>
  ) : (
    filteredUsers.map((user) => (
      <tr
        key={user.id}
        className="border-b hover:bg-gray-50"
      >
        <td className="px-6 py-4 font-medium">
          {user.name}
        </td>

        <td className="px-6 py-4">
          {user.email}
        </td>

        <td className="px-6 py-4">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {user.role}
          </span>
        </td>

        <td className="px-6 py-4">
          {user.created_at
            ? new Date(
                user.created_at
              ).toLocaleDateString("en-IN")
            : "-"}
        </td>

        <td className="px-6 py-4 text-center">
          <button
            onClick={() => handleDelete(user.id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
);
};

export default Users;
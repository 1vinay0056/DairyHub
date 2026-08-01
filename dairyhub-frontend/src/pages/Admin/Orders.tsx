import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
} from "lucide-react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminServices";

import {
  markOrdersSeen,
} from "../../services/orderServices";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  created_at: string;
}

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function Orders() {

  const [loading, setLoading] =
    useState(true);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const init = async () => {

      await markOrdersSeen();

      await loadOrders();

    };

    init();

  }, []);

  const loadOrders = async () => {

    try {

      setLoading(true);

      const data =
        await getAllOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

      alert("Unable to load orders.");

    } finally {

      setLoading(false);

    }

  };

  const changeStatus = async (
    id: string,
    status: string
  ) => {

    try {

      await updateOrderStatus(
        id,
        status
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );

    } catch (error) {

      console.log(error);

      alert("Unable to update order.");

    }

  };

  const filteredOrders =
    orders.filter((order) => {

      const q =
        search.toLowerCase();

      return (

        order.id
          .toLowerCase()
          .includes(q)

        ||

        order.customer_name
          .toLowerCase()
          .includes(q)

        ||

        order.customer_email
          .toLowerCase()
          .includes(q)

      );

    });

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "Pending":

        return "bg-yellow-100 text-yellow-700";

      case "Processing":

        return "bg-blue-100 text-blue-700";

      case "Shipped":

        return "bg-purple-100 text-purple-700";

      case "Delivered":

        return "bg-green-100 text-green-700";

      case "Cancelled":

        return "bg-red-100 text-red-700";

      default:

        return "bg-gray-100 text-gray-700";

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

      </div>

    );

  }
  return (

<div className="w-full">

  {/* Top */}

  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    <div>


      <p className="mt-1 text-slate-500">

        Manage all customer orders

      </p>

    </div>

  </div>



  {/* Table */}

  <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

    <div className="overflow-x-auto">

      <table className="w-full table-fixed">

        <thead className="bg-slate-100">

          <tr>

            <th className="w-[120px] px-3 py-4 text-left text-sm font-semibold">

              Order ID

            </th>

            <th className="w-[150px] px-3 py-4 text-left text-sm font-semibold">

              Customer

            </th>

            <th className="w-[220px] px-3 py-4 text-left text-sm font-semibold">

              Email

            </th>

            <th className="w-[90px] px-3 py-4 text-center text-sm font-semibold">

              Total

            </th>

            <th className="w-[120px] px-3 py-4 text-center text-sm font-semibold">

              Date

            </th>

            <th className="w-[130px] px-3 py-4 text-center text-sm font-semibold">

              Status

            </th>

            <th className="w-[100px] px-3 py-4 text-center text-sm font-semibold">

              Action

            </th>

          </tr>

        </thead>

        <tbody>

          {filteredOrders.length === 0 ? (

            <tr>

              <td
                colSpan={7}
                className="py-16 text-center text-slate-500"
              >

                No Orders Found

              </td>

            </tr>

          ) : (

            filteredOrders.map((order) => (
                            <tr
                key={order.id}
                className="border-b transition hover:bg-slate-50"
              >

                {/* Order ID */}

                <td className="px-3 py-4 text-sm font-medium text-slate-700">

                  #{order.id.slice(-8)}

                </td>

                {/* Customer */}

                <td className="px-3 py-4">

                  <div className="font-medium text-slate-800 break-words">

                    {order.customer_name || "Customer"}

                  </div>

                </td>

                {/* Email */}

                <td className="px-3 py-4">

                  <p className="break-all text-sm text-slate-600">

                    {order.customer_email}

                  </p>

                </td>

                {/* Total */}

                <td className="px-3 py-4 text-center font-bold text-green-600">

                  ₹{order.total}

                </td>

                {/* Date */}

                <td className="px-3 py-4 text-center text-sm text-slate-600">

                  {new Date(
                    order.created_at
                  ).toLocaleDateString("en-IN")}

                </td>

                {/* Status */}

                <td className="px-3 py-4 text-center">

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </td>

                {/* Action */}

                <td className="px-3 py-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-green-600"
                  >
                    {statusOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </div>

</div>

);
}
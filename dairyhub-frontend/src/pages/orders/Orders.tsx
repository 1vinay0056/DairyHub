import { useEffect, useState } from "react";
import { Package, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../services/orderServices";

interface OrderItem {
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: string;
  address: string;
  payment_method: string;
  status: string;
  total: number;
  created_at: string;
  items: OrderItem[];
}

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      console.log("Orders API:", data);

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          size={45}
          className="animate-spin text-green-600"
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Package
          size={90}
          className="text-green-600"
        />

        <h1 className="mt-5 text-4xl font-bold">
          No Orders Found
        </h1>

        <p className="mt-2 text-gray-500">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-8 text-4xl font-bold">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order.id.slice(-6).toUpperCase()}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                  <p className="mt-2">
                    <strong>Status:</strong>{" "}
                    {order.status}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.payment_method}
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-3xl font-bold text-green-600">
                    ₹{order.total}
                  </h2>

                  <button
                    onClick={() =>
                      navigate(`/orders/${order.id}`)
                    }
                    className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <hr className="my-5" />

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <h3 className="font-bold text-green-600">
                      ₹{item.subtotal}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
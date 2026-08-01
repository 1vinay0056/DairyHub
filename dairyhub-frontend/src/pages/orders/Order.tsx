import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { getOrderDetails } from "../../services/orderServices";

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

export default function Order() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      setLoading(true);

      if (!id) return;

      const data = await getOrderDetails(id);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={45} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Order Not Found</h1>

        <button
          onClick={() => navigate("/orders")}
          className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">

        <button
          onClick={() => navigate("/orders")}
          className="mb-6 flex items-center gap-2 text-green-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="mb-4 text-3xl font-bold">
          Order #{order.id.slice(-6).toUpperCase()}
        </h1>

        <p className="mb-1">
          <strong>Status:</strong> {order.status}
        </p>

        <p className="mb-1">
          <strong>Payment:</strong> {order.payment_method}
        </p>

        <p className="mb-6">
          <strong>Address:</strong> {order.address}
        </p>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>

                <p>₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>
              </div>

              <h3 className="font-bold text-green-600">
                ₹{item.subtotal}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <h2 className="text-3xl font-bold text-green-600">
            Total: ₹{order.total}
          </h2>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Loader2,
  ShoppingCart,
} from "lucide-react";

import {
  getCart,
  updateCart,
  removeCart,
} from "../../services/cartServices";

interface CartItem {
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}


export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseQty = async (
    productId: string,
    qty: number
  ) => {
    try {
      setUpdating(true);

      await updateCart(productId, qty + 1);

      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const decreaseQty = async (
    productId: string,
    qty: number
  ) => {
    if (qty <= 1) return;

    try {
      setUpdating(true);

      await updateCart(productId, qty - 1);

      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteItem = async (
    productId: string
  ) => {
    if (!window.confirm("Remove this product from cart?")) {
      return;
    }

    try {
      setUpdating(true);

      await removeCart(productId);

      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + gst;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          className="animate-spin text-green-600"
          size={45}
        />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">

        <ShoppingCart
          size={90}
          className="text-green-600"
        />

        <h1 className="mt-6 text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          Looks like you haven't added any products yet.
        </p>

        <a
          href="/products"
          className="mt-8 rounded-xl bg-green-600 px-8 py-4 text-white font-semibold hover:bg-green-700"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-2 text-4xl font-bold">
          Shopping Cart
        </h1>

        <p className="mb-10 text-gray-600">
          {cartItems.length} item(s) in your cart
        </p>

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

                        {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center gap-6 rounded-3xl bg-white p-6 shadow-lg"
              >
                <img
                  src={item.image || "/images/no-image.png"}
                  alt={item.name}
                  className="h-28 w-28 rounded-xl object-contain"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-black">
                    {item.name}
                  </h2>

                  <p className="mt-3 text-2xl font-bold text-green-700">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    disabled={updating}
                    onClick={() =>
                      decreaseQty(
                        item.product_id,
                        item.quantity
                      )
                    }
                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-8 text-center text-lg font-bold">
                    {item.quantity}
                  </span>

                  <button
                    disabled={updating}
                    onClick={() =>
                      increaseQty(
                        item.product_id,
                        item.quantity
                      )
                    }
                    className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  disabled={updating}
                  onClick={() =>
                    deleteItem(item.product_id)
                  }
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-3xl bg-white p-8 shadow-xl">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-green-700" />

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>

                <span className="font-bold text-green-600">
                  FREE
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>

                <span>₹{gst}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>₹{total}</span>
              </div>
            </div>

            <input
              placeholder="Coupon Code"
              className="mt-8 w-full rounded-xl border p-3 outline-none"
            />

            <button className="mt-4 w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-900">
              Apply Coupon
            </button>

            <button
    onClick={() => navigate("/checkout")}
    className="mt-6 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700"
  >
    Proceed to Checkout
  </button>
          </div>
        </div>
      </div>
    </section>
  );
}
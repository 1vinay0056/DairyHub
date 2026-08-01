import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistServices";

import { addToCart } from "../../services/cartServices";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

interface WishlistItem {
  wishlist_id: string;
  product: Product;
}

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data);
    } catch (error) {
      console.error("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId);

      setWishlist((prev) =>
        prev.filter(
          (item) => item.product._id !== productId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);

      await removeFromWishlist(productId);

      setWishlist((prev) =>
        prev.filter(
          (item) => item.product._id !== productId
        )
      );

      alert("Moved to Cart Successfully");
    } catch (error) {
      console.error(error);
      alert("Unable to move product to cart");
    }
  };
    if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading Wishlist...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 flex items-center justify-between">
          <h1 className="flex items-center gap-3 text-4xl font-bold">
            <Heart className="text-red-500" />
            My Wishlist
          </h1>

          <button
            onClick={() => navigate("/products")}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Continue Shopping
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow">
            <Heart
              size={80}
              className="mx-auto mb-6 text-red-500"
            />

            <h2 className="mb-3 text-3xl font-bold">
              Your Wishlist is Empty
            </h2>

            <p className="mb-8 text-gray-600">
              Add your favourite dairy products here.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item.wishlist_id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    {item.product.description}
                  </p>

                  <h3 className="mt-4 text-2xl font-bold text-green-600">
                    ₹{item.product.price}
                  </h3>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() =>
                        handleMoveToCart(item.product._id)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-white hover:bg-green-700"
                    >
                      <ShoppingCart size={18} />
                      Move to Cart
                    </button>

                    <button
                      onClick={() =>
                        handleRemove(item.product._id)
                      }
                      className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
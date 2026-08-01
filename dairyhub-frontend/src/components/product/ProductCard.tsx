import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

import { addToCart } from "../../services/cartServices";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistServices";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  stock: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount =
    product.originalPrice &&
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  useEffect(() => {
    loadWishlistStatus();
  }, []);

  const loadWishlistStatus = async () => {
    try {
      const items = await getWishlist();

      const exists = items.some(
        (item: any) => item.product._id === product.id
      );

      setIsWishlisted(exists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await removeFromWishlist(product.id);
        setIsWishlisted(false);
      } else {
        await addToWishlist(product.id);
        setIsWishlisted(true);
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Wishlist operation failed."
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      setLoading(true);

      await addToCart(product.id, 1);

      alert(`${product.name} added to cart.`);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to add product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
        <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute left-4 top-4">
            <Badge color="red">{discount}% OFF</Badge>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md shadow-md transition-all duration-300 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
          }`}
        >
          <FaHeart />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2 p-3">
        {/* Category */}
        <Badge color="blue">{product.category}</Badge>

        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h2 className="line-clamp-2 text-base font-semibold text-gray-800 transition-colors hover:text-green-700">
            {product.name}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1">
            <FaStar className="text-sm text-yellow-500" />
            <span className="text-sm font-semibold">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <span className="text-sm text-gray-500">
            Trusted Product
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-3">
          <span className="text-1xl font-bold text-green-700">
            ₹{product.price}
          </span>

          {product.originalPrice &&
            product.originalPrice > product.price && (
              <span className="pb-1 text-base text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              product.stock ? "bg-green-500" : "bg-red-500"
            }`}
          />

          <span
            className={`text-sm font-medium ${
              product.stock
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {product.stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Button */}
        <Button
          className="mt-2 flex w-full items-center justify-center rounded-xl py-2 text-sm font-semibold transition-all duration-300"
          disabled={!product.stock || loading}
          onClick={handleAddToCart}
        >
          <FaShoppingCart className="mr-2" />

          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
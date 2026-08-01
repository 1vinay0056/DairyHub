import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import ProductGrid from "../../components/product/ProductGrid";

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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products");

      const formatted: Product[] = res.data.map((item: any) => ({
        id: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        originalPrice: item.originalPrice || item.price,
        rating: item.rating || 5,
        stock: item.stock > 0,
        category: item.category,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );
  }, [products, search]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-4">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[3px]">Our Dairy Products</p>

       

        {search && (
          <p className="mt-3 text-green-700 font-medium">
            Search Results for: "{search}"
          </p>
        )}
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
};

export default Products;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import ProductTable from "../../components/Admin/ProductTable";

import {
  getProducts,
  deleteProduct,
} from "../../services/adminServices";

interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  stock: boolean;
}

const Products = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete product.");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-product/${id}`);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

          <p className="font-medium text-slate-500">
            Loading Products...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage all dairy products
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 sm:w-auto"
        >
          <Plus size={18} />

          Add Product
        </button>

      </div>

    
            {/* Product Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {products.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-16">

            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="No Products"
              className="mb-4 h-24 w-24 opacity-60"
            />

            <button
              onClick={() => navigate("/admin/add-product")}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Add Product
            </button>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <ProductTable
              products={products.map((item) => ({
                id: item._id,
                name: item.name,
                category: item.category,
                image: item.image,
                price: item.price,
                stock: item.stock,
              }))}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>

        )}

      </div>
          </div>
  );
};

export default Products;
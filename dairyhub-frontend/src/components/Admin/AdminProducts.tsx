import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import {
  Product,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../../services/productServices";
import DeleteModal from "../../components/Admin/DeleteModal";
import ProductModal from "../../components/Admin/ProductModal";

const AdminProducts = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);

const [deleteLoading, setDeleteLoading] = useState(false);
const handleDeleteClick = (
  id: string,
  name: string
) => {
  setDeleteProductId(id);
  setDeleteProductName(name);
  setDeleteOpen(true);
};

const handleDelete = async () => {
  try {
    setDeleteLoading(true);

    await deleteProduct(deleteProductId);

    setDeleteOpen(false);

    loadProducts();
  } catch (err) {
    console.error(err);
    alert("Delete failed.");
  } finally {
    setDeleteLoading(false);
  }
};

const [deleteProductId, setDeleteProductId] =
  useState<string>("");

const [deleteProductName, setDeleteProductName] =
  useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  // =========================
  // Load Products
  // =========================

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // Search
  // =========================

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // =========================
  // Modal
  // =========================

  const handleAddClick = () => {
    setSelectedProduct(null);
    setOpenModal(true);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      if (selectedProduct?._id) {
        await updateProduct(selectedProduct._id, product);
      } else {
        await addProduct(product);
      }

      setOpenModal(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    }
  };

  return (
    
    <>
      <div className="space-y-6">
        <DeleteModal
  open={deleteOpen}
  title={deleteProductName}
  loading={deleteLoading}
  onClose={() => setDeleteOpen(false)}
  onDelete={handleDelete}
/>

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Products
            </h1>

            <p className="mt-1 text-gray-500">
              Manage all dairy products
            </p>

          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Product
          </button>

        </div>

        {/* Search */}

        <div className="relative max-w-sm">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr className="text-left">

                <th className="px-6 py-4">Image</th>

                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={7}
                    className="py-16 text-center"
                  >
                    Loading Products...
                  </td>

                </tr>

              ) : filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="py-16 text-center text-gray-500"
                  >
                    No products found.
                  </td>

                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="px-6 py-4">
                      {product.category}
                    </td>

                    <td className="px-6 py-4">
                      ₹{product.price}
                    </td>

                    <td className="px-6 py-4">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            handleEditClick(product)
                          }
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
  onClick={() =>
    handleDeleteClick(
      product._id!,
      product.name
    )
  }
  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
>
  <Trash2 size={18} />
</button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {!loading && (

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Package size={16} />

            Total Products:
            <strong>{filteredProducts.length}</strong>

          </div>

        )}

      </div>

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSaveProduct}
        product={selectedProduct}
      />
    </>
  );
};

export default AdminProducts;
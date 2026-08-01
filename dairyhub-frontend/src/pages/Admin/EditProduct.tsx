import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



import {
  getProducts,
  updateProduct,
} from "../../services/adminServices";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
    stock: true,
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const products = await getProducts();

      const item = products.find(
        (p: any) => p._id === id
      );

      if (!item) {
        alert("Product not found");
        navigate("/admin/products");
        return;
      }

      setProduct({
        name: item.name || "",
        category: item.category || "",
        description: item.description || "",
        image: item.image || "",
        price: String(item.price || ""),
        quantity: String(item.quantity || ""),
        stock: item.stock ?? true,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProduct(id!, {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      });

      alert("Product updated successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Unable to update product.");
    } finally {
      setSaving(false);
    }
  };

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

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

          <h1 className="mb-8 text-3xl font-bold">
            Edit Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
                        <div>
              <label className="mb-2 block font-semibold">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Category
              </label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              >
                <option value="">Select Category</option>
                <option value="Milk">Milk</option>
                <option value="Curd">Curd</option>
                <option value="Paneer">Paneer</option>
                <option value="Butter">Butter</option>
                <option value="Cheese">Cheese</option>
                <option value="Ghee">Ghee</option>
                <option value="Lassi">Lassi</option>
                <option value="Buttermilk">Buttermilk</option>
                <option value="Flavoured Milk">
                  Flavoured Milk
                </option>
                <option value="Sweets">Sweets</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-semibold">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                name="description"
                rows={5}
                value={product.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Stock Status
              </label>

              <select
                value={String(product.stock)}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: e.target.value === "true",
                  })
                }
                className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
              >
                <option value="true">
                  In Stock
                </option>

                <option value="false">
                  Out of Stock
                </option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4">

              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="rounded-xl border border-gray-300 px-8 py-3 font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
              >
                {saving ? "Updating..." : "Update Product"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Product } from "../../services/productServices";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  product?: Product | null;
}

const ProductModal = ({
  open,
  onClose,
  onSubmit,
  product,
}: Props) => {
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    category: "",
    image: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    } else {
      setForm({
        name: "",
        description: "",
        category: "",
        image: "",
        price: 0,
        stock: 0,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-2xl font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div>

            <label className="mb-2 block font-medium">
              Product Name
            </label>

            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block font-medium">
                Category
              </label>

              <input
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Image URL
              </label>

              <input
                required
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block font-medium">
                Price
              </label>

              <input
                required
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Stock
              </label>

              <input
                required
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

          </div>

          {form.image && (
            <div>

              <p className="mb-2 font-medium">
                Preview
              </p>

              <img
                src={form.image}
                alt="Preview"
                className="h-36 rounded-lg border object-cover"
              />

            </div>
          )}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              {product ? "Update Product" : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductModal;
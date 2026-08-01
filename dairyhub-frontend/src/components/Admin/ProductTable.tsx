import { Pencil, Trash2 } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  stock: boolean;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">
          Product Management
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Image
              </th>

              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Price
              </th>

              <th className="px-6 py-4 text-left">
                Stock
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="px-6 py-4">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-4">

                    {product.stock ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        In Stock
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        Out of Stock
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => onEdit(product.id)}
                        className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
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

    </div>
  );
};

export default ProductTable;
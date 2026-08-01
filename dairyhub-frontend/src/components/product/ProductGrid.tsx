import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Products Found
          </h2>

          <p className="mt-2 text-gray-500">
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
};

export default ProductGrid;
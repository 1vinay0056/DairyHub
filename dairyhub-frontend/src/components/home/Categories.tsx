import { useEffect, useState } from "react";
import api from "../../services/api";
import CategoryCard from "./CategoryCard";

interface Category {
  title: string;
  image: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/products");

      const uniqueCategories = Array.from(
        new Map(
          res.data.map((item: any) => [
            item.category,
            {
              title: item.category,
              image: item.image,
            },
          ])
        ).values()
      );

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-green-600">
            Products
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            Explore Dairy Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Fresh dairy products delivered directly from our farms.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              route={`/products?category=${category.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
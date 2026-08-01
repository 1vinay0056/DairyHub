interface ProductFilterProps {
  category: string;
  setCategory: (category: string) => void;
}

const categories = [
  "All",
  "Milk",
  "Paneer",
  "Curd",
  "Butter",
  "Cheese",
  "Ghee",
  "Lassi",
  "Ice Cream",
  "Sweets",
];

const ProductFilter = ({
  category,
  setCategory,
}: ProductFilterProps) => {
  return (
    <div className="my-8 flex flex-wrap gap-3">

      {categories.map((item) => (

        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
            category === item
              ? "bg-green-600 text-white shadow-lg"
              : "border border-gray-300 bg-white text-black hover:border-green-600 hover:bg-green-50"
          }`}
        >
          {item}
        </button>

      ))}

    </div>
  );
};

export default ProductFilter;
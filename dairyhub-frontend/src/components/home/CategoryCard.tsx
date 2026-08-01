import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  price: string;
  route: string;
}

export default function CategoryCard({
  title,
  image,
  price,
  route,
}: CategoryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="
      group
      cursor-pointer
      overflow-hidden
      rounded-3xl
      bg-white
      border
      border-gray-100
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-2
    "
    >
      {/* Image */}

      <div className="bg-gray-100 p-5">

        <img
          src={image}
          alt={title}
          className="
          h-44
          w-full
          object-contain
          transition
          duration-300
          group-hover:scale-110
        "
        />

      </div>

      {/* Details */}

      <div className="px-5 py-5 text-center">

        <h3 className="text-2xl font-bold text-black">
          {title}
        </h3>

        <p className="mt-2 text-xl text-green-700 font-semibold">
          {price}
        </p>

        <button
          className="
          mt-6
          w-full
          rounded-xl
          bg-green-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-green-700
        "
        >
          Shop Now
          <ArrowRight
            size={18}
            className="inline ml-2"
          />
        </button>

      </div>
    </div>
  );
}
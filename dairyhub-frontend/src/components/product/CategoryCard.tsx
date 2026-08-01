import Card from "../ui/Card";

interface CategoryCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const CategoryCard = ({
  title,
  image,
  onClick,
}: CategoryCardProps) => {
  return (
    <Card
      className="cursor-pointer text-center hover:-translate-y-1"
    >
      <img
        src={image}
        alt={title}
        className="mx-auto h-24 w-24 rounded-full object-cover"
      />

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <button
        onClick={onClick}
        className="mt-4 rounded-lg bg-teal-600 px-5 py-2 text-white hover:bg-teal-700"
      >
        Explore
      </button>
    </Card>
  );
};

export default CategoryCard;
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="relative hidden lg:block">
      <Search
        size={18}
        onClick={handleSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
      />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="ml-8 w-56 rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default SearchBox;
import { Search } from "lucide-react";
import { useSearch } from "../../context/SearchContext";

function SearchBarMobile() {
  const {
    searchTerm,
    setSearchTerm,
  } = useSearch();

  return (
    <div className="px-4 pb-4 md:hidden">
      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          px-4
          py-3
          focus-within:border-green-500
          focus-within:bg-white
          focus-within:shadow-md
        "
      >
        <Search
          size={18}
          className="text-gray-400"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search products..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
          "
        />
      </div>
    </div>
  );
}

export default SearchBarMobile;
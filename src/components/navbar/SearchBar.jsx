import { Search } from "lucide-react";

function SearchBar({
  value = "",
  onChange,
  placeholder = "Search for atta, rice, oil..."
}) {
  return (
    <div className="hidden flex-1 px-8 md:flex">

      <div
        className="
          group
          flex
          w-full
          max-w-2xl
          items-center
          gap-3
          rounded-full
          border
          border-gray-200
          bg-gray-50
          px-5
          py-3
          transition-all
          duration-300
          focus-within:border-green-500
          focus-within:bg-white
          focus-within:shadow-lg
        "
      >
        <Search
          size={20}
          className="text-gray-400 transition-colors group-focus-within:text-green-600"
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            bg-transparent
            text-sm
            text-gray-800
            placeholder:text-gray-400
            outline-none
          "
        />
      </div>

    </div>
  );
}

export default SearchBar;
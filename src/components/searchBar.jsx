function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Search groceries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 rounded-2xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

export default SearchBar;
// components/SearchBar.js
const SearchBar = () => {
    return (
      <div className="flex justify-between items-center py-4 px-8">
        <input
          type="text"
          placeholder="Search posts..."
          className="border border-gray-300 px-3 py-2 rounded-md w-3/4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
      </div>
    );
  };
  
  export default SearchBar;
  
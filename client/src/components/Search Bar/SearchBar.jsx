import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchName } from "../../redux/actions";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchName(input.trim()));
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="search"
        placeholder="Buscar país..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-8 px-3 rounded-l text-sm text-navy bg-white/90 border-0 outline-none w-52 sm:w-64 placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="h-8 px-3 bg-brand-amber text-navy text-sm font-bold rounded-r hover:bg-yellow-400 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;

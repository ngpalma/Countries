import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesName } from "../../redux/actions";

const SearchBar = () => {
  const [countryName, setCountryName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getCountriesName(countryName));
    setCountryName("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Busque un pais por nombre..."
        value={countryName}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>BUSCAR</button>
    </div>
  );
};

export default SearchBar;

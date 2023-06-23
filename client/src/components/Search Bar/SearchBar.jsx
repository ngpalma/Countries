import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [countryName, setCountryName] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getCountriesName(countryName));
    setCountryName("");
  };


  return (
    <div className={style.searchDiv}>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Busque un pais por nombre..."
          value={countryName}
          onChange={handleInputChange}
        />
        <button type="submit">BUSCAR</button>
      </form>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default SearchBar;

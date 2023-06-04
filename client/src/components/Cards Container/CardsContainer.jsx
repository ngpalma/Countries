import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../index";
import { setCurrentPage } from "../../redux/actions";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const currentPage = useSelector((state) => state.currentPage);
  const [currentCards, setCurrentCards] = useState(countries);

  const totalPage = Math.ceil(countries.length / 10);

  const previousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    setCurrentCards(countries.slice(startIndex, endIndex));
  }, [currentPage, countries]);
  return (
    <div>
      <div>
        {currentCards.map((country) => (
          <Card key={country.id} {...country} />
        ))}
      </div>
      <div>
        <button onClick={previousPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default CardsContainer;

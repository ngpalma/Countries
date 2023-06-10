import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../index";
import { setCurrentPage } from "../../redux/actions";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const filterByActivity = useSelector((state) => state.filterActivity);
  const filterByContinent = useSelector((state) => state.filterContinent);
  const currentPage = useSelector((state) => state.currentPage);
  const initialCards =
    filterByContinent.length > 0
      ? filterByContinent
      : filterByActivity.length > 0
      ? filterByActivity
      : countries;
  const [currentCards, setCurrentCards] = useState(initialCards);

  const totalPage = Math.ceil(initialCards.length / 10);

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
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    setCurrentCards(initialCards.slice(startIndex, endIndex));
  }, [currentPage, initialCards]);

  return (
    <div>
      <div className={style.container}>
        {currentCards.map((country) => (
          <Card key={country.id} {...country} />
        ))}
      </div>
      <div className={style.divButtons}>
        <button className={style.prevButton} onClick={previousPage}>
          Prev
        </button>
        <button className={style.nextButton} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;

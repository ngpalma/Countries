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
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);

  const totalPage = Math.ceil(initialCards.length / 10);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

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

  const handlePageClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    const totalPages = Math.ceil(initialCards.length / 10);
    let newStartPage = pageNumber - 2;
    let newEndPage = pageNumber + 2;
    if (newStartPage < 1) {
      newStartPage = 1;
      newEndPage = 5;
    }
    if (newEndPage > totalPages) {
      newEndPage = totalPages;
      newStartPage = Math.max(1, newEndPage - 4);
    }
    setStartPage(newStartPage);
    setEndPage(newEndPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={
            currentPage === i ? style.activePageNumber : style.pageNumber
          }
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * 10;
  //   const endIndex = startIndex + 10;
  //   setCurrentCards(initialCards.slice(startIndex, endIndex));
  // }, [currentPage, initialCards]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    setCurrentCards(initialCards.slice(startIndex, endIndex));

    const totalPages = Math.ceil(initialCards.length / 10);
    let newStartPage = currentPage - 2;
    let newEndPage = currentPage + 2;
    if (newStartPage < 1) {
      newStartPage = 1;
      newEndPage = 5;
    }
    if (newEndPage > totalPages) {
      newEndPage = totalPages;
      newStartPage = Math.max(1, newEndPage - 4);
    }
    setStartPage(newStartPage);
    setEndPage(newEndPage);
  }, [currentPage, initialCards]);

  return (
    <div>
      <div className={style.container}>
        {currentCards.map((country) => (
          <Card key={country.id} {...country} />
        ))}
      </div>
      <div className={style.divButtons}>
        <button
          className={style.prevButton}
          onClick={previousPage}
          hidden={isFirstPage}
        >
          {"<<"} Anterior
        </button>
        {renderPageNumbers()}
        <button
          className={style.nextButton}
          onClick={nextPage}
          hidden={isLastPage}
        >
          Siguiente {">>"}
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;

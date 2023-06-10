import { CardsContainer } from "../../components/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  orderByName,
  orderByPopulation,
  filterByActivity,
  filterByContinent,
  setCurrentPage,
  getAllActivities,
  cleanFilterActivity,
  cleanFilterContinent,
} from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.allActivities);
  const [showSelect, setShowSelect] = useState(false);

  const handleClick = () => {
    dispatch(getAllActivities());
    activities.length ? setShowSelect(true) : setShowSelect(false);
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className={style.ppalHome}>
      <div className={style.HomeFilters}>
        <p>Orden alfabético:</p>
        <select
          name="orderByName"
          onChange={(e) => dispatch(orderByName(e.target.value))}
        >
          {["Orden Ascendente", "Orden Descendente"].map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <p>Cantidad de habitantes:</p>
        <select
          name="orderByPopulation"
          onChange={(e) => dispatch(orderByPopulation(e.target.value))}
        >
          {["Mayor Población", "Menor Población"].map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <p>Continente:</p>
        <select
          name="filterByContinent"
          onChange={(e) => {
            dispatch(cleanFilterActivity());
            dispatch(filterByContinent(e.target.value));
            dispatch(setCurrentPage(1));
          }}
        >
          {[
            "Asia",
            "Europe",
            "Africa",
            "Oceania",
            "Americas",
            "Polar",
            "Antarctic Ocean",
            "Antarctic",
          ].map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>

        <button onClick={handleClick}>Actividad</button>
        {showSelect && (
          <div>
            <p>Actividad:</p>
            <select
              name="filterByActivity"
              onChange={(e) => {
                dispatch(cleanFilterContinent());
                dispatch(filterByActivity(e.target.value));
                dispatch(setCurrentPage(1));
              }}
            >
              {activities.length > 0 &&
                activities.map((e) => (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <button
          onClick={() => {
            dispatch(getAllCountries());
            dispatch(cleanFilterContinent());
            dispatch(cleanFilterActivity());
            dispatch(setCurrentPage(1));
          }}
        >
          TODOS
        </button>
      </div>
      <CardsContainer />
    </div>
  );
};

export default Home;

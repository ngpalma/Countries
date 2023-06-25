import { CardsContainer } from "../../components/index";
import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div className={style.ppalHome}>
      <div className={style.HomeFilters}>
        <div className={style.ordenAlpha}>
          <select
            name="orderByName"
            onChange={(e) => dispatch(orderByName(e.target.value))}
          >
            <option value="" key="first" hidden>Orden alfabético</option>
            {["A-Z", "Z-A"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className={style.ordenPop}>
          <select
            name="orderByPopulation"
            onChange={(e) => dispatch(orderByPopulation(e.target.value))}
          >
            <option value="" key="first" hidden>Cantidad de habitantes</option>

            {["Mayor Población", "Menor Población"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filterCont}>
          <select
            name="filterByContinent"
            onChange={(e) => {
              dispatch(cleanFilterActivity());
              dispatch(filterByContinent(e.target.value));
              dispatch(setCurrentPage(1));
            }}
          >
            <option value="" key="first" hidden>Selecciona un continente</option>

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
        </div>

        {activities.length > 0 && (
          <div className={style.filterAct}>
            <select
              name="filterByActivity"
              onChange={(e) => {
                dispatch(cleanFilterContinent());
                dispatch(filterByActivity(e.target.value));
                dispatch(setCurrentPage(1));
              }}
            >
            <option value="" key="first" hidden>Selecciona una actividad</option>

              {activities.map((e) => (
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
          Borrar filtros
        </button>
      </div>
      <CardsContainer />
    </div>
  );
};

export default Home;

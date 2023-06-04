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
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);
  return (
    <div>
      <div>
        <p>Ordenar por orden alfabético:</p>
        <select
          name="orderByName"
          onChange={(e) => dispatch(orderByName(e.target.value))}
        >
          {["Elija una opción", "Orden Ascendente", "Orden Descendente"].map(
            (e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            )
          )}
        </select>
        <p>Ordenar por cantidad de habitantes:</p>
        <select
          name="orderByPopulation"
          onChange={(e) => dispatch(orderByPopulation(e.target.value))}
        >
          {["Elija una opción", "Mayor Población", "Menor Población"].map(
            (e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            )
          )}
        </select>
        <p>Buscar por continente:</p>
        <select
          name="filterByContinent"
          onChange={(e) => dispatch(filterByContinent(e.target.value))}
        >
          {[
            "",
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
        <p>Buscar por actividad turistica:</p>
        <select
          name="filterByActivity"
          onClick={() => {
            dispatch(getAllActivities());
          }}
          onChange={(e) => {
            dispatch(filterByActivity(e.target.value));
          }}
        >
          {activities &&
            activities.map((e, i) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
        </select>
        <hr />
        <button
          onClick={() => {
            dispatch(getAllCountries());
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

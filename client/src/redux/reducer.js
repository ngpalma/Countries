import {
  GET_ALL_COUNTRIES,
  CREATE_ACTIVITY,
  GET_ALL_ACTIVITIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRY_ID,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  SET_CURRENT_PAGE,
} from "./types.js";

const initialState = {
  allCountries: [],
  allActivities: [],
  idCountry: {},
  postActivity: {},
  currentPage: 1,
  continentCountries: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return { ...state, allCountries: payload };
    case CREATE_ACTIVITY:
      return { ...state, postActivity: payload };
    case GET_ALL_ACTIVITIES:
      return { ...state, allActivities: payload };
    case GET_COUNTRIES_NAME:
      return { ...state, allCountries: payload };
    case GET_COUNTRY_ID:
      return { ...state, idCountry: payload };
    case FILTER_BY_CONTINENT:
      const countries = [...state.allCountries];
      return {
        ...state,
        allCountries: countries.filter((c) => c.continent === payload),
      };
    case FILTER_BY_ACTIVITY:
      const countryAct = [...state.allCountries];
      return {
        ...state,
        allCountries: countryAct.filter((c) =>
          c.activities.some((act) => act.name.includes(payload))
        ),
      };
    case ORDER_BY_NAME:
      const countriesName = [...state.allCountries];
      return {
        ...state,
        allCountries: countriesName.sort((a, b) => {
          if (a.name > b.name) {
            return payload === "Orden Ascendente" ? 1 : -1;
          }
          if (a.name < b.name) {
            return payload === "Orden Ascendente" ? -1 : 1;
          } else return 0;
        }),
      };
    case ORDER_BY_POPULATION:
      const countriesPopulation = [...state.allCountries];
      return {
        ...state,
        allCountries: countriesPopulation.sort((a, b) => {
          if (a.population > b.population) {
            return payload === "Mayor Población" ? -1 : 1;
          }
          if (a.population < b.population) {
            return payload === "Mayor Población" ? 1 : -1;
          } else return 0;
        }),
      };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    default:
      return { ...state };
  }
};

// const funcionOrdenadora = (array, valor, payload) => {
//   array.sort((a, b) => {
//     if (a.prop > b.prop) {
//       return payload === valor ? -1 : 1;
//     }
//     if (a.prop < b.prop) {
//       return payload === valor ? 1 : -1;
//     } else return 0;
//   });
// };

export default rootReducer;

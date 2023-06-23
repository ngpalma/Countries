import {
  GET_ALL_COUNTRIES,
  CREATE_ACTIVITY,
  GET_ALL_ACTIVITIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRIES_NAME_ERROR,
  GET_COUNTRY_ID,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  SET_CURRENT_PAGE,
  CLEAN_FILTER_CONTINENT,
  CLEAN_FILTER_ACTIVITY,
  CLEAN_DETAIL,
  CLEAR_ERROR,
} from "./types.js";

const initialState = {
  allCountries: [],
  allActivities: [],
  idCountry: {},
  postActivity: {},
  currentPage: 1,
  filterContinent: [],
  filterActivity: [],
  error: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return { ...state, allCountries: payload, error: "" };
    case CREATE_ACTIVITY:
      return { ...state, postActivity: payload };
    case GET_ALL_ACTIVITIES:
      return { ...state, allActivities: payload };
    case GET_COUNTRIES_NAME:
      return { ...state, allCountries: payload };
    case GET_COUNTRIES_NAME_ERROR:
      return { ...state, error: payload };
    case GET_COUNTRY_ID:
      return { ...state, idCountry: payload, error: "" };
    case FILTER_BY_CONTINENT:
      const countries = [...state.allCountries];
      return {
        ...state,
        filterContinent: countries.filter((c) => c.continent === payload),
        error: "",
      };
    case FILTER_BY_ACTIVITY:
      const countryAct = [...state.allCountries];
      return {
        ...state,
        filterActivity: countryAct.filter((c) =>
          c.activities.some((act) => act.name.includes(payload))
        ),
        error: "",
      };
    case ORDER_BY_NAME:
      const countriesName = state.filterContinent.length
        ? [...state.filterContinent]
        : state.filterActivity.length
        ? [...state.filterActivity]
        : [...state.allCountries];
      // const countriesName = [...state.allCountries];
      const sortName = countriesName.sort((a, b) => {
        if (a.name > b.name) {
          return payload === "A-Z" ? 1 : -1;
        }
        if (a.name < b.name) {
          return payload === "A-Z" ? -1 : 1;
        } else return 0;
      });
      return {
        ...state,
        filterContinent: state.filterContinent.length
          ? sortName
          : state.filterContinent,
        filterActivity: state.filterActivity.length
          ? sortName
          : state.filterActivity,
        allCountries:
          !state.filterContinent.length && !state.filterActivity.length
            ? sortName
            : state.allCountries,
        error: "",
      };
    case ORDER_BY_POPULATION:
      const countriesPopulation = state.filterContinent.length
        ? [...state.filterContinent]
        : state.filterActivity.length
        ? [...state.filterActivity]
        : [...state.allCountries];
      // const countriesPopulation = [...state.allCountries];
      const sortPop = countriesPopulation.sort((a, b) => {
        if (a.population > b.population) {
          return payload === "Mayor Población" ? -1 : 1;
        }
        if (a.population < b.population) {
          return payload === "Mayor Población" ? 1 : -1;
        } else return 0;
      });
      return {
        ...state,
        filterContinent: state.filterContinent.length
          ? sortPop
          : state.filterContinent,
        filterActivity: state.filterActivity.length
          ? sortPop
          : state.filterActivity,
        allCountries:
          !state.filterContinent.length && !state.filterActivity.length
            ? sortPop
            : state.allCountries,
        error: "",
      };
    case CLEAN_FILTER_CONTINENT:
      return { ...state, filterContinent: [] };
    case CLEAN_FILTER_ACTIVITY:
      return { ...state, filterActivity: [] };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    case CLEAN_DETAIL:
      return { ...state, idCountry: {} };
    case CLEAR_ERROR:
      return { ...state, error: "" };
    default:
      return { ...state };
  }
};

export default rootReducer;

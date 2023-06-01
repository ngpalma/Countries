import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRY_ID,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "./types.js";

const initialState = {
  allCountries: [],
  allActivities: [],
  idCountry: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return { ...state };
  }
};

export default rootReducer;

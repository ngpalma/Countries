import axios from "axios";
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
  CLEAN_FILTER_CONTINENT,
  CLEAN_FILTER_ACTIVITY,
  CLEAN_DETAIL,
  GET_COUNTRIES_NAME_ERROR,
  CLEAR_ERROR,
} from "./types.js";

export const getAllCountries = () => {
  return async (dispatch) => {
    const countries = await axios.get("http://localhost:3001/countries");
    const allCountries = countries.data;
    dispatch({ type: GET_ALL_COUNTRIES, payload: allCountries });
  };
};

export const createActivity = () => {
  return async (dispatch) => {
    const activity = await axios.post("http://localhost:3001/activities");
    const newActivity = activity.data;
    dispatch({ type: CREATE_ACTIVITY, payload: newActivity });
  };
};

export const getAllActivities = () => {
  return async (dispatch) => {
    const activities = await axios.get("http://localhost:3001/activities");
    const allActivities = activities.data;
    dispatch({ type: GET_ALL_ACTIVITIES, payload: allActivities });
  };
};

export const getCountriesName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      const countries = response.data;
      dispatch({ type: CLEAR_ERROR });
      dispatch({
        type: GET_COUNTRIES_NAME,
        payload: countries,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTRIES_NAME_ERROR,
        payload: "Error: ¡El país que busca no existe!",
      });
    }
  };
};

export const getCountryId = (id) => {
  return async (dispatch) => {
    const country = await axios.get(`http://localhost:3001/countries/${id}`);
    const countryId = country.data;
    dispatch({ type: GET_COUNTRY_ID, payload: countryId });
  };
};

export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
};

export const filterByActivity = (activity) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  };
};

export const orderByName = (name) => {
  return {
    type: ORDER_BY_NAME,
    payload: name,
  };
};

export const orderByPopulation = (population) => {
  return {
    type: ORDER_BY_POPULATION,
    payload: population,
  };
};

export function cleanFilterContinent() {
  return {
    type: CLEAN_FILTER_CONTINENT,
  };
}

export function cleanFilterActivity() {
  return {
    type: CLEAN_FILTER_ACTIVITY,
  };
}

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export function cleanDetail() {
  return { type: CLEAN_DETAIL };
}
export function clearError() {
  return { type: CLEAR_ERROR };
}

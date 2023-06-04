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
    const countries = await axios.get(
      `http://localhost:3001/countries?name=${name}`
    );
    const countriesName = countries.data;
    dispatch({ type: GET_COUNTRIES_NAME, payload: countriesName });
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

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};
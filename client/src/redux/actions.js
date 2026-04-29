import {
  SET_CURRENT_PAGE,
  SET_CONTINENT_FILTER,
  SET_ACTIVITY_FILTER,
  SET_SORT,
  SET_SEARCH_NAME,
  CLEAR_FILTERS,
} from "./types.js";

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
export const setContinentFilter = (continent) => ({ type: SET_CONTINENT_FILTER, payload: continent });
export const setActivityFilter = (activity) => ({ type: SET_ACTIVITY_FILTER, payload: activity });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setSearchName = (name) => ({ type: SET_SEARCH_NAME, payload: name });
export const clearFilters = () => ({ type: CLEAR_FILTERS });

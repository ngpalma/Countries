import {
  SET_CURRENT_PAGE,
  SET_CONTINENT_FILTER,
  SET_ACTIVITY_FILTER,
  SET_SORT,
  SET_SEARCH_NAME,
  CLEAR_FILTERS,
} from "./types.js";

const initialState = {
  currentPage: 1,
  continentFilter: "",
  activityFilter: "",
  sortBy: "",
  searchName: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    case SET_CONTINENT_FILTER:
      return { ...state, continentFilter: payload, activityFilter: "", currentPage: 1 };
    case SET_ACTIVITY_FILTER:
      return { ...state, activityFilter: payload, continentFilter: "", currentPage: 1 };
    case SET_SORT:
      return { ...state, sortBy: payload };
    case SET_SEARCH_NAME:
      return { ...state, searchName: payload, continentFilter: "", activityFilter: "", sortBy: "", currentPage: 1 };
    case CLEAR_FILTERS:
      return { ...state, continentFilter: "", activityFilter: "", sortBy: "", searchName: "", currentPage: 1 };
    default:
      return state;
  }
};

export default rootReducer;

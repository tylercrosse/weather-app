import axios from 'axios';

// actions
export const GEOLOCATION_REQUEST = "GEOLOCATION_REQUEST";
export const GEOLOCATION_SUCCESS = "GEOLOCATION_SUCCESS";
export const GEOLOCATION_FAILURE = "GEOLOCATION_FAILURE";

// action creators


// reducers
const locations = (state = {}, action) => {
  switch (action.type) {
    case GEOLOCATION_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
export default locations;

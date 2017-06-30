import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { fetchForecast } from './weather';

// actions
export const GEOLOCATION_REQUEST = "GEOLOCATION_REQUEST";
export const GEOLOCATION_SUCCESS = "GEOLOCATION_SUCCESS";
export const GEOLOCATION_FAILURE = "GEOLOCATION_FAILURE";

// action creators
export const geocode = address => dispatch => {
  dispatch({ type: GEOLOCATION_REQUEST });
  
  geocodeByAddress(address)
    .then(async (results) => {
      const res = results[0];
      const latLng = await getLatLng(res);
      return {
        id: res.place_id,
        address: res.formatted_address,
        ...latLng
      }
    })
    .then((location) => {
      console.log("Success Yay", location);
      dispatch({
        type: GEOLOCATION_SUCCESS,
        payload: {
          ...location
        }
      });
      dispatch(fetchForecast(location))
    })
    .catch(error => {
      console.log("Oh no!", error);
      dispatch({
        type: GEOLOCATION_FAILURE,
        payload: error
      });
    });
};

// reducers
export const location = (state, action) => {
  switch (action.type) {
    case GEOLOCATION_SUCCESS:
      return {
        [action.payload.id]: {
          ...action.payload
        }
      }
    default:
      return state;
  }
}

const locations = (state = {}, action) => {
  switch (action.type) {
    case GEOLOCATION_SUCCESS:
      return {
        ...state,
        ...location(undefined, action)
      };
    default:
      return state;
  }
};
export default locations;

// actions
export const FORECAST_REQUEST = "FORECAST_REQUEST";
export const FORECAST_SUCCESS = "FORECAST_SUCCESS";
export const FORECAST_FAILURE = "FORECAST_FAILURE";

// action creators
export const fetchForecast = ({ lat, lng }) => dispatch => {
  const uri = `/api/forecast/${lat},${lng}`

  dispatch({ type: FORECAST_REQUEST });

  fetch(uri)
    .then(response => response.json())
    .then(json => {
      console.log("Success Yay", json);
      dispatch({
        type: FORECAST_SUCCESS,
        payload: {
          ...json
        }
      });
    })
    .catch(error => {
      console.log("Oh no!", error);
      dispatch({
        type: FORECAST_FAILURE,
        payload: error
      });
    });
};

// reducers
export const location = (state, action) => {
  switch (action.type) {
    case FORECAST_SUCCESS:
      const lat = action.payload.latitude;
      const lng = action.payload.longitude;
      return {
        [lat + ":" + lng]: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

const weather = (state = {}, action) => {
  switch (action.type) {
    case FORECAST_SUCCESS:
      return {
        ...state,
        ...location(undefined, action)
      };
    default:
      return state;
  }
};

export default weather;

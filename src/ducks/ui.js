import { GEOLOCATION_SUCCESS } from './locations';
import { FORECAST_SUCCESS } from './weather';

// actions
export const SHOW_SEARCH = 'SHOW_SEARCH'
export const HIDE_SEARCH = 'HIDE_SEARCH'

// action creators
export const showSearch = () => ({
  type: SHOW_SEARCH
})

export const hideSearch = () => ({
  type: HIDE_SEARCH
})

// reducers
const iniitialUiState = {
  shouldShowSearch: false
}

const ui = (state = iniitialUiState, action) => {
  switch (action.type) {
    case SHOW_SEARCH:
      return { shouldShowSearch: true };
    case GEOLOCATION_SUCCESS:
    case FORECAST_SUCCESS:
    case HIDE_SEARCH:
      return { shouldShowSearch: false };
    default:
      return state;
  }
}

export default ui;

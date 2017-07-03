import { combineReducers } from 'redux';
import locations from './locations';
import weather from './weather';

const rootReducer = combineReducers({
  locations,
  weather
});

export default rootReducer;

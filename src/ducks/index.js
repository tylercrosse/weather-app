import { combineReducers } from 'redux';
import locations from './locations';
import weather from './weather';
import ui from './ui';

const rootReducer = combineReducers({
  locations,
  weather,
  ui
});

export default rootReducer;

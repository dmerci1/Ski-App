import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SettingsReducer from './SettingsReducer';
import DogFormReducer from './DogFormReducer';
import LocationsReducer from './LocationsReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  settings: SettingsReducer,
  dogForm: DogFormReducer,
  locationss: LocationsReducer
});

export default rootReducer;

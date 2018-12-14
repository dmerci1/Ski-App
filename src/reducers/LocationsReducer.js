
import {
  LOCATIONS_FETCH_SUCCESS,
  DOGS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATIONS_FETCH_SUCCESS:
      return action.payload;
      case DOGS_FETCH_SUCCESS:
        return action.payload;
    default:
      return state;
  }
};

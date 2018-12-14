import {
  LOCATION_UPDATE,
  LOCATION_CREATE,
  USER_DOG_CREATE,
  DOG_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  breed: '',
  gender: '',
  age: '',
  bio: '',
  phone: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOCATION_CREATE:
      return INITIAL_STATE;
    case USER_DOG_CREATE:
      return { ...state, INITIAL_STATE };
    case DOG_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

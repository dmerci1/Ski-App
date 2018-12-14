import firebase from 'firebase';
import {
  LOCATION_UPDATE,
  LOCATION_CREATE,
  LOCATIONS_FETCH_SUCCESS,
  DOG_SAVE_SUCCESS,
  DOGS_FETCH_SUCCESS


} from './types';

export const locationUpdate = ({ prop, value }) => {
  return {
    type: LOCATION_UPDATE,
    payload: { prop, value }
  };
};

export const locationCreate = ({ name }) => {
    const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('/locations')
    .push({ name })
    .then(() => {
      dispatch({ type: LOCATION_CREATE });
      navigationProps.navigate('doglist');
  });
  };
};


export const fetchLocations = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('/locations')
      .on('value', snapshot => {
        dispatch({ type: LOCATIONS_FETCH_SUCCESS, payload: snapshot.val() });
      
            console.log(snapshot.val())

      });
  };
};
export const fetchDogs = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('//dogs')
      .on('value', snapshot => {
        dispatch({ type: DOGS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const dogSave = ({ name, breed, gender, age, bio, phone, uid, navigationProps }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/dogs/${uid}`)
    .set({ name, breed, gender, age, bio, phone })
    .then(() => {
      dispatch({ type: DOG_SAVE_SUCCESS });
      navigationProps.navigate('doglist');
  });
  };
};

export const dogDelete = ({ uid, navigationProps }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/dogs/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: DOG_SAVE_SUCCESS });
        navigationProps.navigate('doglist');
      });
  };
};

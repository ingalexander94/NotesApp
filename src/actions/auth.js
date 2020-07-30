import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { startLoading, finishLoading, setError, removeError } from "./ui";
import { cleaningNotes } from "./notes";

export const startWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const {
        user: { uid, displayName },
      } = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(login(uid, displayName));
      dispatch(finishLoading());
      dispatch(removeError());
    } catch (error) {
      dispatch(finishLoading());
      dispatch(setError(error.message));
    }
  };
};

export const createUserWithEmailPassword = (email, password, name) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await user.user.updateProfile({
        displayName: name,
      });
      const {
        user: { uid, displayName },
      } = user;
      dispatch(login(uid, displayName));
      dispatch(finishLoading());
      dispatch(removeError());
    } catch (error) {
      dispatch(finishLoading());
      dispatch(setError(error.message));
    }
  };
};

export const startWithGoogle = () => {
  return async (dispatch) => {
    const {
      user: { uid, displayName },
    } = await firebase.auth().signInWithPopup(googleAuthProvider);
    dispatch(login(uid, displayName));
  };
};

export const logoutFirebase = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(cleaningNotes());
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

const logout = () => ({
  type: types.logout,
});

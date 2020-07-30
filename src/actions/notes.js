import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { editNote } from "../helpers/editNote";
import { uploadPhoto } from "../helpers/uploadPhoto";
import { deleteNote } from "../helpers/deleteNote";

export const createNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const note = {
      title: "",
      body: "",
      imageURL: "",
      date: new Date().getTime(),
    };
    const newNote = await db.collection(`${uid}/journal/notes`).add(note);
    dispatch(addNote(newNote.id, note));
    dispatch(activateNote(newNote.id, note));
  };
};

export const startingLoadNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const editNotes = () => {
  return async (dispatch, getState) => {
    const { auth, notes } = getState();
    await editNote(auth.uid, { ...notes.active });
    dispatch(refreshNote(notes.active.uid, { ...notes.active }));
  };
};

export const uploadPhotoNote = (file) => {
  return async (dispatch, getState) => {
    const { auth, notes } = getState();
    const imageURL = await uploadPhoto(file);
    notes.active.imageURL = imageURL;
    await editNote(auth.uid, { ...notes.active });
    dispatch(refreshNote(notes.active.uid, { ...notes.active, imageURL }));
  };
};

export const deleteNotes = () => {
  return async (dispatch, getState) => {
    const { auth, notes } = getState();
    await deleteNote(auth.uid, notes.active.uid);
    dispatch(removeNote(notes.active.uid));
  };
};

const refreshNote = (uid, note) => ({
  type: types.refreshNote,
  payload: {
    uid,
    note,
  },
});

const addNote = (uid, note) => ({
  type: types.addNote,
  payload: {
    uid,
    ...note,
  },
});

export const activateNote = (uid, note) => ({
  type: types.activeNote,
  payload: {
    uid,
    ...note,
  },
});

export const cleaningNotes = () => ({
  type: types.cleaningLogout,
});

const setNotes = (notes) => ({
  type: types.setNotes,
  payload: notes,
});

const removeNote = (uid) => ({
  type: types.removeNote,
  payload: uid,
});

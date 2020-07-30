import { db } from "../firebase/firebaseConfig";

export const deleteNote = async (uid, uidNote) => {
  await db.doc(`${uid}/journal/notes/${uidNote}`).delete();
};

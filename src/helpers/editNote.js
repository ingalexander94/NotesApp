import { db } from "../firebase/firebaseConfig";

export const editNote = async (uid, note) => {
  const noteUpdate = {
    ...note,
  };
  delete noteUpdate.uid;
  await db.doc(`${uid}/journal/notes/${note.uid}`).update(noteUpdate);
};

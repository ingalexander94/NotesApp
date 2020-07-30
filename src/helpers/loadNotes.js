import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const notes = [];
  const data = await db.collection(`${uid}/journal/notes`).get();
  data.forEach((info) => notes.push({ uid: info.id, ...info.data() }));
  return notes;
};


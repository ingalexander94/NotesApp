import React, { useEffect, useRef } from "react";
import { NotesAppBar } from "./NotesAppBar";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activateNote, deleteNotes } from "../../actions/notes";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm(note);

  const activeUid = useRef(note.uid);

  useEffect(() => {
    if (activeUid.current !== note.uid) {
      reset(note);
      activeUid.current = note.uid;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activateNote(values.uid, { ...values }));
  }, [values, dispatch]);

  const { title, body } = values;

  const handleDeleteNote = () => {
    dispatch(deleteNotes());
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes-content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        >
          {body}
        </textarea>
        {note.imageURL && (
          <div className="notes__image">
            <img src={note.imageURL} alt="Cargando..." />
          </div>
        )}
      </div>
      <button onClick={handleDeleteNote} className="btn btn-danger">
        Borrar
      </button>
    </div>
  );
};

import React from "react";
import { JournalEntries } from "./JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { logoutFirebase } from "../../actions/auth";
import { createNote } from "../../actions/notes";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleLogout = () => {
    dispatch(logoutFirebase());
  };

  const addNote = () => dispatch(createNote());

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i> <span> {auth.name}</span>
        </h3>
        <button onClick={handleLogout} className="btn">
          {" "}
          Logout{" "}
        </button>
      </div>
      <div className="journal__new-entry" onClick={addNote}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5"> New entry </p>
      </div>

      <JournalEntries />
    </aside>
  );
};

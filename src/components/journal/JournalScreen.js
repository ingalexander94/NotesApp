import React from "react";
import { Sidebar } from "./Sidebar";
import { NothingSelected } from "./NothingSelected";
import { NoteScreen } from "../notes/NoteScreen";
import { useSelector } from "react-redux";

export const JournalScreen = () => {
  const { notes } = useSelector((state) => state);

  return (
    <div className="journal_main-content">
      <Sidebar />
      <main>
        {notes.active === null ? <NothingSelected /> : <NoteScreen />}
      </main>
    </div>
  );
};

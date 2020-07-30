import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activateNote } from "../../actions/notes";

const JournalEntry = ({ note }) => {
  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(activateNote(note.uid, { ...note }));
  };

  return (
    <div onClick={handleActiveNote} className="journal__entry pointer">
      {note.imageURL && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundImage: `url(${note.imageURL})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{note.title}</p>
        <p className="journal__entry-content">{`${note.body.substr(
          0,
          40
        )}...`}</p>
      </div>

      <div className="journal__entry-date-box">
        <span> {moment(note.date).format("dddd")} </span>
        <h4>{moment(note.date).format("Do")}</h4>
      </div>
    </div>
  );
};

JournalEntry.propTypes = {
  note: PropTypes.object.isRequired,
};

export default JournalEntry;

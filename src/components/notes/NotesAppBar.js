import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { editNotes, uploadPhotoNote } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const handleSaveNote = () => {
    dispatch(editNotes());
  };

  const handlePictureClick = () => {
    document.getElementById("picture").click();
  };

  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    file && dispatch(uploadPhotoNote(file));
  };

  return (
    <div className="notes__appbar">
      <span> {moment(new Date().getTime()).format("LL")} </span>
      <input
        type="file"
        id="picture"
        onChange={handleChangePicture}
        style={{ display: "none" }}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};

import { types } from "../types/types";

const initState = {
  notes: [],
  active: null,
};

export const noteReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.addNote:
      return {
        ...state,
        notes: [actions.payload, ...state.notes],
      };

    case types.activeNote:
      return {
        ...state,
        active: actions.payload,
      };

    case types.setNotes:
      return {
        ...state,
        notes: actions.payload,
      };

    case types.refreshNote:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.uid === actions.payload.uid ? actions.payload.note : note
        ),
      };

    case types.removeNote:
      return {
        ...state,
        notes: state.notes.filter((note) => note.uid !== actions.payload),
        active: null,
      };

    case types.cleaningLogout:
      return {
        ...initState,
      };

    default:
      return state;
  }
};

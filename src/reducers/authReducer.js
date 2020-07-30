import { types } from "../types/types";

export const authReducer = (state = {}, actions) => {
  switch (actions.type) {
    case types.login:
      return { uid: actions.payload.uid, name: actions.payload.displayName };
    case types.logout:
      return {};

    default:
      return state;
  }
};

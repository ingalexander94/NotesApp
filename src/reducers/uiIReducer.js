import { types } from "../types/types";

const initState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initState, actions) => {
  switch (actions.type) {
    case types.setError:
      return {
        ...state,
        msgError: actions.payload,
      };
    case types.removeError:
      return {
        ...state,
        msgError: null,
      };

    case types.startLoading:
      return {
        ...state,
        loading: true,
      };

    case types.finishLoading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

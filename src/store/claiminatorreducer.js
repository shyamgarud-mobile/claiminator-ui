import * as types from "./claiminatorType";
import { saveLocalData, getLocalData } from "../util/localstorage";
const initialState = {
  isLoading: false,
  isError: false,
  isAuth: true, // false
  user: [],
  claims: [],
  callApi: false,
  singleClaim: [],
  newClaim: {
    userName: "",
    dateOfClaim: "",
    email: "",
    files: [],
  },
};

export const claiminatorReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS: {
      saveLocalData("token", payload.access_token);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        user: payload,
      };
    }
    case types.GET_CLAIM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.GET_CLAIM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        claims: payload,
        callApi:false
      };
    }
    case types.GET_CLAIM_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case types.GET_SINGLE_CLAIM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        singleClaim: payload,
        callApi:false
      };
    }

    case types.ADD_CLAIM_FILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        callApi: true,
      };
    }

    default: {
      return state;
    }
  }
};

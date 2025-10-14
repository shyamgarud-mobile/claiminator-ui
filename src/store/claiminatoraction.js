import * as types from "./claiminatorType";
import axios from "axios";
const hostName = import.meta.env.VITE_HOST_NAME;

// login
export const loginUser = (params) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post(`${hostName}/api/v1/auth/login`, params)
    .then((res) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
      return types.LOGIN_SUCCESS;
    })
    .catch((err) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: err });
      return types.LOGIN_FAILURE;
    });
};

// GET_TASK_REQUEST
export const getAllClaims = () => (dispatch) => {
  dispatch({ type: types.GET_CLAIM_REQUEST });

  return axios
    .get(`${hostName}/api/v1/cases/all-cases`)
    .then((response) => {
      dispatch({ type: types.GET_CLAIM_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: types.GET_CLAIM_FAILURE, payload: error });
    });
};
export const getsingleClaim = (id) => (dispatch) => {
  dispatch({ type: types.GET_CLAIM_REQUEST });

  return axios
    .get(`${hostName}/api/v1/cases/case-rules/${id}`)
    .then((response) => {
      dispatch({
        type: types.GET_SINGLE_CLAIM_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: types.GET_CLAIM_FAILURE, payload: error });
    });
};
export const addClaim = (data) => (dispatch) => {
   dispatch({ type: types.GET_CLAIM_REQUEST });
   return axios
    .post(`${hostName}/api/v1/cases/create-case`,data)
    .then((response) => {
      dispatch({
        type: types.ADD_CLAIM_FILE_SUCCESS,
        payload: response.data,
      });
      return 200
    })
    .catch((error) => {
      dispatch({ type: types.GET_CLAIM_FAILURE, payload: error });
    });
};



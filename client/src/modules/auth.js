import axios from "axios";

const SET_USERID = "auth/SET_USERID";
const SET_TOKEN = "auth/SET_TOKEN";

export const setUserId = (response) => ({ type: SET_USERID });
export const setToken = () => ({ type: SET_TOKEN });

const initialState = {
  userId: "",
  accessToken: "",
};

function auth(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_USERID:
      return state;
    case SET_TOKEN:
      return state;
    default:
      return state;
  }
}

export default auth;

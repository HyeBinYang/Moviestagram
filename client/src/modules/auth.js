const SET_USER = "auth/SET_USER";
const CLEAR_USER = "auth/CLEAR_USER ";

export const setUser = (response) => ({ type: SET_USER, payload: response.data });
export const clearUser = () => ({ type: CLEAR_USER });

const initialState = {
  userName: "",
  accessToken: "",
};

function auth(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const userName = action.payload.userName;
      const accessToken = action.payload.accessToken;

      return {
        userName,
        accessToken,
      };
    case CLEAR_USER:
      return {
        userName: "",
        accessToken: "",
      };
    default:
      return state;
  }
}

export default auth;

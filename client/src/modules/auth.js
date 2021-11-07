const SET_USER = "auth/SET_USER";
const CLEAR_USER = "auth/CLEAR_USER ";

export const setUser = (response) => ({ type: SET_USER, payload: response.data });
export const clearUser = () => ({ type: CLEAR_USER });

const initialState = {
  userId: "",
  accessToken: "",
};

function auth(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const userId = action.payload.userId;
      const accessToken = action.payload.accessToken;

      console.log(userId, accessToken);

      return {
        userId,
        accessToken,
      };
    case CLEAR_USER:
      return {
        userId: "",
        accessToken: "",
      };
    default:
      return state;
  }
}

export default auth;

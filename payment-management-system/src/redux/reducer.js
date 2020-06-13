import {
  SIGN_IN,
  LOGOUT,
  SIGN_UP,
  ADD_GROUP,
  ADD_EXPENSE,
  UPDATE_GROUP,
  DELETE_GROUP,
  UPDATE_CUSTOM_CATEGORY,
  UPDATE_MEMBERS,
} from "./actionTypes";

const reducer = (state, { type, payload }) => {
  console.log(state);
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        isSignin: payload.isSignin,
      };
    case LOGOUT:
      return {
        ...state,
        isSignin: false,
      };
    case SIGN_UP:
      let setuserData = {
        ...payload,
        id: new Date(),
        groups: {},
        expenses: [],
      };
      let email = payload.email;
      console.log(state, "signup");
      const { users } = state;
      return {
        ...state,
        users: { ...users, [payload.email]: setuserData },
      };
    case ADD_GROUP:
      return {
        ...state,
        users: { payload },
      };
    case ADD_EXPENSE:
      return {
        ...state,
      };
    case UPDATE_GROUP:
      return {
        ...state,
      };
    case DELETE_GROUP:
      return {
        ...state,
      };
    case UPDATE_CUSTOM_CATEGORY:
      return {
        ...state,
      };
    case UPDATE_MEMBERS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;

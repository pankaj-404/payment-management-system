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
  console.log(state, "state");
  console.log(payload, "payload");
  let { users, currentUser, isSignin } = state;
  let { groups, expenses } = state.users;
  switch (type) {
    case SIGN_IN:
      console.log(payload);
      return {
        ...state,
        isSignin: payload.isSignin,
        currentUser: payload.email,
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
      // let { users } = state;
      return {
        ...state,
        users: { ...users, [payload.email]: setuserData },
      };
    case ADD_GROUP:
      let groupId = new Date();
      const members = payload.users;
      // const { groups } = state.users;
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload.member],
            groups: {
              ...groups,
              [groupId]: {
                groupName: payload.groupName,
                members: payload.users,
                customCategories: [],
              },
            },
          },
        },
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

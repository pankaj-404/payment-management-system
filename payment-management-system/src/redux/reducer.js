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
  SELECT_GROUP,
} from "./actionTypes";

const reducer = (state, { type, payload }) => {
  console.log(state, "state");
  console.log(payload, "payload");
  let {
    users,
    currentUser,
    isSignin,
    currentGroup,
    currentGroupMembers,
  } = state;
  let { expenses } = state.users;
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
      const userid = new Date().getTime();
      let setuserData = {
        ...payload,
        id: userid,
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
      let groupId = new Date().getTime();
      const members = payload.users;
      console.log(groupId);
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload.member],
            groups: {
              ...users[payload.member]["groups"],
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
      // const timeStamp = new Date();
      // console.log("time", payload);
      const paidBy = users[currentUser]["name"];
      const currentGroupName =
        users[currentUser]["groups"][currentGroup]["groupName"];
      const userShare = Number(payload["amount"]) / currentGroupMembers.length;
      console.log(currentGroupMembers.length, users[currentUser]);
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload.member],
            expenses: [
              ...users[payload.member]["expenses"],
              {
                timeStamp: payload["timeStamp"],
                groupId: payload["currentGroup"],
                amount: payload["amount"],
                category: payload["category"],
                groupName: currentGroupName,
                userShare: userShare,
                isSettled: false,
                paidBy: paidBy,
              },
            ],
          },
        },
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
    case SELECT_GROUP:
      const arr = users[currentUser]["groups"][payload]["members"];
      console.log(arr, "selectGroup");
      return {
        ...state,
        currentGroup: payload,
        currentGroupMembers: arr,
      };

    default:
      return state;
  }
};
export default reducer;

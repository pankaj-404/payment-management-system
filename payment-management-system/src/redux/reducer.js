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
  UPDATE_EXPENSE,
  UPDATE_BORROWED,
  UPDATE_LENT,
  SETTLE_PENDING,
} from "./actionTypes";
import { setData, getData, removeData } from "./localStorage";
const reducer = (state, { type, payload }) => {
  let {
    users,
    currentUser,
    isSignin,
    currentGroup,
    currentGroupMembers,
  } = state;

  let { expenses } = state.users;
  let storageUsers = getData("users");
  let dataObj;

  switch (type) {
    case SIGN_IN:
      setData("isSignin", payload.isSignin);
      setData("currentUser", payload.email);
      return {
        ...state,
        isSignin: payload.isSignin,
        currentUser: payload.email,
      };
    case LOGOUT:
      setData("isSignin", false);
      setData("currentUser", "");
      setData("currentGroup", "");
      setData("currentGroupMembers", []);
      return {
        ...state,
        isSignin: false,
        currentUser: "",
        currentGroup: "",
        currentGroupMembers: [],
      };
    case SIGN_UP:
      const userid = new Date().getTime();
      let setuserData = {
        ...payload,
        id: userid,
        groups: {},
        expenses: [],
      };

      dataObj = {
        ...storageUsers,
        [payload.email]: setuserData,
      };

      setData("users", dataObj);
      return {
        ...state,
        users: { ...users, [payload.email]: setuserData },
      };

    case ADD_GROUP:
      const members = payload.users;

      dataObj = {
        ...storageUsers,
        [payload.member]: {
          ...storageUsers[payload["member"]],
          groups: {
            ...storageUsers[payload["member"]]["groups"],
            [payload.groupId]: {
              groupName: payload.groupName,
              members: payload.users,
              customCategories: [],
            },
          },
        },
      };
      setData("users", dataObj);
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload["member"]],
            groups: {
              ...users[payload["member"]]["groups"],
              [payload.groupId]: {
                groupName: payload.groupName,
                members: payload.users,
                customCategories: [],
              },
            },
          },
        },
      };
    case ADD_EXPENSE:
      const paidBy = users[currentUser]["name"];
      const paidById = users[currentUser]["email"];
      const currentGroupName =
        users[currentUser]["groups"][currentGroup]["groupName"];
      const userShare = Number(payload["amount"]) / currentGroupMembers.length;
      setData("currentGroup", currentGroupName);
      dataObj = {
        ...storageUsers,
        [payload.member]: {
          ...storageUsers[payload.member],
          expenses: [
            ...storageUsers[payload.member]["expenses"],
            {
              timeStamp: payload["timeStamp"],
              groupId: payload["currentGroup"],
              amount: payload["amount"],
              category: payload["category"],
              groupName: currentGroupName,
              userShare: userShare,
              isSettled: payload["isSettled"],
              paidBy: paidBy,
              paidById: paidById,
              type: payload.type,
            },
          ],
        },
      };
      setData("users", dataObj);

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
                isSettled: payload["isSettled"],
                paidBy: paidBy,
                paidById: paidById,
                type: payload.type,
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
      delete users[payload["member"]]["groups"][payload["groupId"]];
      setData("users", users);
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
      setData("currentGroup", payload);
      setData("currentGroupMembers", arr);
      return {
        ...state,
        currentGroup: payload,
        currentGroupMembers: arr,
      };
    case UPDATE_EXPENSE:
      let total =
        Number(users[payload.currentUser]["totalExpense"]) +
        Number(payload.share);
      dataObj = {
        ...storageUsers,
        [payload.currentUser]: {
          ...storageUsers[payload.currentUser],
          totalExpense: total,
        },
      };
      setData("users", dataObj);
      return {
        ...state,
        users: {
          ...users,
          [payload.currentUser]: {
            ...users[payload.currentUser],
            totalExpense: total,
          },
        },
      };
    case UPDATE_BORROWED:
      dataObj = {
        ...storageUsers,
        [payload.member]: {
          ...storageUsers[payload.member],
          youBorrowed:
            Number(users[payload.member]["youBorrowed"]) +
            Number(payload.share),
        },
      };
      setData("users", dataObj);

      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload.member],
            youBorrowed:
              Number(users[payload.member]["youBorrowed"]) +
              Number(payload.share),
          },
        },
      };
    case UPDATE_LENT:
      dataObj = {
        ...storageUsers,
        [payload.member]: {
          ...storageUsers[payload.member],
          youLent: users[payload.member]["youLent"] + payload.share,
        },
      };
      setData("users", dataObj);
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload.member],
            youLent: users[payload.member]["youLent"] + payload.share,
          },
        },
      };
    case SETTLE_PENDING:
      const updatedExpense = users[payload.member][
        "expenses"
      ].map((expense, i) =>
        i != payload.index ? expense : { ...expense, isSettled: true }
      );
      dataObj = {
        ...storageUsers,
        [payload.member]: {
          ...storageUsers[payload.member],
          expenses: updatedExpense,
        },
      };
      setData("users", dataObj);
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload.member],
            expenses: updatedExpense,
          },
        },
      };
    default:
      return state;
  }
};
export default reducer;

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
      return {
        ...state,
        isSignin: payload.isSignin,
        currentUser: payload.email,
      };
    case LOGOUT:
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
      let email = payload.email;
      return {
        ...state,
        users: { ...users, [payload.email]: setuserData },
      };

    case ADD_GROUP:
      let groupId = new Date().getTime();
      const members = payload.users;
      return {
        ...state,
        users: {
          ...users,
          [payload.member]: {
            ...users[payload["member"]],
            groups: {
              ...users[payload["member"]]["groups"],
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
      const paidBy = users[currentUser]["name"];
      const paidById = users[currentUser]["email"];
      const currentGroupName =
        users[currentUser]["groups"][currentGroup]["groupName"];
      const userShare = Number(payload["amount"]) / currentGroupMembers.length;
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
      // console.log(currentGroupMembers, "delete");
      // const abc = Object.keys(users[payload["member"]]["groups"]).flter(
      //   (ele) => ele != payload.groupId
      // );
      // console.log(abc, "arr");
      delete users[payload["member"]]["groups"][payload["groupId"]];

      return {
        ...state,
        // users: {
        //   ...users,
        //   [payload.member]: {
        //     ...users[payload["member"]],
        //     groups: {
        //       ...users[payload["member"]]["groups"],
        //       delete payload["groupId"]
        //     },
        //   },
        // },
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
      return {
        ...state,
        currentGroup: payload,
        currentGroupMembers: arr,
      };
    case UPDATE_EXPENSE:
      let total =
        Number(users[payload.currentUser]["totalExpense"]) +
        Number(payload.share);
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

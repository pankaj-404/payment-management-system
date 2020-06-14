import { createStore } from "redux";
import reducer from "./reducer";
// import data from "../../src/data.json";

const initState = {
  users: {
    "user1@test.com": {
      name: "user1",
      email: "user1@test.com",
      password: "123",
      id: "1592071991122",
      isSignin: false,

      groups: {
        "1592071991122": {
          groupName: "Home",
          members: ["user1@test.com", "user2@test.com"],
          customCategories: [],
        },

        "1592072082488": {
          groupName: "Office",
          members: ["user1@test.com", "user2@test.com"],
          customCategories: ["Hotel"],
        },
      },

      expenses: [
        {
          groupId: "1592071991122",
          groupName: "Home",
          amount: 100,
          timeStamp: "6/14/2020, 11:45:54 AM",
          category: "Food",
          userShare: 50,
          isSettled: false,
          paidBy: "user1",
        },
        {
          groupId: "1592072082488",
          groupName: "Office",
          amount: 200,
          timeStamp: "6/14/2020, 11:46:05 AM",
          category: "Hotel",
          userShare: 100,
          isSettled: false,
          paidBy: "user2",
        },
      ],
    },

    "user2@test.com": {
      email: "user2@test.com",
      name: "user2",
      password: "123",
      id: "1592072487916",
      isSignin: false,

      groups: {
        "1592071991122": {
          groupName: "Home",
          members: ["user1@test.com", "user2@test.com"],
          customCategories: [],
        },

        "1592072082488": {
          groupName: "Office",
          members: ["user1@test.com", "user2@test.com"],
          customCategories: ["Hotel"],
        },
      },

      expenses: [
        {
          groupId: "1592071991122",
          groupName: "Home",
          amount: 100,
          timeStamp: "6/14/2020, 11:45:54 AM",
          category: "Food",
          userShare: 50,
          isSettled: false,
          paidBy: "user1",
        },
        {
          groupId: "1592072082488",
          groupName: "Office",
          amount: 200,
          timeStamp: "6/14/2020, 11:46:05 AM",
          category: "Hotel",
          userShare: 100,
          isSettled: false,
          paidBy: "user2",
        },
      ],
    },
  },
  // email: {},
  // groups: {},
  // expennses: [],
  currentUser: "",
  categories: [
    "Food",
    "Apparel",
    "Health",
    "Education",
    "Transportation",
    "Household",
    "Investment",
    "Others",
  ],
  isSignin: false,
  currentGroup: "",
  currentGroupMembers: [],
};
export const store = createStore(reducer, initState);

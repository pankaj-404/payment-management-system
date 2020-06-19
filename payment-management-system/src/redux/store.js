import { createStore } from "redux";
import reducer from "./reducer";
import { getData } from "./localStorage";

const initState = {
  users: getData("users") || {},

  currentUser: getData("currentUser") || "",
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
  isSignin: getData("isSignin") || false,
  currentGroup: getData("currentGroup") || "",
  currentGroupMembers: getData("currentGroupMembers") || [],
};

export const store = createStore(reducer, initState);

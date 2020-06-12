import { createStore } from "redux";
import reducer from "./reducer";
// import data from "../../src/data.json";

const initState = {
  users: {},
  email: {},
  groups: {},
  expennses: [],
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
};
export const store = createStore(reducer, initState);

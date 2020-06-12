import { createStore } from "redux";
import reducer from "./reducer";
// import data from "../../src/data.json";

const initState = {
  products: [],
  quantity: Number(1),
  cartArr: [],
  orders: [],
  name: "",
  add: "",
  phoneNo: "",
};
export const store = createStore(reducer, initState);

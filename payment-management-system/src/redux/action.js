import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ADD_COUNTER,
  REDUCE_COUNTER,
  DELETE_FROM_CART,
  ADD_TO_CART,
  EDIT_ITEM,
  ADD_TO_ORDERS,
} from "./actionTypes";

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const addToOrders = (payload) => ({
  type: ADD_TO_ORDERS,
  payload,
});

export const deleteFromCart = (payload) => ({
  type: DELETE_FROM_CART,
  payload,
});

export const addItem = (payload) => ({
  type: ADD_ITEM,
  payload,
});

export const deleteItem = (payload) => ({
  type: DELETE_ITEM,
  payload,
});

export const updateItem = (payload) => ({
  type: UPDATE_ITEM,
  payload,
});

export const addCounter = (payload) => ({
  type: ADD_COUNTER,
  payload,
});

export const reduceCounter = (payload) => ({
  type: REDUCE_COUNTER,
  payload,
});

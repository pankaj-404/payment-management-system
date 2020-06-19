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

export const signin = (payload) => ({
  type: SIGN_IN,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});

export const signup = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const addGroup = (payload) => ({
  type: ADD_GROUP,
  payload,
});

export const deleteGroup = (payload) => ({
  type: DELETE_GROUP,
  payload,
});

export const updateGroup = (payload) => ({
  type: UPDATE_GROUP,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const updateCustomCategory = (payload) => ({
  type: UPDATE_CUSTOM_CATEGORY,
  payload,
});

export const updateMembers = (payload) => ({
  type: UPDATE_MEMBERS,
  payload,
});
export const updateExpense = (payload) => ({
  type: UPDATE_EXPENSE,
  payload,
});
export const updateBorrowed = (payload) => ({
  type: UPDATE_BORROWED,
  payload,
});
export const updateLent = (payload) => ({
  type: UPDATE_LENT,
  payload,
});

export const selectGroup = (payload) => ({
  type: SELECT_GROUP,
  payload,
});

export const settlePending = (payload) => ({
  type: SETTLE_PENDING,
  payload,
});

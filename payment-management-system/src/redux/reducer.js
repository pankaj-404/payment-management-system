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
  console.log(state);
  const { email } = { ...payload };
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
      };
    case LOGOUT:
      // let newTodo = state.products.filter((ele) => ele.id !== payload);
      return {
        ...state,
      };
    case SIGN_UP:
      // let newCartArr = state.cartArr.filter((ele) => ele.id != payload);
      // console.log(newCartArr);
      return {
        ...state,
      };
    case ADD_GROUP:
      // let product = state.products.find((ele) => ele.id === payload);
      // product = { ...product, quantity: 1 };
      return {
        ...state,
        users: { payload },
      };
    case ADD_EXPENSE:
      // console.log(payload, "order");
      return {
        ...state,
      };
    case UPDATE_GROUP:
      // console.log(state.quantity);
      return {
        ...state,
      };
    case DELETE_GROUP:
      // console.log(state.quantity);
      return {
        ...state,
      };
    case UPDATE_CUSTOM_CATEGORY:
      // let updateTodo = state.products.map((ele) =>
      //   ele.id !== payload.id
      //     ? ele
      //     : {
      //         ...ele,
      //         item: payload.item,
      //         img:
      //           "https://cdn.shopify.com/s/files/1/0173/8828/products/SAMSUNG_TAB_A_-_10.1_-_Kick_Stand_-_190827.311_400x400.png?v=1580178714",
      //         price: Number(payload.price),
      //         description: payload.description,
      //         category: payload.category,
      //       }
      // );
      return {
        ...state,
      };

    case UPDATE_MEMBERS:
      // console.log(state.quantity);
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;

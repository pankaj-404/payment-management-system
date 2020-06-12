import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ADD_TO_CART,
  ADD_COUNTER,
  REDUCE_COUNTER,
  DELETE_FROM_CART,
  EDIT_ITEM,
  ADD_TO_ORDERS,
} from "./actionTypes";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      console.log(payload);
      let item = {
        ...payload,
        id: state.products[state.products.length - 1].id + 1,
        description: [{ line: payload.description }],
        item: payload.item,
        price: Number(payload.price),
      };
      return {
        ...state,
        products: [...state.products, item],
      };

    case DELETE_ITEM:
      let newTodo = state.products.filter((ele) => ele.id !== payload);
      return {
        ...state,
        products: newTodo,
      };

    case DELETE_FROM_CART:
      let newCartArr = state.cartArr.filter((ele) => ele.id != payload);
      console.log(newCartArr);
      return {
        ...state,
        cartArr: newCartArr,
      };

    case ADD_TO_CART:
      let product = state.products.find((ele) => ele.id === payload);
      product = { ...product, quantity: 1 };
      return {
        ...state,
        cartArr: [...state.cartArr, product],
      };

    case ADD_TO_ORDERS:
      // console.log(payload, "order");
      return {
        ...state,
        orders: [...state.orders, payload],
        cartArr: [],
      };

    case ADD_COUNTER:
      // console.log(state.quantity);
      return {
        ...state,
        quantity: state.quantity + payload,
      };
    case REDUCE_COUNTER:
      // console.log(state.quantity);
      return {
        ...state,
        quantity: state.quantity - payload,
      };

    case UPDATE_ITEM:
      let updateTodo = state.products.map((ele) =>
        ele.id !== payload.id
          ? ele
          : {
              ...ele,
              item: payload.item,
              img:
                "https://cdn.shopify.com/s/files/1/0173/8828/products/SAMSUNG_TAB_A_-_10.1_-_Kick_Stand_-_190827.311_400x400.png?v=1580178714",
              price: Number(payload.price),
              description: payload.description,
              category: payload.category,
            }
      );
      return {
        ...state,
        products: updateTodo,
      };

    default:
      return state;
  }
};
export default reducer;

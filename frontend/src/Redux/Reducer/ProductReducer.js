import {
  FETCH,
  GET_PRODUCT,
  SORT_PRODUCT,
  SORT_PRODUCT_MEN,
  SORT_PRODUCT_WOMEN,
} from "../Type";

export const ProductReducer = (
  state = {
    products: [],
    productItems: [],
    menProdNew: [],
    womenProdNew: [],
    sort: "",
    size: "",
  },
  action
) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        productItems: action.payload,
      };

    case SORT_PRODUCT:
      return {
        ...state,
        sort: action.payload.sort,
        productItems: action.payload.productItems,
      };

    case SORT_PRODUCT_MEN:
      return {
        ...state,
        productItems: action.payload,
      };

    case SORT_PRODUCT_WOMEN:
      return {
        ...state,
        productItems: action.payload,
      };

    default:
      return state;
  }
};

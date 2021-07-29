import { GET_CATEGORIES, FETCH_CAT_ALL_PROD, SHOW_CAT_ITEMS } from "../Type";

export const CategoryReducer = (
  state = {
    catAllProd: [],
    catogoryName: [],
    categoryItems: [],
  },
  action
) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        catogoryName: action.payload,
      };

    case FETCH_CAT_ALL_PROD:
      return {
        ...state,
        categoryItems: action.payload,
      };
    case SHOW_CAT_ITEMS:
      return {
        ...state,
        categoryItems: action.payload,
      };

    default:
      return state;
  }
};

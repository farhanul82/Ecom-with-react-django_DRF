import Axios from "axios";
import { GET_CATEGORIES, SHOW_CAT_ITEMS, FETCH_CAT_ALL_PROD } from "../Type";

import store from "../combinreducers";
import axios from "axios";

export const getCategories=() => async (dispatch) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
const result = await axios.get('https://ecom82.herokuapp.com/api/shop/category/',config)
dispatch({
  type: GET_CATEGORIES,
  payload: result.data
});
};

// export const getCategories = (cat) => ({
//   type: GET_CATEGORIES,
//   payload: cat,
// });

// export const fetchCategoryProducts = async (dispatch) => {
//   const result = await Axios.get(`http://127.0.0.1:8000/api/shop/product/`);

//   dispatch({
//     type: FETCH_CAT_ALL_PROD,
//     payload: result.data
//   });
// };

export const showCatProducts = (catNames) => {
  const categoryItems = store
    .getState()
    .product.productItems.filter((item) => item.category.title === catNames);
  return {
    type: SHOW_CAT_ITEMS,
    payload: categoryItems,
  };
};

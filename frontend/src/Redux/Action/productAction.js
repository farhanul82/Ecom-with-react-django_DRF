import Axios from "axios";
import {
  FETCH,
  GET_PRODUCT,
  SORT_PRODUCT,
  SORT_PRODUCT_MEN,
  SORT_PRODUCT_WOMEN,
} from "../Type";

import store from "../combinreducers";
import axios from "axios";


export const getProducts=() => async (dispatch) => {
  const config = {
      headers: {
        "Content-Type": "application/json",
        
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
const result = await axios.get('https://ecom82.herokuapp.com/api/shop/product/',config)
dispatch({
  type: GET_PRODUCT,
  payload: result.data
});
};

// export const getProducts = (PRODUCTS) => ({
//   type: GET_PRODUCT,
//   payload: PRODUCTS,
// });

export const FetchProducts = (PROD) => ({
  type: FETCH,
  payload: PROD,
});



export const sortProducts = (sort) => {
  const productItems = store
    .getState()
    .product.productItems.slice()
    .sort((a, b) =>
      sort === "highest"
        ? a.price < b.price
          ? 1
          : -1
        : sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.id < b.id
        ? 1
        : -1
    );
  return {
    type: SORT_PRODUCT,
    payload: {
      sort: sort,
      productItems: productItems,
    },
  };
};

export const SortProdMen = (men) => async (dispatch) =>  {
  const config = {
    headers: {
      "Content-Type": "application/json",
      
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
const result = await axios.get('https://ecom82.herokuapp.com/api/shop/product/',config)

  // const productItems = store
  //   .getState()
  //   .product.products.slice()
  //   .filter((item) => item.gender === men);

  dispatch({
    type: SORT_PRODUCT_MEN,
    payload: result.data.filter((item) => item.gender === men),
  });
};

export const sortProdWomen = (women) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
const result = await axios.get('https://ecom82.herokuapp.com/api/shop/product/',config)

dispatch({
  type: SORT_PRODUCT_MEN,
  payload: result.data.filter((item) => item.gender === women),
});
};

import Axios from "axios";
import {
  FETCH_CART_COMPLETE,
  FETCH_CART_INCOMPLETE,
  REMOVE_FROM_CART,
  GET_ORDER
} from '../Type'
import Cookies from "js-cookie";

export const addToCart = (id) => async (dispatch) => {
  console.log(id, typeof (id))
  await Axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
    url: "https://ecom82.herokuapp.com/api/shop/addtocart/",

    data: { id: id },
  }).then((response) => {
    console.log(response.dat);
  });
};


export const getCart = () => async (dispatch) => {
  await Axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
    url: "https://ecom82.herokuapp.com/api/shop/cart/",
  }).then(res => {
    console.log(res.data)
    dispatch({
      type: FETCH_CART_INCOMPLETE,
      payload: res.data
    })
  })
}


export const removeCart = (id) => async (dispatch) => {
  await Axios({
    method: "post",
    url: "https://ecom82.herokuapp.com/api/delatecartproduct/",
    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },

    data: { id: id },
  }).then(res => {
    console.log(res.data)
  })
}


export const setOrder = (Name, Email, Phone, Address, cart_id) => async (dispatch) => {
  await Axios({
    method: "post",
    url: "https://ecom82.herokuapp.com/api/shop/order/",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },

    data: {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Address: Address,
      cart_id: cart_id,
    },
  }).then(res => {

  })
}


export const getOrder = () => async (dispatch) => {
  await Axios({
    method: "get",
    url: "https://ecom82.herokuapp.com/api/shop/order/",
    headers: {
      "Content-Type": "application/json",

      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
   
  }).then(res=>{
    console.log(res.data)
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    })
  })
}



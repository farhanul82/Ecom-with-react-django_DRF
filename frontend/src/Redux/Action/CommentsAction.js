import axios from 'axios';
import{  FETCH_COMMENTS,
    ADD_COMMENT,} from '../Type'
    import Cookies from "js-cookie";

export const addComment = (prodId,comment) =>async(dispatch)=> {
  await axios({
    method: "post",
    url: "https://ecom82.herokuapp.com/api/shop/comment/",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },

    data: {
      id: prodId,
      comment: comment,
    },
  }).then(res=>{
    console.log(res.data)
  })
  };


  export const fetchComment=(id)=> async (dispatch) => {
    await axios({
      method: "post",
      url: "https://ecom82.herokuapp.com/api/renderComment/",
      headers: {
        "Content-Type": "application/json",
  
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    

      data: {
        id: id,

      },
    }).then(res => {
      console.log(res.data)
      dispatch({
        type: FETCH_COMMENTS,
        payload: res.data,
      })
    })
  }

  export const deleteComment=(id)=> async(dispatch)=>{
    await axios({
      method: "post",
      url: "https://ecom82.herokuapp.com/api/delateComment/",
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
  

  
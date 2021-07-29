import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
// import Rendercomments from "./Rendercomments";
import StarRating from "./StarRating";

import { useSelector, useDispatch } from "react-redux";
import CSRFToken from "./CSRFToken";
import format from "../format";
import { fetchComments, addComment, fetchComment, deleteComment } from "../Redux/Action/CommentsAction";

import { addToCart } from "../Redux/Action/CartAction";


const Rendercomments = ({comment})=>{
  const dispatch = useDispatch()
  const commentDlt=(id,prodid)=>{
    dispatch(deleteComment(id))
    dispatch(fetchComment(prodid))
 
  } 

  // useEffect(() => {
  //   dispatch(fetchComment(prodId))
  // }, [fetchComment])
  return (
    <div>
      <li key={comment.id}>
        <p>
          <span>{comment.user.first_name}</span> <button className="deleteComment" onClick={()=>commentDlt(comment.id, comment.product.id)}>Delete</button> <br></br>
          <span className="coomentDate">
        {comment.date}
        </span>
        </p>
       

        <p>{comment.comments}</p>
      </li>
    </div>
  );
};





const RenderProdView = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="row">
      <div className="col-6 col-md-6">
        <div className="prodViewImgDiv">
          <img className="prodViewImg" src={item.image}></img>
        </div>
      </div>

      <div className="col-6 col-md-6">
        <div className="prodViewTittle">{item.title}</div>
        <br></br>

        <div>{item.description}</div>

        <div className="prodViewPrice">{format(item.price)}</div>

        <div className="prodViewBtn">
          {" "}
          <button
            className="btn viewBtn"
            onClick={() => dispatch(addToCart(item.id))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Productview = () => {



  const dispatch = useDispatch();
  const { prodId } = useParams();

  const [comment, setComment] = useState('')
  // useEffect(() => {
  //   dispatch(fetchComments(COMMENTS));
  // }, [COMMENTS]);

  const products = useSelector((state) => state.product.productItems);
  const prodComments = useSelector((state) => state.comment.comments);
  console.log(prodComments);


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(prodId, comment))
    dispatch(fetchComment(prodId))
  };

  useEffect(() => {
    dispatch(fetchComment(prodId))
  }, [fetchComment])


  return (
    <div className="container-fluid prodViewDiv">
      <div className="row">
        {/* {
              products.filter(items=>console.log(items.id=== 1))
              } */}

        {products
          .filter((items) => items.id === parseInt(prodId))
          .map((item) => {
            console.log(item);
            return <RenderProdView item={item}> </RenderProdView>;
          })}
      </div>

      <div className="row">
        <div>
          <StarRating></StarRating>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 m-1">
          <h3>Commemnts</h3>
          <ul>
            {prodComments.map((comment) => {
                return <Rendercomments comment={comment} prodId={prodId}></Rendercomments>;
              })}
          </ul>
        </div>

        <div className="col-12 col-md-6 m-1">
          <div className="commentForm">
            <form onSubmit={(e) => onSubmit(e)}>
              <CSRFToken />
              <textarea

                className="form-control comment"
                type="text"
                placeholder="place Your opinion"
                name="name"
                value={comment}
                onChange={(e) => setComment(e.target.value)}

              />

              {/* <input className="btn btn-danger w-100" type="submit" /> */}

              <Button className="btn btn-danger commentBtn" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productview;

import React, { useEffect } from "react";
import format from "../format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getCart, removeCart } from "../Redux/Action/CartAction";
// import { removeFromCart } from "../Redux/Reducer/action";

const Cartitems = ({ items }) => {
  const dispatch = useDispatch();

const remove=(id)=>{
  dispatch(removeCart(id))
  dispatch(getCart())
}

useEffect(() => {
  dispatch(getCart())
}, [getCart])

  return (
    <li className="cartItemsList">
      <div className="cart-item d-flex justify-content-between text-capitalize my-3">
        <img
          src={`https://ecom82.herokuapp.com${items.product[0].image}`}
          className=" cartItemImg img-fluid rounded-circle"
          id="item-img"
          alt=""
        ></img>
        <div className="item-text">
          <p id="cart-item-title" className="font-weight-bold mb-0">
            {items.product[0].product_name}
          </p>

          <span
            id="cart-item-price"
            className="cart-item-price"
            className="mb-0"
          >
            {format(items.product[0].price)} x {items.quantity}
          </span>
        </div>
        <a
          onClick={()=>remove(items.id)}
          id="cart-item-remove"
          className="cart-item-remove"
        >
          <FontAwesomeIcon className="removeItems" icon={faTrash} />
        </a>
      </div>
    </li>
  );
};

export default Cartitems;

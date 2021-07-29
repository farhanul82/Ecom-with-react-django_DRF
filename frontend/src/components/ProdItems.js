import React from "react";
import { Card, Button } from "react-bootstrap";
import format from "../format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { addToCart, getCart } from "../Redux/Action/CartAction";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Flip from "react-reveal/Flip";
import Tada from "react-reveal/Tada";

const ProdItems = ({ items }) => {
  const dispatch = useDispatch();


  const addCart = () => {
    dispatch(addToCart(items.id))
    dispatch(getCart())
  }

  return (
    <div className=" col-md-4 mt-3   d-flex justify-content-center store-item " key={items.id}>
      <Flip left>
        <Card >
          <div className="img-container">
            <Card.Img
              className="store-img"
              variant="top"
              src={items.image}
            ></Card.Img>

            <button
              className="addCartBtn"
              onClick={() => addCart(items.id)}
            >
              <span class="store-item-icon">
                <FontAwesomeIcon className="cartIcon" icon={faShoppingCart} />
              </span>
            </button>
          </div>

          <Card.Body>
            <Tada>
              <Card.Title className="cartTitlr d-flex justify-content-center">{items.product_name}</Card.Title>
            </Tada>
            <div className="d-flex justify-content-between">
              <div className="productPrice"><p>{format(items.price)}</p></div>
              <div>
                {" "}
                <Link
                  className="btn"
                  to={`/${items.id}`}
                // to={`/products/${items.id}`}
                >
                  Have a look
              </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Flip>
    </div>
  );
};

export default ProdItems;

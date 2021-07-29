import React from "react";
import { Card, Button } from "react-bootstrap";
import format from "../format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import { addToCart, totalAmount } from "../Redux/Reducer/action";
import { useDispatch } from "react-redux";
import Tada from "react-reveal/Tada";
import Flip from "react-reveal/Flip";
import { Link, useHistory } from "react-router-dom";
import { addToCart, getCart } from "../Redux/Action/CartAction";
import Zoom from 'react-reveal/Zoom';

const RendercatItems = ({ items }) => {
  const dispatch = useDispatch();
  const addCart = () => {
    dispatch(addToCart(items.id))
    dispatch(getCart())
  }

  return (
    <div className="col-4 col-md-4  ">
      <Flip left>
        <Card>
          <div className="img-container">
            <Card.Img
              className="store-img"
              variant="top"
              src={items.image}
            ></Card.Img>

            <a
              className="addCartBtn"
              onClick={() => addCart(items.id)}
            >
              <span class="store-item-icon">
                <FontAwesomeIcon className="cartIcon" icon={faShoppingCart} />
              </span>
            </a>
          </div>

          <Card.Body>
            <Tada>
              <Card.Title className="cartTitlr">
                {items.product_name}
              </Card.Title>
            </Tada>

            <div className="d-flex justify-content-between">
            <Zoom left>
            <div className="productPrice"><p>{format(items.price)}</p></div>
            </Zoom>
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

export default RendercatItems;

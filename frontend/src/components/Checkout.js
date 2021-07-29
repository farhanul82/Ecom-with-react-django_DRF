import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "../format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";
// import { removeFromCart, setOrder, clearCart } from "../Redux/Action/CartAction";
import Flash from "react-reveal/Flash";
import RubberBand from "react-reveal/RubberBand";
import Zoom from "react-reveal/Zoom";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Geolocation from "./Geolocation";
import MyMapComponent from "./MyMapComponent";
import { getCart, getOrder, removeCart, setOrder } from "../Redux/Action/CartAction";
import CSRFToken from "./CSRFToken";
import Cookies from "js-cookie";

const Checkoutitems = ({ items }) => {
  console.log("heckout");
  const dispatch = useDispatch();
  const remove = (id) => {
    dispatch(removeCart(id))
    dispatch(getCart())
  }

  return (
    <Fade top>
      <tr class="active-row">
        <td className=""> <img
          src={`https://ecom82.herokuapp.com${items.product[0].image}`}
          className=" checkoutImg"
          id="item-img"
          alt=""
        ></img>
        </td>
        <td className="text-center">  <span className="prodname">  {items.product[0].product_name}</span> </td>
        <td className="text-center"> <span >{format(items.product[0].price)}</span> x{" "}{items.quantity}
          <span > {items.count}</span></td>
        <td className="text-center">
          <Link
            onClick={() => remove(items.id)}
            id="cart-item-remove"
            className="cart-item-remove"
          >
            <FontAwesomeIcon className="checkoutremoveItems" icon={faTrash} />
          </Link>


        </td>
      </tr>

    </Fade>
  );
};

const Checkout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart())
  }, [])
  const cartItems = useSelector((state) => state.cart.inCompleteCart);






  const [Name, setName] = useState(" ");
  const [Email, setEmail] = useState(" ");
  const [Phone, setPhone] = useState(" ");
  const [Address, setAddress] = useState(" ");

  const onSubmit = (e) => {
    e.preventDefault();
    if (cartItems[0].id != null) {
      const cart_id = cartItems[0].id
      dispatch(setOrder(Name, Email, Phone, Address, cart_id))
    }

    console.log(Name);
    // dispatch(setOrder(data.name, data.email, data.mobile, data.address));
  };

  const placeOrder = () => {
    dispatch(getCart())
    dispatch(getOrder())
  }
  // function handleClick() {
  //   history.push("/order");
  // }
  return (
    <div className="container-fluid">
      <div className="row checkoutRow">
        {
          cartItems[0]?.cartproduct.length === 0 ?
            (<Flash>
              <div className="checkOutTotal m-auto text-center"><h5 >Please select your Product</h5></div>
            </Flash>
            ) :
            (
              <div className=" col-md-12  d-flex justify-content-center checkoutRow">
                <Flash>
                  <table class="content-table">
                    <thead>
                      <tr>
                        <th className="text-center">image</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems[0].cartproduct.map((items) => {
                        console.log(items)
                        return <Checkoutitems items={items}></Checkoutitems>;
                      })}


                    </tbody>
                  </table>
                </Flash>
              </div>
            )
        }

      </div>

      <div className="row mt-4">

        {
          cartItems[0]?.cartproduct.length === 0 ? (
            <div></div>
          ) :
            (

              <RubberBand>
                <div className="checkOutTotal  d-flex justify-content-around">
                  <div>
                    <h4>Total Amount :</h4>
                  </div>

                  <div className="checkOutTotalPrice">
                    <h5>
                      <strong id="cart-total" className="font-weight-bold">

                        {cartItems.map(i => format(i.total))}



                      </strong>
                    </h5>
                  </div>
                </div>
              </RubberBand>

            )
        }

      </div>

      <div>
        <MyMapComponent></MyMapComponent>
      </div>

      <div className="row checkoutFormRow">
        <div className=" col-md-6 d-flex justify-content-center ">
          <img className="checkoutGif" src="/images/checkout/1.gif" alt=''></img>
        </div>

        <div className=" col-md-6 d-flex justify-content-center ">
          <div className="contact-section">
            <Zoom bottom>
              {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
              <form onSubmit={(e) => onSubmit(e)}>
                <CSRFToken />
                <div className="form-group">
                  <input
                    className="form-control loginInput"
                    type="text"
                    placeholder="Name"
                    name="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>


                <div className="form-group">
                  <input
                    className="form-control loginInput"
                    type="email"
                    placeholder="Email*"
                    name="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>



                <div className="form-group">
                  <input
                    className="form-control loginInput"
                    type="tel"
                    placeholder="Phone"
                    name="Phone"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>


                <div className="form-group">
                  <input
                    className="form-control loginInput"
                    type="text"
                    placeholder="Address"
                    name="Address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>


                <br />
                <div className=" d-flex justify-content-between paymentBtn">
                  <button>Mobile banking</button>
                  <button>Card</button>
                  <button>Cash On Delevery</button>
                </div>
                <div className=" d-flex justify-content-between ">
                  {" "}
                  <Button className="btn  submit" type="submit">
                    Submit
                  </Button>
                  <Link
                    to="/order"
                    className=" btn placeOrderBtn"
                    onClick={placeOrder}
                  >
                    Place Order
                  </Link>
                </div>
              </form>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

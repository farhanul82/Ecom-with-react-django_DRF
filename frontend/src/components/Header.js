import React, { Fragment, useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";

import { HiShoppingCart } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";

import { NavLink, useHistory } from "react-router-dom";

import { Link, Redirect } from "react-router-dom";

import { logout } from "../Redux/Action/auth";

import format from "../format";

import { FiUser } from "react-icons/fi";
import { getCart } from "../Redux/Action/CartAction";
import Cartitems from "./Cartitems";
import { getProducts } from "../Redux/Action/productAction";
import { getCategories } from "../Redux/Action/CategoryAction";
import ResponsiveNav from "./ResponsiveNav";

export default function Header() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [cart, setCart] = useState(false);
  const showCartItems = () => {
    setCart(!cart);
    dispatch(getCart())
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const cartItems = useSelector((state) => state.cart.inCompleteCart);
  console.log(cartItems)
  const products = () => {
    dispatch(getProducts());
    history.push('/products')
  }

  const category = () => {
    dispatch(getCategories());
    history.push('/category')
  }

  // const totalAmount = useSelector((state) => state.cart.totalAmount);

  const logout_user = () => {
    dispatch(logout());
    setRedirect(true);
  };

  return (
    <div>
      <Navbar className="mainNav" bg="dark" variant="dark">
      <Navbar.Brand  href="#"><h4 className="brand">Ecom</h4></Navbar.Brand>
        {isAuthenticated ? (
          <>
            <Nav className="mr-auto nav " navbarScroll>


              <NavLink
                className="  navLink navLink1"
                activeClassName="navbar__link--active"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                activeClassName="navbar__link--active"
                className=" navLink navLink2"
                to="/products"
                onClick={() => products()}
              >
                Products
              </NavLink>

              <NavLink
                activeClassName="navbar__link--active"
                className=" navLink navLink3"
                to="/category"
                onClick={() => category()}
              >
                Categories
              </NavLink>

              <NavLink
                activeClassName="navbar__link--active"
                className=" navLink navLink4"
                to="/what-new"
              >
                What's New
              </NavLink>


              <div class="animation start-home"></div>
            </Nav>

            <div className="d-flex justify-content-between">
              <div>
                <button className="btn cartBtn" onClick={showCartItems}>
                  CART ITEMS
                  <span class="reactCartIcon">
                    <HiShoppingCart />
                    {/* <span className="cartNum">({cartItems.length})</span> */}
                  </span>
                </button>
              </div>
            </div>

            <button className="logOutbtn " href="#!" onClick={logout_user}>
              Logout
            </button >
          </>

        ) : (
          <>
            <Nav className="mr-auto nav  navbarScroll">
              <NavLink
                activeClassName="navbar__link--active"
                className=" navLink navLink1" to="/login">
                Login
              </NavLink>


              <NavLink
                activeClassName="navbar__link--active"
                className=" navLink navLink2" to="/signup">
                Sign Up
              </NavLink>
              <div class="animation start-home"></div>
            </Nav>
          </>
        )}

        {cart && (
          <div id="cart" className="cart  ">
            <ul>
              {/* {
                 cartItems[0]?(
                   <div>
                     {}
                   </div>
                 ):()
              } */}
              {
                cartItems[0] && cartItems[0].cartproduct.length !== 0 ? 
                  (
                    cartItems[0].cartproduct.map(items => {
                      console.log(items, ' farhan')
                      return <Cartitems items={items}></Cartitems>;
                    })
                  ):(
                    <h3>Please Select Products</h3>
                  ) 
              }
            </ul>
            <div>
              {
                cartItems[0]?.cartproduct ? (
                  <div className="d-flex justify-content-around">
                    <div className="cart-total-container d-flex justify-content-start text-capitalize mt-4">
                      <h5>TOTAL :</h5>
                      <h5>
                        <strong id="cart-total" className="font-weight-bold">
                          {
                            cartItems[0] ? (
                              <div>
                                {format(cartItems[0].total)}
                              </div>
                            ) : (
                              <div>
                                {format(0)}
                              </div>
                            )
                          }

                        </strong>
                      </h5>
                    </div>

                    <div className="cart-buttons-container mt-3 ">
                      {/* <a
                        // onClick={() => dispatch(clearCart())}
                        id="clear-cart"
                        className="btn btn-outline-secondary btn-black text-uppercase"
                      >
                        clear cart
                      </a> */}
                      {
                        cartItems[0]?.cartproduct.length === 0 ? (
                          <div></div>
                        ) : (<Link
                          to={"/check"}
                          className="btn btn-outline-secondary text-uppercase btn-pink"
                        >
                          checkout
                        </Link>)
                      }

                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              }
            </div>

          </div>
        )}
      </Navbar>

      <Navbar className="resNav" bg="dark" variant="dark">
        <ResponsiveNav/>
             
      </Navbar>


      {redirect ? <Redirect to="/" /> : <Fragment></Fragment>}
    </div>
  );
}



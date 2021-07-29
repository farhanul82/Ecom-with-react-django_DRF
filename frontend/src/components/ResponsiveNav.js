import React, { useState } from 'react';
import { Nav, Navbar, Button, Modal } from "react-bootstrap";


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

const ResponsiveNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const home = () => {
        history.push('/')

        setShow(false);
    }


    const login = () => {
        history.push('/login')

        setShow(false);
    }

    const signup = () => {
        history.push('/signup')

        setShow(false);
    }

    const products = () => {
        dispatch(getProducts());

        history.push('/products')

        setShow(false);
    }

    const category = () => {
        dispatch(getCategories());
        history.push('/category')
        setShow(false);
    }

    // const totalAmount = useSelector((state) => state.cart.totalAmount);

    const logout_user = () => {
        dispatch(logout());
        setRedirect(true);
    };
    return (
        <div className="d-flex justify-content-between">
            <div>
            <Navbar.Brand  href="#"><h4 className="brand">Ecom</h4></Navbar.Brand>
            </div>

            <div>
                <div className="humBtnDiv">
                    <Link className="humBtn"  onClick={handleShow}>
                       
                    </Link>
                </div>



                <Modal className='navModel' show={show} onHide={handleClose} animation={false}>
                    <div className='d-flex justify-content-center'>
                        {isAuthenticated ? (
                            <ul className='Linklist '>
                                <li className=" Links Link1"><Link className="Link " onClick={() => home()}> Home</Link></li>
                                <li className="Links  Link2"> <Link className=" Link " onClick={() => products()}> Products</Link></li>
                                <li className="Links  Link3"><Link className=" Link " onClick={() => category()}> Categories</Link></li>
                                <li className="Links Link4">   <Link className=" Link " to="/what-new"> What's New</Link></li>
                                <li>
                                    <div className="d-flex justify-content-center">
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
                                </li>
                                <li>
                                    <button className="btn logOutbtn mt-3" href="#!" onClick={logout_user}>
                                        Logout
                                    </button >
                                </li>
                            </ul>
                        ) : (
                            <ul className='Linklist '>
                                <li className=" Links Link1"><Link className="Link " to="/login" onClick={() => login()}> Login</Link></li>

                                <li className="Links Link4">   <Link className=" Link " to="/signup" onClick={() => signup()}> Sign up</Link></li>
                            </ul>
                        )}

                    </div>




                    {cart && (
                        <div id="cart" className="cart  ">
                            <ul>
                                {
                                    cartItems[0] && cartItems[0].cartproduct.length !== 0 ?
                                        (
                                            cartItems[0].cartproduct.map(items => {
                                                console.log(items, ' farhan')
                                                return <Cartitems items={items}></Cartitems>;
                                            })
                                        ) : (
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

                </Modal>
            </div>

        </div>
    );
};

export default ResponsiveNav;
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch,useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "../hocs/Layout";
import Signup from "./Signup";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import ResetPassword from "./ResetPassword";
import Activate from "./Activate";

import Header from "./Header";
import Footer from "./Footer";
import Starter from "./Starter";
import Products from "./Products";
import Catogories from "./Categories";
import Showcategoritems from "./Showcategoritems";


import { useSelector, useDispatch } from "react-redux";
import { checkAuthenticated, load_user } from "../Redux/Action/auth";
import WhatNew from "./WhatNew";
import Productview from "./Productview";
import Checkout from "./Checkout";
import { getCart } from "../Redux/Action/CartAction";
import Order from "./Order";
import LoginNew from "./LoginNew";
import SignupNew from "./SignupNew";
import CheckEmail from "./CheckEmail";
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
dispatch(getCart())
  }, []);
  return (
    <div>
      <Router>
        <Layout>
          
        <Switch>
          {/* <Route exact path="/">
            <Starter />
          </Route> */}
          <Route exact path="/">
          <Home />
        </Route>
          <Route exact path="/login" component={LoginNew} />
          <Route exact path="/signup" component={SignupNew} />
          <Route exact path= '/CheckEmail' component={CheckEmail}/>
          {/* <Route exact path="/facebook" component={Facebook} />
            <Route exact path="/google" component={Google} /> */}
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" component={Activate} />

          <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/order">
          <Order />;
        </Route>

        <Route exact path="/check">
          <Checkout></Checkout>
        </Route>

       

        <Route exact path="/category">
          <Catogories />
        </Route>
        <Route exact path="/category/:catNames">
          <Showcategoritems />
        </Route>


        <Route exact path="/what-new">
          <WhatNew/>
        </Route>   

        <Route exact path="/:prodId">
          <Productview />
        </Route>   
        </Switch>
        <Footer />
        </Layout>
      </Router>
    </div>
  );
};

export default Main;

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../Redux/Action/auth";
import Navbar from "./Navbar";

const SignupNew = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    //   const continueWithGoogle = async () => {
    //     try {
    //       const res = await axios.get(
    //         `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
    //       );

    //       window.location.replace(res.data.authorization_url);
    //     } catch (err) {}
    //   };

    //   const continueWithFacebook = async () => {
    //     try {
    //       const res = await axios.get(
    //         `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
    //       );

    //       window.location.replace(res.data.authorization_url);
    //     } catch (err) {}
    //   };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
    if (accountCreated) {
        return <Redirect to="/CheckEmail" />;
    }

    return (
        <div className="container-fluid signupMain">
            <div className="row">
                <div className="col-md-12">
                    <div className="contact-section">
                        <form onSubmit={(e) => onSubmit(e)} className="wow fadeInRight mt-3">
                            <div className="form-group">
                                <input type="text" className="form-control"
                                    name="first_name"
                                    value={first_name}
                                    onChange={(e) => onChange(e)}
                                    id="formGroupExampleInput" placeholder="First Name*" />
                            </div>



                            <div className="form-group">
                                <input type="text" className="form-control" value={last_name}
                                    name="last_name"
                                    onChange={(e) => onChange(e)}
                                    id="formGroupExampleInput" placeholder="Last Name*" />
                            </div>


                            <div className="form-group">
                                <input type="email" className="form-control" value={email}
                                    name="email"
                                    onChange={(e) => onChange(e)}
                                    id="formGroupExampleInput2" placeholder="Email" />
                            </div>


                            <div className="form-group">
                                <input type="password" className="form-control"
                                    id="formGroupExampleInput2" placeholder="Password*"
                                    name="password"
                                    value={password}
                                    onChange={(e) => onChange(e)}
                                    minLength="6" />
                            </div>


                            <div className="form-group">
                                <input type="password" className="form-control"
                                    id="formGroupExampleInput2" placeholder="Confirm Password*"
                                    name="re_password"
                                    value={re_password}
                                    onChange={(e) => onChange(e)}
                                    minLength="6" />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>


    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignupNew);














import React, { useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { login } from "../Redux/Action/auth";
import axios from "axios";
import Navbar from "./Navbar";
import { getCart } from "../Redux/Action/CartAction";


import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const LoginNew = ({ login, isAuthenticated }) => {
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const pass = useRef();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
        setshow(false)
        dispatch(getCart())

    };


    const showpassword = () => {

        setshow(!show)
        pass.current.type = show ? 'password' : 'text';

    }

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
            );

            window.location.replace(res.data.authorization_url);
        } catch (err) { }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
            );

            window.location.replace(res.data.authorization_url);
        } catch (err) { }
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div>

            <div className="bg-img">
                <div className="loginContent">
                    <h4 className='loginHeader'>Login Form</h4>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="field">
                            <span className="fa fa-user"></span>
                            <input

                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />

                        </div>
                        <div className="field space">
                            <span className="fa fa-lock"></span>
                            <input
                                className="pass-key"
                                ref={pass}
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />

                            {show ? <i onClick={showpassword}><AiFillEyeInvisible className="eye" /></i> : <i onClick={showpassword}><AiFillEye className="eye" /></i>}
                        </div>
                        <div className="pass">
                            <Link to="/reset-password">Forgot Password?</Link>

                        </div>
                        <div className="fieldBtn">
                            <input type="submit" value="LOGIN"></input>
                        </div>
                    </form>
                    <div className="login">
                        Or login with
                    </div>
                    <div className="links">
                        <div className="facebook">
                            <i className="fab fa-facebook-f"><span>Facebook</span></i>
                        </div>
                        <div className="instagram">
                            <i className="fab fa-instagram"><span>Instagram</span></i>
                        </div>
                    </div>
                    <div className="signup">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginNew);
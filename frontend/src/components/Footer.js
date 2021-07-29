import React from "react";
import {
  FaFacebookSquare,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BiCopyright } from "react-icons/bi";

function Footer(props) {
  return (
    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="social-media text-center">
              <ul>
                <li>
                  <a href="https://facebook.com">
                    <FaFacebookSquare />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com">
                    <FaInstagram />
                  </a>
                </li>

                <li>
                  <a href="https://google.com">
                    <FaGooglePlusG />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com">
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col-md-12">
            <div class="footer-copyright">
              <h3>
                {" "}
                <span>
                  <BiCopyright /> Copyright 2021 | All Right Reserved
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

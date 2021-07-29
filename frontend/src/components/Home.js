import { Button } from "bootstrap";
import React, { useEffect } from "react";
import Wobble from "react-reveal/Wobble";
import { Carousel } from "react-bootstrap";
import Flash from "react-reveal/Flash";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

import Axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  // useEffect(() => {
  //   sendProdData(PRODUCTS);
  // }, []);
  // console.log("farhan");
  // const sendProdData = async (prod) => {
  //   await Axios({
  //     mathod: "POST",
  //     url: "http://127.0.0.1:8000/api/shop/product/",
  //     data: {
  //       product: prod,
  //     },
  //   }).then((response) => {
  //     console.log(response.data, "farhan");
  //   });
  // };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="container-fluid ">
      <div className="row carouselSec" style={{ height: "100vh" }}>
        <Carousel>
          <Carousel.Item className="d-flex justify-content-center">
            <div className="sec1Tittle">
              <h1 className="S1"> Shopping</h1>
              <h2>
                <span className="S2">Always</span>{" "}
                <span className="S3">A good</span>
              </h2>

              <Wobble>
                <h1>
                  <span className="S4">Idea</span>
                </h1>
              </Wobble>
              <div>
                {
                  isAuthenticated ? (<Link to="/products" className="crslsec1btn btn">
                    SHOPPING
                  </Link>) : (
                    <Link to="/login" className="crslsec1btn btn">
                      login
                    </Link>
                  )
                }

              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className="d-block w-100"
              src="/images/Slider/7.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Wobble>
                <h1 className="slidertitle">Exquisite</h1>
              </Wobble>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className="d-block w-100"
              src="/images/frontslides/2.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Wobble>
                <h1 className="slidertitle">Exquisite</h1>
              </Wobble>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className="d-block w-100"
              src="/images/Slider/1.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Wobble>
                <h1 className="slidertitle">Exquisite</h1>
              </Wobble>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className="d-block w-100"
              src="/images/Slider/4.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Wobble>
                <h1 className="slidertitle">Exquisite</h1>
              </Wobble>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "100vh" }}
              className="d-block w-100"
              src="/images/Slider/5.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <Wobble>
                <h1 className="slidertitle">Exquisite</h1>
              </Wobble>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="frontSec2 row">
        <div className=" sec2 container-fluid">
          <div className="row">
            <div className=" col-md-6 d-flex justify-content-center">
              <Fade left big>
                <img
                  className=" sec2img animate__zoomInDown"
                  src="/images/front/4.png"
                ></img>
              </Fade>
            </div>

            <div className="Sec2text col-md-6 d-flex justify-content-center">
              <div>
                <h1>
                  <span className="T1"> Lots Of</span>
                  <span className="T2">Categories</span>
                  <br></br>
                  <span className="T3">to</span>
                  <br></br>{" "}
                  <Flash>
                    {" "}
                    <span className="T4">Enamor</span>
                  </Flash>
                </h1>

               
                  {
                    isAuthenticated ? (<Link to="/products" className="crslsec1btn btn">
                      SHOPPING
                    </Link>) : (
                      <Link to="/login" className="crslsec1btn btn">
                        login
                      </Link>
                    )
                  }
               
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="frontsec3 row">
        <div className="container-fluid">
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

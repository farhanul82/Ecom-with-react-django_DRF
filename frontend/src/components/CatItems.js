import React from "react";
import { Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import Flip from "react-reveal/Flip";
import { showCatProducts } from "../Redux/Action/CategoryAction";

const CatItems = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="col-md-4  d-flex justify-content-center" key={props.cat.id}>
      <Flip top>
        <Card className="p-3 categoryCard" style={{ width: "15rem" }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{props.cat.title}</Card.Title>
            <Link
              onClick={() => dispatch(showCatProducts(props.cat.title))}
              className="btn categoryBtn"
              to={`/category/${props.cat.title}`}
            >
              View More
            </Link>
          </Card.Body>
        </Card>
      </Flip>
    </div>
  );
};

export default CatItems;

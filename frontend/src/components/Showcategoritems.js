import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RendercatItems from "./RendercatItems";
import { showCatProducts } from "../Redux/Action/CategoryAction";

const Showcategoritems = () => {
  const { catNames } = useParams();
  console.log(catNames);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(showCatProducts());
  //   }, []);
  const catProd = useSelector((state) => state.catogorie.categoryItems);

  return (
    <div className="container-fluid">
      <div className="row categoryBackground">
        {catProd.map((items) => {
          return <RendercatItems items={items}></RendercatItems>;
        })}
      </div>
    </div>
  );
};

export default Showcategoritems;

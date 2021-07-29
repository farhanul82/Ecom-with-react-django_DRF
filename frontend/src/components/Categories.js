import React, { useEffect } from "react";
import CatItems from "./CatItems";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../Redux/Action/CategoryAction";
import Axios from "axios";

const Catogories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const catogories = useSelector((state) => state.catogorie.catogoryName);

  return (
    <div
      className="container-fluid categoryDiv"
      style={{ background: "antiquewhite" }}
    >
      
            <div className="row">
              {catogories.map((cat) => {
                return <CatItems cat={cat}></CatItems>;
              })}
            </div>
          </div>
  );
};

export default Catogories;

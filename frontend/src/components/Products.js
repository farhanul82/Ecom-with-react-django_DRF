import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, FetchProducts } from "../Redux/Action/productAction";

import ProdItems from "./ProdItems";
import Filter from "./Filter";
import Axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  // useEffect(
  //   // () => async () => {
  //   //   await Axios({
  //   //     mathod: "GET",
  //   //     url: 'http://localhost:8000/api/shop/product/',
  //   //   }).then((response) => {
  //   //     dispatch(getProducts(response.data));
  //   //     dispatch(FetchProducts(response.data));
  //   //   });
  //   // },
  //   []
  // );

  const products = useSelector((state) => state.product.productItems);
  console.log(products);
  const fetch = useSelector((state) => state.product.products);
  console.log(fetch);

  return (
    <div className="container-fluid">
      <div>
        <Filter></Filter>
      </div>
  
          <div className="row   productBackground ">
            {products.map((items) => {
              // console.log(items);
              return <ProdItems items={items}></ProdItems>;
            })}
          </div>
        </div>
 

  );
};

export default Products;

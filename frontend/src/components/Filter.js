import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortProducts,
  SortProdMen,
  sortProdWomen,
  getProducts,
} from "../Redux/Action/productAction";

const Filter = () => {
  const dispatch = useDispatch();

  const sort = useSelector((state) => state.product.sort);

  const men = "men";

  const women = "women";

  const sortMen = (i)=>{
    dispatch(SortProdMen(i))
   
  }

  const sortWomen = ()=>{
    dispatch(sortProdWomen(women))
 
  }

  return (
    <div className="d-flex justify-content-around filter">
      <div>
        <select
          value={sort}
          onChange={(event) => dispatch(sortProducts(event.target.value))}
        >
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>

      <div>
        <button
          className="btn sortProdgender"
          onClick={() => sortMen(men)}
        >
          MEN
        </button>

        <button
          className="btn sortProdgender"
          onClick={() => sortWomen()}
        >
          WOMEN
        </button>
      </div>
    </div>
  );
};

export default Filter;

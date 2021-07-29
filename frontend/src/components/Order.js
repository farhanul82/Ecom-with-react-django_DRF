import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Shake from "react-reveal/Shake";
import format from "../format";
import { getCart, getOrder } from "../Redux/Action/CartAction";

const Order = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart)
    dispatch(getOrder())
  }, [])

  const order = useSelector((state) => state.cart.order);
  console.log(order)

  return (
    <div className="container-fluid">


      {/* <div className="row">
        <div className="col-md-12">
          {
            order ? (
              <div>
                {
                  order.map(item => {
                    return (
                      <li className="my-2">
                        <div className="d-flex justify-content-around order_list">
                          <div className="d-flex justify-content-center">
                            <p>Order Id :{item.id}</p>  
                          </div>

                          <div className="d-flex justify-content-center">
                            <p>Total: {format(item.cart.total)}</p>
                          </div>

                          <div className=""> 
                            <p>{item.order_status}</p>
                            <p>{item.date}</p>
                          </div>
                        </div>
                      </li>)
                  })
                }
              </div>
            ) : (
              <div></div>
            )
          }
        </div>
      </div> */}


      <div className="row">
        <div className=" col-md-6 d-flex justify-content-center">

          <img className="orderGif" src="/images/checkout/2.gif"></img>
        </div>

        <div className="  col-md-6 d-flex justify-content-center">

          {
            order ? (
              <div className="orderTextdiv">
                Hello Mr. <span className="orderName">{order.name}</span>. Your order has
                been accepted. Your valuable order will be delevered within{" "}
                <Shake>
                  <span className="orderTime"> 72</span>
                </Shake>{" "}
                hrs.<hr></hr> <p className="orderthnks text-right">Thank You</p> 
              </div>

            ) : (
              <div className="orderTextdiv">
                <h3>Nothing to Preview</h3>
              </div>
            )
          }


        </div>
      </div>
    </div>
  );
};

export default Order;

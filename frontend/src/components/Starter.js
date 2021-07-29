import React from "react";
import { useHistory } from "react-router-dom";

export default function Starter() {
  const history = useHistory();
  return (
    <div className="container">
      <div className="row">
        {" "}
        <div className="col-md-12">
          <button
            onClick={() => history.push("/login")}
            className="btn start_btn"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

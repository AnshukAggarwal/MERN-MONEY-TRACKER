import React from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Account = () => {
  return (
    <section>
      <div className="row">
        <div className="col-md-5 me-5 mb-5">
          <Login />
        </div>
        <div className="col-md-5">
          <Register />
        </div>
      </div>
    </section>
  );
};

export default Account;

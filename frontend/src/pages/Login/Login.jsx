import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../redux/actions/authActions";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(loginFormData));
    setLoginFormData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <section>
        <h2>Login to your account</h2>
      </section>
      <hr />
      <form onSubmit={handleLoginFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;

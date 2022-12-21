import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { checkEmptyInputFields } from "../../utils";
import {
  loginUserAsync,
  resetAuthState,
} from "../../redux/actions/authActions";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    if (user) {
      navigate("/");
    }

    return () => {
      console.log("Unmounting login");
      dispatch(resetAuthState());
    };
  }, [user, navigate, error, dispatch]);

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
    if (!checkEmptyInputFields([email, password])) {
      dispatch(loginUserAsync(loginFormData));
    }
  };
  return (
    <>
      <section>
        <h2>
          <BiLogIn color="#ff2625" size={50} /> Login to your account
        </h2>
      </section>
      <hr />
      <form onSubmit={handleLoginFormSubmit}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            value={email}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            value={password}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
};

export default Login;

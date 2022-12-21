import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ImProfile } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { checkEmptyInputFields, checkInputsAreSame } from "../../utils";
import {
  registerUserAsync,
  resetAuthState,
} from "../../redux/actions/authActions";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { name, email, password, repeatPassword } = registerFormData;
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
      dispatch(resetAuthState());
    };
  }, [user, navigate, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    if (
      !checkEmptyInputFields([name, email, password, repeatPassword]) &&
      checkInputsAreSame(password, repeatPassword)
    ) {
      dispatch(registerUserAsync(registerFormData));
      setRegisterFormData({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
    }
  };
  return (
    <>
      <section>
        <h2>
          <ImProfile color="#ff2625" size={50} /> Register your account
        </h2>
      </section>
      <hr />
      <form onSubmit={handleRegisterFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="repeatPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </>
  );
};

export default Register;

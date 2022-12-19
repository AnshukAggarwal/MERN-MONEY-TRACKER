import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../redux/actions/authActions";
import { GiMoneyStack } from "react-icons/gi";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUserLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <header
      className={`d-flex justify-content-between align-items-center p-3 mb-5 ${styles.header}`}
    >
      <div className="logo">
        <Link className="nav-link" to="/">
          <GiMoneyStack color="#ff2625" fontSize={100} />
        </Link>
      </div>
      {user ? (
        <ul className="nav">
          <li className={`nav-item ${styles.ul}`}>
            <NavLink
              to="/account"
              className={`nav-link ${styles["menu-item"]}`}
              onClick={handleUserLogOut}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav">
          <li className={`nav-item ${styles.ul}`}>
            <NavLink
              to="/account"
              className={`nav-link ${styles["menu-item"]}`}
            >
              Account
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
              to="/register"
              className={`nav-link ${styles["menu-item"]}`}
            >
              Register
            </NavLink>
          </li> */}
        </ul>
      )}
    </header>
  );
};

export default Header;

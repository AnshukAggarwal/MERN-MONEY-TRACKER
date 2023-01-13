import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button/Button";
import styles from "./ViewTransaction.module.css";

const ViewTransaction = () => {
  const location = useLocation();
  //console.log(location.state.data);
  const { text, amount, type, category } = location.state.data;
  return (
    <>
      <section className="mb-5">
        <Link to="/">
          <Button>Back to transactions</Button>
        </Link>
      </section>
      <section className="card">
        <div className="card-body">
          <h5 className="card-title mb-2">
            Here are the details of the transaction you selected
          </h5>
          <h6 className="card-subtitle mb-2">Description: {text}</h6>
          <h6 className="card-subtitle mb-2">Amount: $ {amount}</h6>
          <h6 className="card-subtitle mb-2">Category: {category.name}</h6>
          <h6 className="card-subtitle mb-2">Type: {type}</h6>
          {/* <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a> */}
          <section className={styles.actions}>
            <Link
              to="/edit"
              state={{ data: location.state.data }}
              className="card-link"
            >
              <FaEdit color="#ff2625" />
            </Link>
            <FaTrash color="#ff2625" />
          </section>
        </div>
      </section>
    </>
  );
};

export default ViewTransaction;

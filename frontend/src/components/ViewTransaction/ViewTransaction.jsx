import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button/Button";
import styles from "./ViewTransaction.module.css";
import Modal from "../../UI/Modal/Modal";
import { deleteTransactionAsync } from "../../redux/actions/transactionActions";

const ViewTransaction = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  //console.log(location.state.data);
  const { text, amount, type, category, date, _id } = location.state.data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteTransaction = () => {
    dispatch(deleteTransactionAsync(_id));
    setShowModal(false);
    navigate("/");
  };
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
          <h6 className="card-subtitle mb-2">
            Date: {new Date(date).toISOString().split("T")[0]}
          </h6>

          <section className={styles.actions}>
            {/* <Link
              to="/edit"
              state={{ data: location.state.data }}
              className="card-link"
            >
              <FaEdit color="#ff2625" />
            </Link> */}
            <Link to="/edit" state={{ data: location.state.data }}>
              <Button>Edit</Button>
            </Link>

            <Button click={toggleShowModal}>Delete</Button>
            {/* <FaTrash color="#ff2625" /> */}
          </section>
        </div>
      </section>
      {showModal ? (
        <Modal
          deleteTransaction={handleDeleteTransaction}
          hideModal={toggleShowModal}
        />
      ) : null}
    </>
  );
};

export default ViewTransaction;

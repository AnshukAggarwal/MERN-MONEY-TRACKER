import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ deleteTransaction, hideModal, transaction }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={hideModal} />
      <div className={`${styles.modal} ${styles.card}`}>
        <section>
          <p>{`Are you sure you want to delete this transaction`}</p>
        </section>
        <section className={styles.actions}>
          <Button click={deleteTransaction}>
            <span>Yes</span>
          </Button>
          <Button click={hideModal}>
            <span className={styles.text}>No</span>
          </Button>
        </section>
      </div>
    </>
  );
};

export default Modal;

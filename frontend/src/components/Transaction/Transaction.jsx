import React from "react";
import { Link } from "react-router-dom";
import styles from "./Transaction.module.css";

const Transaction = ({ transaction }) => {
  //console.log(transaction.date);
  const date = new Date(transaction.date);
  //console.log(date);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return (
    <Link to="transaction" className="nav-link" state={{ data: transaction }}>
      <div className={styles["transaction-item"]}>
        <div className="date">
          <div>{month}</div>
          <div>{day + 1}</div>
          <div>{year}</div>
        </div>
        <div className={styles.text}>{transaction.text}</div>
        <div className={styles.amount}>$ {transaction.amount}</div>
      </div>
    </Link>
  );
};

export default Transaction;

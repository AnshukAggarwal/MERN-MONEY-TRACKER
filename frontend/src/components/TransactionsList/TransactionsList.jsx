import React from "react";
import styles from "./TransactionsList.module.css";
import Transaction from "../Transaction/Transaction";

const TransactionsList = ({
  transactions,
  handleDeleteTransaction,
  handleLoadMoreTransaction,
  total,
}) => {
  return transactions.length > 0 ? (
    <section className={styles["transactions-list-container"]}>
      {transactions.map((transaction) => {
        return <Transaction transaction={transaction} key={transaction._id} />;
      })}
    </section>
  ) : (
    <h3>You have no transactions yet!</h3>
  );
};

export default TransactionsList;

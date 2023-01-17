import React from "react";
import styles from "./TransactionsList.module.css";
import Transaction from "../Transaction/Transaction";
import Button from "../../UI/Button/Button";

const TransactionsList = ({
  transactions,
  handleLoadMoreTransaction,
  total,
}) => {
  return transactions.length > 0 ? (
    <>
      <section className={styles["transactions-list-container"]}>
        {transactions.map((transaction) => {
          return (
            <Transaction transaction={transaction} key={transaction._id} />
          );
        })}
      </section>
      {transactions.length < total.length && (
        <div className="d-flex justify-content-center">
          <Button click={handleLoadMoreTransaction}>Load More</Button>
        </div>
      )}
    </>
  ) : (
    <h3>You have no transactions yet!</h3>
  );
};

export default TransactionsList;

import React from "react";
import CategoryProgressBar from "../CategoryProgressBar/CategoryProgressBar";
import styles from "./Analytics.module.css";

const Analytics = ({ transactions, categories }) => {
  console.log(transactions);
  const incomeTransactions = transactions.filter((t) => t.type === "Income");
  const expenseTransactions = transactions.filter((t) => t.type === "Expense");
  const totalMoneyFromTransactions = transactions
    .map((t) => t.amount)
    .reduce((acc, curr) => acc + curr, 0);
  const incomeTotal = incomeTransactions
    .map((t) => t.amount)
    .reduce((acc, curr) => acc + curr, 0);
  const expenseTotal = expenseTransactions
    .map((t) => t.amount)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <h3>Analytics</h3>
      <section className="d-flex flex-column">
        <section className={`${styles["analytics-container"]} row mb-5 p-4`}>
          <section
            className={`${styles["analytics-data-container"]} col d-flex flex-column justify-content-between align-items-center p-4`}
          >
            <div>
              <h3>Transaction Wise Analysis</h3>
            </div>
            <div className={`d-flex ${styles.reverse}`}>
              <div
                className={`${styles["circle-green"]} d-flex flex-column justify-content-center align-items-center me-1 ${styles.gap}`}
              >
                <h6>Income : {incomeTransactions.length}</h6>
                <h6>
                  {(incomeTransactions.length / transactions.length).toFixed(
                    1
                  ) * 100}{" "}
                  %
                </h6>
              </div>
              <div
                className={`${styles["circle-red"]} d-flex flex-column justify-content-center align-items-center ms-1 ${styles.gap}`}
              >
                <h6>Expense: {expenseTransactions.length}</h6>
                <h6>
                  {(expenseTransactions.length / transactions.length).toFixed(
                    1
                  ) * 100}{" "}
                  %
                </h6>
              </div>
            </div>
          </section>
          <section
            className={`${styles["analytics-data-container"]} col d-flex flex-column justify-content-between align-items-center p-4`}
          >
            <div>
              <h3>Amount Wise Analysis</h3>
            </div>
            <div className={`d-flex ${styles.reverse}`}>
              <div
                className={`${styles["circle-green"]} d-flex flex-column justify-content-center align-items-center me-1 ${styles.gap}`}
              >
                <h6>Income: ${incomeTotal.toFixed(0)}</h6>
                <h6>
                  {(incomeTotal / totalMoneyFromTransactions).toFixed(2) * 100}{" "}
                  %
                </h6>
              </div>
              <div
                className={`${styles["circle-red"]} d-flex flex-column justify-content-center align-items-center ms-1 ${styles.gap}`}
              >
                <h6>Expense: ${expenseTotal.toFixed(0)}</h6>
                <h6>
                  {(expenseTotal / totalMoneyFromTransactions).toFixed(2) * 100}{" "}
                  %
                </h6>
              </div>
            </div>
          </section>
        </section>
        {expenseTransactions.length > 0 && (
          <CategoryProgressBar
            categories={categories}
            categoryTransactions={expenseTransactions}
            total={expenseTotal}
            heading="Expenses"
          />
        )}
        {incomeTransactions.length > 0 && (
          <CategoryProgressBar
            categories={categories}
            categoryTransactions={incomeTransactions}
            total={incomeTotal}
            heading="Income"
          />
        )}
      </section>
    </>
  );
};

export default Analytics;

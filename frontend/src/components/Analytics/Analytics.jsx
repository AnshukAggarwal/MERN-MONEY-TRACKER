import React from "react";
import CategoryProgressBar from "../CategoryProgressBar/CategoryProgressBar";

const Analytics = ({ transactions, categories }) => {
  console.log(categories);
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
        <section className="row test mb-5 p-4">
          <section className="col test2 d-flex flex-column justify-content-between align-items-center p-4 me-1">
            <div>
              <h3>Transaction Wise Analysis</h3>
            </div>
            <div className="d-flex">
              <div className="circle-green d-flex flex-column justify-content-center align-items-center me-1">
                <h6>Income : {incomeTransactions.length}</h6>
                <h6>
                  {(incomeTransactions.length / transactions.length).toFixed(
                    1
                  ) * 100}{" "}
                  %
                </h6>
              </div>
              <div className="circle-red d-flex flex-column justify-content-center align-items-center ms-1">
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
          <section className="col test2 d-flex flex-column justify-content-between align-items-center p-4 ms-1">
            <div>
              <h3>Amount Wise Analysis</h3>
            </div>
            <div className="d-flex">
              <div className="circle-green d-flex flex-column justify-content-center align-items-center me-1">
                <h6>Income: ${incomeTotal}</h6>
                <h6>
                  {(incomeTotal / totalMoneyFromTransactions).toFixed(2) * 100}{" "}
                  %
                </h6>
              </div>
              <div className="circle-red d-flex flex-column justify-content-center align-items-center ms-1">
                <h6>Expense: ${expenseTotal}</h6>
                <h6>
                  {(expenseTotal / totalMoneyFromTransactions).toFixed(2) * 100}{" "}
                  %
                </h6>
              </div>
            </div>
          </section>
        </section>
        <CategoryProgressBar
          categories={categories}
          categoryTransactions={expenseTransactions}
          total={expenseTotal}
          heading="Expenses"
        />
        <CategoryProgressBar
          categories={categories}
          categoryTransactions={incomeTransactions}
          total={incomeTotal}
          heading="Income"
        />
      </section>
    </>
  );
};

export default Analytics;

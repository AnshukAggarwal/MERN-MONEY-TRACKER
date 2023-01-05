import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button/Button";

const Transactions = ({
  transactions,
  handleDeleteTransaction,
  handleLoadMoreTransaction,
  total,
}) => {
  if (transactions.length > 0) {
    return (
      <>
        <table className="table table-bordered my-3">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Amount (C$)</th>
              <th scope="col">Type</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction._id}>
                  <td>
                    {new Date(transaction.date).toISOString().split("T")[0]}
                  </td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category.name}</td>
                  <td>{transaction.text}</td>
                  <td>
                    <pre>
                      {" "}
                      <Link to="/edit" state={{ data: transaction }}>
                        <FaEdit color="#ff2625" />
                      </Link>{" "}
                      |{" "}
                      <FaTrash
                        color="#ff2625"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteTransaction(transaction._id)}
                      />
                    </pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {transactions.length < total.length && (
          <div className="d-flex justify-content-center">
            <Button click={handleLoadMoreTransaction}>Load More</Button>
          </div>
        )}
      </>
    );
  } else {
    return <h3>You have no transactions yet!</h3>;
  }
};

export default Transactions;

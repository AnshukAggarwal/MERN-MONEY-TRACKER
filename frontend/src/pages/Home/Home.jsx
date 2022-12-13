import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getTransactionAsync } from "../../redux/actions/transactionActions";
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions } = useSelector((state) => state.transactions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getTransactionAsync());
  }, [user, navigate, dispatch]);
  return (
    <table className="table table-bordered">
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
              <td>{new Date(transaction.date).toDateString()}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category.name}</td>
              <td>{transaction.text}</td>
              <td>
                <pre>
                  {" "}
                  <Link to="/edit" state={{ data: transaction }}>
                    <FaEdit />
                  </Link>{" "}
                  |{" "}
                  <Link to="/delete">
                    <FaTrash />
                  </Link>
                </pre>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Button/Spinner/Spinner";
import {
  getTransactionAsync,
  deleteTransactionAsync,
} from "../../redux/actions/transactionActions";
import { getCategoriesAsync } from "../../redux/actions/uiActions";
import Filters from "../../components/Filters/Filters";

const Home = () => {
  const [limit, setLimit] = useState(3);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const { user } = useSelector((state) => state.auth);
  const { transactions, total, loading } = useSelector(
    (state) => state.transactions
  );
  const { categories } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/account");
    }
    dispatch(getTransactionAsync(limit, type, category));
  }, [user, navigate, dispatch, limit, type, category]);

  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransactionAsync(id));
  };

  const handleLoadMoreTransaction = () => {
    //dispatch(getTransactionAsync(limit));
    setLimit(limit + 3);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className="d-flex justify-content-end mb-5">
          <Link to="/add">
            <Button>Add Transaction</Button>
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Filters
            type={type}
            categories={categories}
            category={category}
            handleTypeChange={handleTypeChange}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        {transactions.length > 0 ? (
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
                            onClick={() =>
                              handleDeleteTransaction(transaction._id)
                            }
                          />
                        </pre>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {transactions.length < total && (
              <div className="d-flex justify-content-center">
                <Button click={handleLoadMoreTransaction}>Load More</Button>
              </div>
            )}
          </>
        ) : (
          <h3>You have no transactions yet!</h3>
        )}
      </>
    );
  }
};

export default Home;

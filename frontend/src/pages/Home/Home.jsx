import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../UI/Button/Spinner/Spinner";
import Button from "../../UI/Button/Button";
import Filters from "../../components/Filters/Filters";
import Transactions from "../../components/Transactions/Transactions";
import Analytics from "../../components/Analytics/Analytics";
import {
  getTransactionAsync,
  deleteTransactionAsync,
} from "../../redux/actions/transactionActions";
import { getCategoriesAsync } from "../../redux/actions/uiActions";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [viewType, setViewType] = useState(true);
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
    setLimit((prevState) => {
      return prevState + 10;
    });
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSwitchViewType = () => {
    setViewType((prevState) => !prevState);
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
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={viewType}
            onChange={handleSwitchViewType}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Switch View
          </label>
        </div>
        {viewType ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Filters
                type={type}
                categories={categories}
                category={category}
                handleTypeChange={handleTypeChange}
                handleCategoryChange={handleCategoryChange}
              />
            </div>
            <Transactions
              transactions={transactions}
              total={total}
              handleDeleteTransaction={handleDeleteTransaction}
              handleLoadMoreTransaction={handleLoadMoreTransaction}
            />
          </>
        ) : (
          <Analytics transactions={transactions} categories={categories} />
        )}
      </>
    );
  }
};

export default Home;

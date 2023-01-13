import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BsTable } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import Spinner from "../../UI/Button/Spinner/Spinner";
import Button from "../../UI/Button/Button";
import Filters from "../../components/Filters/Filters";
import Transactions from "../../components/Transactions/Transactions";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import Analytics from "../../components/Analytics/Analytics";
import {
  getTransactionAsync,
  deleteTransactionAsync,
} from "../../redux/actions/transactionActions";
import { getCategoriesAsync } from "../../redux/actions/uiActions";
import styles from "./Home.module.css";

const Home = () => {
  const [limit, setLimit] = useState(5);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("20");
  const [viewType, setViewType] = useState("table");
  const { user } = useSelector((state) => state.auth);
  const { transactions, total, loading } = useSelector(
    (state) => state.transactions
  );

  console.log(transactions);
  const { categories } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/account");
    }
    dispatch(getCategoriesAsync());
    dispatch(getTransactionAsync(limit, type, category, duration));
  }, [user, navigate, dispatch, limit, type, category, duration]);

  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransactionAsync(id));
  };

  const handleLoadMoreTransaction = () => {
    //dispatch(getTransactionAsync(limit));
    setLimit((prevState) => {
      return prevState + 5;
    });
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSwitchViewType = (type) => {
    setViewType(type);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className="d-flex justify-content-between mb-5">
          <div
            className={`${styles.types} flex-grow d-flex justify-content-between`}
          >
            <BsTable
              color="#ff2625"
              fontSize={35}
              onClick={() => handleSwitchViewType("table")}
              title="View table"
            />
            <SiSimpleanalytics
              color="#ff2625"
              fontSize={35}
              onClick={() => handleSwitchViewType("analytics")}
              title="View analytics"
            />
          </div>
          <Link to="/add">
            <Button>Add Transaction</Button>
          </Link>
        </div>
        {viewType === "table" ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Filters
                type={type}
                categories={categories}
                category={category}
                duration={duration}
                handleTypeChange={handleTypeChange}
                handleCategoryChange={handleCategoryChange}
                handleDurationChange={handleDurationChange}
              />
            </div>
            {/* <Transactions
              transactions={transactions}
              total={total}
              handleDeleteTransaction={handleDeleteTransaction}
              handleLoadMoreTransaction={handleLoadMoreTransaction}
            /> */}
            <TransactionsList
              transactions={transactions}
              total={total}
              handleDeleteTransaction={handleDeleteTransaction}
              handleLoadMoreTransaction={handleLoadMoreTransaction}
            />
          </>
        ) : (
          <Analytics transactions={total} categories={categories} />
          // passing the total transactions without limit to the analytics component
          // to show analysis data for all transactions
        )}
      </>
    );
  }
};

export default Home;

import React, { useEffect, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { checkEmptyInputFields } from "../../utils";
import Button from "../../UI/Button/Button";
import { getCategoriesAsync } from "../../redux/actions/uiActions";
import { addTransactionAsync } from "../../redux/actions/transactionActions";

const AddTransaction = () => {
  const [addTransactionFormData, setTransactionFormData] = useState({
    text: "",
    amount: "",
    type: "",
    date: "",
    category: "",
  });
  const { type, amount, text, date, category } = addTransactionFormData;
  const { categories } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!checkEmptyInputFields([text, amount, type, date, category])) {
      //console.log(addTransactionFormData);
      dispatch(addTransactionAsync(addTransactionFormData));
      navigate("/");
    }
  };

  const disableFutureDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`;
    const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
    //console.log(`${year}-${month}-${day}`);

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <section className="mb-5">
        <Link to="/">
          <Button>Back to transactions</Button>
        </Link>
      </section>
      <h2>
        <FaMoneyCheckAlt color="#ff2625" size={50} /> Add Transaction
      </h2>
      <form onSubmit={handleAddTransaction}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
            name="text"
            value={text}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={type}
            onChange={handleInputChange}
          >
            <option value="none">----</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            max={disableFutureDates()}
            name="date"
            value={date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            value={category}
            name="category"
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <Button type="submit">Add Transaction</Button>
      </form>
    </>
  );
};

export default AddTransaction;

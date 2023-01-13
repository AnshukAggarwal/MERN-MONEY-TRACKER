import React, { useEffect, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { checkEmptyInputFields } from "../../utils";
import Button from "../../UI/Button/Button";
import { getCategoriesAsync } from "../../redux/actions/uiActions";
import { editTransactionAsync } from "../../redux/actions/transactionActions";

const EditTransaction = () => {
  const location = useLocation();
  //console.log(location.state.data);
  const { text, amount, type, date, category, _id } = location.state.data;
  const transDate = new Date(date).toISOString().split("T")[0];
  const [editTransactionFormData, setEditTransactionFormData] = useState({
    transactionText: text,
    transactionAmount: amount,
    transactionType: type,
    transactionDate: transDate,
    transactionCategory: category._id,
  });
  const {
    transactionAmount,
    transactionCategory,
    transactionDate,
    transactionText,
    transactionType,
  } = editTransactionFormData;
  const { categories } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTransactionFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleEditTransaction = (e) => {
    e.preventDefault();
    //console.log(editTransactionFormData);
    if (!checkEmptyInputFields([text, amount, type, date, category])) {
      dispatch(editTransactionAsync(editTransactionFormData, _id));
      navigate("/");
    }
  };

  return (
    <>
      <section className="mb-5">
        <Link to="/">
          <Button>Back to transactions</Button>
        </Link>
      </section>
      <h2>
        <FaMoneyCheckAlt color="#ff2625" size={50} /> Edit Transaction
      </h2>
      <form onSubmit={handleEditTransaction}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
            name="transactionText"
            value={transactionText}
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
            name="transactionAmount"
            value={transactionAmount}
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
            name="transactionType"
            value={transactionType}
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
            name="transactionDate"
            value={transactionDate}
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
            value={transactionCategory}
            name="transactionCategory"
            onChange={handleInputChange}
          >
            <option value={category._id}>{category.name}</option>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <Button type="submit">Update Transaction</Button>
      </form>
    </>
  );
};

export default EditTransaction;

const User = require("../Models/userModel");
const Transactions = require("../Models/transactionModel");
const Category = require("../Models/categoryModel");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.find({
      user: req.user._id,
    }).populate("category");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const addTransaction = async (req, res) => {
  const { text, amount, date, category, type } = req.body;
  const newTransaction = new Transactions({
    text,
    amount,
    date: new Date(date).toString(),
    user: req.user._id,
    category,
    type,
  });

  try {
    await newTransaction.save();
    const categoryName = await Category.findById(category);
    //console.log(categoryName);
    res.status(201).json({
      _id: newTransaction._id,
      text,
      amount,
      date: new Date(date).toString(),
      user: req.user._id,
      type,
      category: categoryName.name,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const editTransaction = async (req, res) => {
  const { text, amount, date } = req.body;
  const { id } = req.params;
  const transactionToUpdate = await Transactions.findById(id);

  //find the logged in user
  const user = await User.findById(req.user._id);
  //console.log(user);

  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  if (transactionToUpdate.user.toString() !== user._id.toString()) {
    res.status(401).json({ message: "User not authorized" });
  }

  const updatedTransaction = {
    text,
    amount,
    date: new Date(date).toString(),
    user: req.user._id,
  };

  try {
    await Transactions.findByIdAndUpdate(id, updatedTransaction, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  const transactionToDelete = await Transactions.findById(id);

  //find the logged in user
  const user = await User.findById(req.user._id);
  //console.log(user);

  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  if (transactionToDelete.user.toString() !== user._id.toString()) {
    res.status(401).json({ message: "User not authorized" });
  }
  try {
    await Transactions.findByIdAndDelete(id);
    res.status(200).json(transactionToDelete);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
};

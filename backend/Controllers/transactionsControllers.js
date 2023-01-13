const User = require("../Models/userModel");
const Transactions = require("../Models/transactionModel");
const Category = require("../Models/categoryModel");

// const getTransactions = async (req, res) => {
//   const limit = req.query.limit ? req.query.limit : 5;
//   //const limit = 5;
//   const { type, category } = req.query;

//   try {
//     if (type === "all" && category === "all") {
//       const transactions = await Transactions.find({
//         user: req.user._id,
//       })
//         .sort({ date: "asc" })
//         .populate("category")
//         .limit(limit);
//       const total = await Transactions.countDocuments({ user: req.user._id });
//       res.status(200).json({ transactions, total });
//     }
//     if (type === "all" && category !== "all") {
//       const selectedCategory = await Category.findById(category);
//       const transactions = await Transactions.find({
//         user: req.user._id,
//         category: selectedCategory._id,
//       })
//         .sort({ date: "asc" })
//         .populate("category")
//         .limit(limit);
//       const total = await Transactions.countDocuments({
//         user: req.user._id,
//         category: selectedCategory._id,
//       });
//       res.status(200).json({ transactions, total });
//     }
//     if (type !== "all" && category === "all") {
//       const transactions = await Transactions.find({
//         user: req.user._id,
//         type: type,
//       })
//         .sort({ date: "asc" })
//         .populate("category")
//         .limit(limit);
//       const total = await Transactions.countDocuments({
//         user: req.user._id,
//         type,
//       });
//       res.status(200).json({ transactions, total });
//     }
//     if (type !== "all" && category !== "all") {
//       const selectedCategory = await Category.findById(category);
//       const transactions = await Transactions.find({
//         user: req.user._id,
//         type: type,
//         category: selectedCategory._id,
//       })
//         .sort({ date: "asc" })
//         .populate("category")
//         .limit(limit);
//       const total = await Transactions.countDocuments({
//         user: req.user._id,
//         type: type,
//         category: selectedCategory._id,
//       });
//       res.status(200).json({ transactions, total });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const getTransactions = async (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;
  const { type, category, duration } = req.query;
  const today = new Date();
  today.setDate(today.getDate() - duration);

  try {
    let selectedCategory = "";
    if (category !== "all") {
      selectedCategory = await Category.findById(category);
    }
    const transactions = await Transactions.find({
      user: req.user._id,
      ...(type !== "all" && { type: type }),
      ...(category !== "all" && { category: selectedCategory._id }),
      date: {
        $gt: today,
      },
    })
      .sort({ date: "asc" })
      .populate("category")
      .limit(limit);
    const total = await Transactions.find({
      user: req.user._id,
      ...(type !== "all" && { type }),
      ...(category !== "all" && { category: selectedCategory._id }),
      date: {
        $gt: today,
      },
    })
      .sort({ date: "asc" })
      .populate("category");

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.findById(req.params.id).populate(
      "category"
    );
    //find the logged in user
    const user = await User.findById(req.user._id);
    //console.log(user);

    if (!user) {
      res.status(401).json({ message: "User not found" });
    }

    if (transaction.user.toString() !== user._id.toString()) {
      res.status(401).json({ message: "User not authorized" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addTransaction = async (req, res) => {
  const { text, amount, date, category, type } = req.body;
  const newTransaction = new Transactions({
    text,
    amount,
    date: new Date(date).toISOString(),
    user: req.user._id,
    category,
    type,
  });

  try {
    await newTransaction.save();
    res.status(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const editTransaction = async (req, res) => {
  const {
    transactionText,
    transactionAmount,
    transactionType,
    transactionDate,
    transactionCategory,
  } = req.body;
  const { id } = req.params;
  const transactionToUpdate = await Transactions.findById(id);
  //console.log(transactionToUpdate);

  //find the logged in user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401).json({ message: "User not found" });
  }

  if (transactionToUpdate.user.toString() !== user._id.toString()) {
    res.status(401).json({ message: "User not authorized" });
  }

  try {
    const updatedTransaction = {
      _id: id,
      text: transactionText,
      amount: transactionAmount,
      date: new Date(transactionDate).toISOString(),
      user: req.user._id,
      category: transactionCategory,
      type: transactionType,
    };

    await Transactions.findByIdAndUpdate(id, updatedTransaction, { new: true });
    const transactions = await Transactions.find({
      user: req.user._id,
    })
      .sort({ date: "asc" })
      .populate("category");
    res.status(200).json(transactions);
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
    const transactions = await Transactions.find({
      user: req.user._id,
    })
      .populate("category")
      .sort({ date: "asc" });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransaction,
};

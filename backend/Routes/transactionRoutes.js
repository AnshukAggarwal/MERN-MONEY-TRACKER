const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransaction,
} = require("../Controllers/transactionsControllers");

const secure = require("../Middlewares/auth");

router.get("/", secure, getTransactions);
router.get("/:id", secure, getTransaction);
router.post("/add", secure, addTransaction);
router.put("/edit/:id", secure, editTransaction);
router.delete("/delete/:id", secure, deleteTransaction);

module.exports = router;

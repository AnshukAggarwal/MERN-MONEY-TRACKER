const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TransactionsSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add data in the text field"],
  },
  amount: {
    type: Number,
    required: [true, "Please add data in the text field"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transactions", TransactionsSchema);

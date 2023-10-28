const mongoose = require("mongoose");

const bankAccSchema = new mongoose.Schema({
  bankNameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankName",
    required: [true, "Bank Name must be specified"],
  },
  account_name: {
    type: String,
    required: [true, "Bank account must be added"],
  },
  account: {
    type: String,
    required: [true, "Bank account must be added"],
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const BankAcc = mongoose.model("BankAcc", bankAccSchema);
module.exports = BankAcc;

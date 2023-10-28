const mongoose = require("mongoose");
const bankTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be add"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const BankType = mongoose.model("BankType", bankTypeSchema);
module.exports = BankType;

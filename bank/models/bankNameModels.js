const mongoose = require("mongoose");

const bankNameSchema = new mongoose.Schema({
  bankTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankType",
    required: [true, "Bank type must be specified"],
  },
  name: {
    type: String,
    required: [true, "Bank name must be added"],
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const BankName = mongoose.model("BankName", bankNameSchema);
module.exports = BankName;

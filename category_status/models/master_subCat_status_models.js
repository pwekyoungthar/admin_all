const mongoose = require("mongoose");

const masterSubCatStatusSchema = new mongoose.Schema({
  master_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subCatStatus: [
    {
      catName_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GameCategories",
        required: true,
      },
      catName: {
        type: String,
        required: true,
      },
      subCatName: {
        type: String,
        required: [true, "Please Add Game Category Name"],
      },
      comession: {
        type: Number,
        default: 0,
      },
      mainCompensation: {
        type: Number,
        default: 0,
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const MasterSubCatStatus = mongoose.model(
  "MasterSubCatStatus",
  masterSubCatStatusSchema
);

module.exports = MasterSubCatStatus;

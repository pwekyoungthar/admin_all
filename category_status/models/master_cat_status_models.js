const mongoose = require("mongoose");

const masterCatStatusSchema = new mongoose.Schema({
  master_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryStatus: [
    {
      cat_id: {
        type: String,
        required: true,
      },
      cat_name: {
        type: String,
        required: [true, "Please Add Game Category Name"],
      },
      status: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const MasterCatStatus = mongoose.model(
  "MasterCatStatus",
  masterCatStatusSchema
);

module.exports = MasterCatStatus;

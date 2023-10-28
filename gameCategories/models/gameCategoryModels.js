const mongoose = require("mongoose");

const gameCategorySchema = new mongoose.Schema({
  cat_name: {
    type: String,
    required: [true, "Please Add Game Category Name"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const GameCategory = mongoose.model("GameCategory", gameCategorySchema);

module.exports = GameCategory;

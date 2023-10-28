const mongoose = require("mongoose");

const gameSubCategorySchema = new mongoose.Schema({
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
  status: {
    type: Boolean,
    default: true,
  },
  image: "String",
});

const GameSubCat = mongoose.model("GameSubCat", gameSubCategorySchema);

module.exports = GameSubCat;

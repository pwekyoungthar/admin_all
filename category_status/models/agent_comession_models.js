const mongoose = require("mongoose");

const agentSubCatComessionSchema = new mongoose.Schema({
  uplineId: {
    type: String,
  },
  agent_id: {
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
    },
  ],
});

const AgentSubCatComession = mongoose.model(
  "AgentSubCatComession",
  agentSubCatComessionSchema
);

module.exports = AgentSubCatComession;

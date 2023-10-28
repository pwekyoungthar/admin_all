const mongoose = require("mongoose");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

const lotterySettingSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameSubCat",
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  mainCompensation: {
    type: Number,
    default: 0,
  },
  otherCompensation: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  limitAmount: {
    type: Number,
    default: 0,
  },
});

const lotterySetting = mongoose.model("lotterySetting", lotterySettingSchema);
module.exports = lotterySetting;

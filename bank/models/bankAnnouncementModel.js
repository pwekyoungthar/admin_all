const mongoose = require("mongoose");
const bankAnnouncSchema = new mongoose.Schema({
  description_deposit: {
    type: String,
    required: [true, "Description must be add"],
    default: "ငွေသွင်းငွေထုတ်များကို 24 နာရီ တိကျစွာ ဆောင်ရွက်ပေးနေပါသည်။",
  },
  description_withdraw: {
    type: String,
    required: [true, "Description must be add"],
    default: "ငွေသွင်းငွေထုတ်များကို 24 နာရီ တိကျစွာ ဆောင်ရွက်ပေးနေပါသည်။",
  },
});
const BankAnnounc = mongoose.model("BankAnnounc", bankAnnouncSchema);
module.exports = BankAnnounc;

const MasterCatStatus = require("../models/master_cat_status_models");
const User = require("../../users/userModels");

// Read All Categoires Stattus With Master
exports.getGameCatStatusAll = async (req, res) => {
  const masterId = req.body.uplineId;
  const userData = await User.findOne({ userId: masterId }).exec();
  if (!userData) {
    return res.status(404).json({ status: "Error", message: "User not found" });
  }
  const MasterRealId = userData._id.toString();

  const allGameCatStatus = await MasterCatStatus.findOne({
    master_id: MasterRealId,
  });

  res.status(200).json({
    status: "Success",
    data: {
      allGameCatStatus,
    },
  });
};

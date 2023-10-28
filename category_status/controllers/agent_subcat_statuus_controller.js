const MasterSubCatStatus = require("../models/master_subCat_status_models");
const User = require("../../users/userModels");

// Read All Categoires Stattus With Master
exports.getGameSubCatStatusAll = async (req, res) => {
  const masterId = req.body.uplineId;
  const userData = await User.findOne({ userId: masterId }).exec();
  if (!userData) {
    return res.status(404).json({ status: "Error", message: "User not found" });
  }
  const MasterRealId = userData._id.toString();

  const allGameSubCatStatus = await MasterSubCatStatus.findOne({
    master_id: MasterRealId,
  });

  res.status(200).json({
    status: "Success",
    data: {
      allGameSubCatStatus,
    },
  });
};

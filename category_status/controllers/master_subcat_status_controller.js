const MasterSubCatStatus = require("../models/master_subCat_status_models");

// Create Game Category
// exports.createGameCat = async (req, res) => {
//   try {
//     const newGameCat = await GameCategory.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         newGameCat,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// };

// Read All Categoires Stattus With Master
exports.getGameSubCatStatusAll = async (req, res) => {
  const masterId = req.body.id;

  const allGameSubCatStatus = await MasterSubCatStatus.findOne({
    master_id: masterId,
  }).populate({
    path: "master_id",
    select:
      "-userId -email -role -uplineId -downlineId -unit -promotionUnit -gameUnit -userLevel -status -loginTime -__v",
  });

  res.status(200).json({
    status: "Success",
    data: {
      allGameSubCatStatus,
    },
  });
};

// Update Game Sub Category Status
exports.updateGameSubCatStatus = async (req, res) => {
  try {
    const masterId = req.body.masterId;
    const subCatIdToUpdate = req.body.subCatIdToUpdate;
    const statusVal = req.body.status;

    const updatedDoc = await MasterSubCatStatus.findOneAndUpdate(
      {
        master_id: masterId,
        "subCatStatus.catName_id": subCatIdToUpdate,
      },
      {
        $set: {
          "subCatStatus.$.status": statusVal,
        },
      },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      data: {
        updatedDoc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

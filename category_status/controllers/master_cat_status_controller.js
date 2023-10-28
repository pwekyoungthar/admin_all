const MasterCatStatus = require("../models/master_cat_status_models");

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
exports.getGameCatStatusAll = async (req, res) => {
  const masterId = req.body.id;

  const allGameCatStatus = await MasterCatStatus.findOne({
    master_id: masterId,
  }).populate({
    path: "master_id",
    select:
      "-userId -email -role -uplineId -downlineId -unit -promotionUnit -gameUnit -userLevel -status -loginTime -__v",
  });

  res.status(200).json({
    status: "Success",
    data: {
      allGameCatStatus,
    },
  });
};

// Update Game Category Status
exports.updateGameCatStatus = async (req, res) => {
  try {
    const masterId = req.body.masterId;
    const catIdToUpdate = req.body.catIdToUpdate;
    const statusVal = req.body.status;

    const updatedDoc = await MasterCatStatus.findOneAndUpdate(
      {
        master_id: masterId,
        "categoryStatus.cat_id": catIdToUpdate,
      },
      {
        $set: {
          "categoryStatus.$.status": statusVal, // Update the 'status' field of the matched object
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

const MainUnitHistory = require("../models/mainUnitHistoryModel");

exports.readMainUnitHistoryAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = MainUnitHistory.find(JSON.parse(queryStr));
    const mainUnitHistories = await query;

    res.status(200).json({
      status: "success",
      length: mainUnitHistories.length,
      data: {
        mainUnitHistories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

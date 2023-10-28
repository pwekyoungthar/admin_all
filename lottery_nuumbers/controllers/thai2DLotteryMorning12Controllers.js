const Thai2DNumMorning12 = require("../models/thai2DNum12Models");

exports.read2dAllNum = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Thai2DNumMorning12.find(JSON.parse(queryStr));
    const lottery2dNumAll = await query;

    res.status(200).json({
      status: "success",
      length: lottery2dNumAll.length,
      data: {
        lottery2dNumAll,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.update2DNum = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(req.body);
    const updateSingle2DNumField = await Thai2DNumMorning12.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    console.log(req.body, updateSingle2DNumField);
    res.status(200).json({
      status: "success",
      data: {
        updateSingle2DNumField,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

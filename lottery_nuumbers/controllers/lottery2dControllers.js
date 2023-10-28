const fs = require("fs");
const Lottery2dNum = require("../models/thai2DNum12Models");

const number2DAll = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/2d.json`, "utf-8")
);

exports.create2D = async (req, res) => {
  try {
    for (const singleNum of number2DAll) {
      const single2DNum = await Lottery2dNum.create(singleNum);
    }
    res.status(201).json({
      status: "Complete Insert Data",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.read2dAllNum = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Lottery2dNum.find(JSON.parse(queryStr));
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

exports.updateSingle2DNum = async (req, res) => {
  try {
    const id = req.params.id;
    const reqBody = req.body;
    console.log(id, reqBody);

    const updateSingle2DNumField = await Lottery2dNum.findByIdAndUpdate(
      id,
      reqBody
    );
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

// exports.deleteSingle2DNum = (req, res) => {
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     res.status(404).json({
//       status: "fail",
//       message: "Invalid Data",
//     });
//   }
//   res.status(204).json({
//     status: "success",
//     message: "null",
//   });
// };

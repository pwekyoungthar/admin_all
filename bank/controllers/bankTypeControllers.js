const BankType = require("../models/banktypeModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
// Create Bank Type
exports.createBankType = catchAsync(async (req, res) => {
  try {
    const newBankType = await BankType.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newBankType,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Read All Bank Type
exports.getBankTypeAll = catchAsync(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = BankType.find(JSON.parse(queryStr));
    const allBankType = await query;

    res.status(200).json({
      status: "Success",
      length: allBankType.length,
      data: {
        allBankType: allBankType,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Type name
exports.updateBankType = catchAsync(async (req, res) => {
  try {
    const bankTypeId = req.body.id;
    const updateObj = {
      name: req.body.name ? req.body.name : updateBankType.name,
      status: req.body.status || true,
    };

    const updateBankType = await BankType.findByIdAndUpdate(
      bankTypeId,
      updateObj,
      {
        new: true,
      }
    );
    console.log(updateBankType);
    res.status(200).json({
      status: "Success",
      data: {
        updateBankType,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

const BankAnnouncement = require("../models/bankAnnouncementModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
// Create Bank Announcement
exports.createBankAnnounc = catchAsync(async (req, res) => {
  try {
    const newBankAnnounc = await BankAnnouncement.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newBankAnnounc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Read Bank Announcement
exports.getBankAnnounc = catchAsync(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = BankAnnouncement.find(JSON.parse(queryStr));
    const bankAnnounc = await query;

    res.status(200).json({
      status: "Success",
      data: {
        bankAnnounc: bankAnnounc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Announcement
exports.updateBankAnnounc = catchAsync(async (req, res) => {
  try {
    const bankAnnouncId = "653927421daa11cfe5f1c9d5";
    const updateObj = req.body;

    const updateBankAnnouncment = await BankAnnouncement.findByIdAndUpdate(
      bankAnnouncId,
      updateObj,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "Success",
      data: {
        updateBankAnnouncment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

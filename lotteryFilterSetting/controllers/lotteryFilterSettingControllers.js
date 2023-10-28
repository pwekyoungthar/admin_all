const mongoose = require("mongoose");
const LotteryFilterSetting = require("../models/lotteryFilterSettingModels");
const moment = require("moment-timezone");
const Thai2DNum12AM = require("../../lottery_nuumbers/models/thai2DNum12Models");

// Create Lottery Setting
exports.createLotterySetting = async (req, res) => {
  try {
    const reqBody = req.body;
    const currentTime = new Date();
    reqBody.startDate = currentTime;
    reqBody.endDate = currentTime;

    const newLotterySetting = await LotteryFilterSetting.create({
      ...reqBody,
    });

    console.log(newLotterySetting);

    const resObj = await LotteryFilterSetting.findById(
      newLotterySetting._id
    ).populate("subCategoryId");

    resObj.startDate = moment(resObj.startDate).tz("Asia/Yangon").format();
    resObj.endDate = moment(resObj.endDate).tz("Asia/Yangon").format();

    res.status(201).json({
      status: "success",
      data: {
        resObj,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
    console.log(err);
  }
};

// Read All Lottries Setting
exports.getAllLotterySetting = async (req, res) => {
  const query = LotteryFilterSetting.find().populate("subCategoryId");
  const showLotterySettingAll = await query;

  res.status(200).json({
    status: "Success",
    data: {
      showLotterySettingAll,
    },
  });
};

// Update Single Lottery Game Setting Start Time , End Time and limitAmount
exports.updateLotterySettingById = async (req, res) => {
  try {
    const id = req.body.id;

    const updateLotterySetting = await LotteryFilterSetting.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    await Thai2DNum12AM.updateMany({
      $set: { limitAmount: updateLotterySetting.limitAmount },
    });

    res.status(200).json({
      status: "Success",
      data: {
        updateLotterySetting,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

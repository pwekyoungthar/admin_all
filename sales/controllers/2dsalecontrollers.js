const Thai2DSale = require("../models/2dsalemodels");
const Thai2DNum12AM = require("../../2DAll/models/thai2DLotteryMorning12Models");
const lotterySetting = require("../../lotterySetting/models/lotterySettingModels");
const User = require("../../users/userModels");
const MainUnit = require("../../mainUnit/models/mainUnitModel");
const moment = require("moment-timezone");
exports.create2DsaleDoc = async (req, res) => {
  try {
    console.log(req.body);
    const mainUnitId = "6527d1074eb2bfc53e025c9d";
    const selectedSetting = await lotterySetting.findById(req.body.subCatId);
    const mainUnit = await MainUnit.findById(mainUnitId);
    const All2D12AM = await Thai2DNum12AM.find({});
    const currentTime = new Date();
    console.log(selectedSetting.startDate, selectedSetting.endDate);
    const startDate = new Date(selectedSetting.startDate);
    // (new Date(selectedSetting.startDate))
    //   .tz("Asia/Yangon")
    //   .format();
    const endDate = new Date(selectedSetting.endDate);
    console.log(startDate.getTime(), currentTime.getTime(), endDate.getTime());
    console.log(
      startDate.getTime() <= currentTime.getTime(),
      currentTime.getTime() < endDate.getTime()
    );

    const user = await User.findById(req.body.userId);

    if (
      startDate.getTime() <= currentTime.getTime() &&
      currentTime.getTime() < endDate.getTime()
    ) {
      const reqBody = req.body;
      // make an array for playableNumber
      const playedNumbers = reqBody.saleNumberArr.filter((sale) => {
        let curNum = All2D12AM.find((num) => num.number === sale.number);
        return sale.amount <= curNum.lastAmount;
      });

      // make an array for unplayableNumber
      const unPlayAbleNumbers = reqBody.saleNumberArr.filter((sale) => {
        let curNum = All2D12AM.find((num) => num.number === sale.number);
        return sale.amount > curNum.lastAmount;
      });

      const totalSaleAmount = playedNumbers
        .map((num) => num.amount)
        .reduce((acr, cur) => acr + cur, 0);
      console.log(
        user,
        user.unit,
        totalSaleAmount,
        mainUnit.mainUnit,
        "line 94"
      );
      if (totalSaleAmount <= user.unit) {
        const updatedMainUnit = await MainUnit.findByIdAndUpdate(mainUnitId, {
          mainUnit: mainUnit.mainUnit + totalSaleAmount,
        });
        const updatedUser = await User.findByIdAndUpdate(reqBody.userId, {
          unit: user.unit - totalSaleAmount,
        });
        // Loop through the saleNumberArr and create Thai2DSale documents
        for (const sale of playedNumbers) {
          let number = sale.number;
          const updatedDocument = await Thai2DNum12AM.findOne({ number });
          const newThai2DSale = new Thai2DSale({
            subCatId: reqBody.subCatId,
            userId: reqBody.userId,
            number: number,
            amount: sale.amount,
          });

          // Save the new Thai2DSale document to the database
          await newThai2DSale.save();

          // Calculate the total amount for this number
          const totalAmount = await Thai2DSale.aggregate([
            {
              $match: { number: number },
            },
            {
              $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
              },
            },
          ]);

          // update each number with total amount
          const updatedMorning2D = await Thai2DNum12AM.findOneAndUpdate(
            { number },
            {
              $set: {
                totalAmount: totalAmount[0].totalAmount,
                lastAmount:
                  updatedDocument.limitAmount - totalAmount[0].totalAmount,
                percentage:
                  (totalAmount[0].totalAmount / updatedDocument.limitAmount) *
                  100,
              },
            },
            { new: true } // To return the updated document
          );
        }
        if (unPlayAbleNumbers.length > 0) {
          const rejectNums = unPlayAbleNumbers.map((num) => num.number);
          res.status(201).json({
            status: "success",
            unPlayAbleNumbers,
            playedNumbers,
            message:
              "PlayedNumbers are the numbers that are played and unPlayAbleNumbers are rejected numbers by admin.",
          });
        } else {
          res.status(201).json({
            status: "success",
            playedNumbers,
            message: "playedNumbers are the numbers that are played.",
          });
        }
      } else {
        res.status(201).json({
          status: "failed",
          message: "Insufficient Unit",
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message:
          "You can't make this action at the moment. Please try again later.",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

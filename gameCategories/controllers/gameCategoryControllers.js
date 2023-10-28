const GameCategory = require("../models/gameCategoryModels");

// Create Game Category
exports.createGameCat = async (req, res) => {
  try {
    const newGameCat = await GameCategory.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newGameCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read All Game Category
exports.getGameCatAll = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = GameCategory.find();
  const allGameCategory = await query;

  res.status(200).json({
    status: "Success",
    data: {
      allGameCategory,
    },
  });
};

// Read All Game Category For Report
exports.getGameCatAllForReport = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = await GameCategory.find({ status: true });

  res.status(200).json({
    status: "Success",
    data: {
      gameCategory: query,
    },
  });
};

// Update Game Category
exports.updateGameCatStatus = async (req, res) => {
  try {
    const updateGameCat = await GameCategory.findByIdAndUpdate(
      req.body.id,
      { status: req.body.status },
      {
        new: true,
        runValidator: true,
      }
    );
    res.status(200).json({
      status: "Success",
      data: {
        updateGameCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

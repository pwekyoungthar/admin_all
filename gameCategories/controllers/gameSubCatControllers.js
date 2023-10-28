const SubGameCat = require("../models/gameSubCatModels");
const GameCat = require("../models/gameCategoryModels");

// Create Sub Game Category
exports.createSubGameCat = async (req, res) => {
  try {
    const reqObj = req.body;
    const catName_id = reqObj.catName_id;
    const catObj = await GameCat.findById(catName_id);
    const catName = catObj.cat_name;
    const subCatName = req.body.subCatName;

    const newSubCatGameObj = {
      catName_id: catName_id,
      catName: catName,
      subCatName: subCatName,
      image: "String",
    };

    const newSubGameCat = await SubGameCat.create(newSubCatGameObj);
    res.status(201).json({
      status: "success",
      data: {
        newSubGameCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read All Game Sub Category
exports.getSubGameCatAll = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const query = SubGameCat.find();
  const allSubGameCat = await query;

  res.status(200).json({
    status: "Success",
    length: allSubGameCat.length,
    data: {
      allSubGameCat,
    },
  });
};

// Read All Sub Game Category For Report
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

// Update Game Sub Category
exports.updateSubGameCat = async (req, res) => {
  try {
    const updateSubGameCat = await SubGameCat.findByIdAndUpdate(
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
        updateSubGameCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

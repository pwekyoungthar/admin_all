const multer = require("multer");
const BankAcc = require("../models/bankAccModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/bank_acc");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("No an Image!, Please Upload only Image", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadBankAccImg = upload.single("img");

// Create Bank Account
exports.createBankAcc = catchAsync(async (req, res) => {
  try {
    if (req.file) {
      const reqBody = req.body;
      reqBody.img = req.file.filename;
      const imageLink = `${req.protocol}://${req.get("host")}/images/bank_acc/${
        req.file.filename
      }`;
      const newBankAcc = await BankAcc.create({ ...req.body });
      const newBankAccData = await BankAcc.findById(newBankAcc._id).populate(
        "bankNameId"
      );
      res.status(201).json({
        status: "success",
        data: {
          newBankAccData,
          imageLink,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Read All Bank Account
exports.getBankAccAll = catchAsync(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // Select the 'img' field in the query
    const query = BankAcc.find(JSON.parse(queryStr)).populate("bankNameId");

    const allBankAcc = await query;

    // Construct image links for each result
    const bankAccWithImageLinks = allBankAcc.map((bankAcc) => {
      return {
        ...bankAcc._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
          bankAcc.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allBankAcc.length,
      data: {
        allBankAcc: bankAccWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Account name
exports.updateBankAcc = catchAsync(async (req, res) => {
  try {
    const bankAccId = req.params.id; // Assuming you have the bank name's ID in the route parameter
    const updateObj = {};

    if (req.body.bankNameId) {
      updateObj.bankNameId = req.body.bankNameId;
    }

    if (req.body.name) {
      updateObj.name = req.body.name;
    }

    if (req.body.account) {
      updateObj.account = req.body.account;
    }

    if (req.body.status) {
      updateObj.status = req.body.status;
    }

    if (req.file) {
      updateObj.img = req.file.filename;
      updateObj.imgLink = `${req.protocol}://${req.get(
        "host"
      )}/images/bank_name/${req.file.filename}`;
    }

    const updatedBankAcc = await BankAcc.findByIdAndUpdate(
      bankAccId,
      updateObj,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: {
        updatedBankAcc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

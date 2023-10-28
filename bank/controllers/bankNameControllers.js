const multer = require("multer");
const BankName = require("../models/bankNameModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/bank_name");
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
exports.uploadBankNameImg = upload.single("img");

// Create Bank Name
exports.createBankName = catchAsync(async (req, res) => {
  try {
    if (req.file) {
      const reqBody = req.body;
      reqBody.img = req.file.filename;
      const imageLink = `${req.protocol}://${req.get(
        "host"
      )}/images/bank_name/${req.file.filename}`;
      const newBankName = await BankName.create({ ...req.body });

      const newBankData = await BankName.findById(newBankName._id).populate(
        "bankTypeId"
      );
      res.status(201).json({
        status: "success",
        data: {
          newBankData,
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

// Read All Bank Name
exports.getBankNameAll = catchAsync(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // Select the 'img' field in the query
    const query = BankName.find().populate("bankTypeId");

    const allBankName = await query;

    // Construct image links for each result
    const bankNameWithImageLinks = allBankName.map((bankName) => {
      return {
        ...bankName._doc,
        imgLink: `${req.protocol}://${req.get("host")}/images/bank_name/${
          bankName.img
        }`,
      };
    });

    res.status(200).json({
      status: "Success",
      length: allBankName.length,
      data: {
        allBankName: bankNameWithImageLinks, // Include image links in the response
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank name
exports.updateBankName = catchAsync(async (req, res) => {
  try {
    const bankNameId = req.params.id; // Assuming you have the bank name's ID in the route parameter
    console.log(bankNameId);
    // Access the fields from form-data
    const name = req.body.name;
    const status = req.body.status || true;

    console.log(name);

    const updateObj = {
      name,
      status,
    };

    // Access the uploaded image data
    if (req.file) {
      updateObj.img = req.file.filename;
      updateObj.imgLink = `${req.protocol}://${req.get(
        "host"
      )}/images/bank_name/${req.file.filename}`;
    }

    // Use findByIdAndUpdate to update the fields
    const updatedBankName = await BankName.findByIdAndUpdate(
      bankNameId,
      updateObj,
      {
        new: true,
      }
    ).populate("bankTypeId");

    res.status(200).json({
      status: "Success",
      data: {
        updatedBankName,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  userId: {
    type: String,
    required: [true, "Please Provide Unique Id"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide A Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide A Password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Confirm Your Password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password and Confirm Password are not same and Try Again.",
    },
  },
  role: {
    type: String,
    enum: [
      "Admin",
      "Sub Admin",
      "Stuff",
      "Master",
      "Agent",
      "Affilate Agent",
      "User",
    ],

    default: "User",
  },

  uplineId: {
    type: String,
    required: [true, "Please Insert Upline ID"],
    default: "Hello",
  },
  downlineId: {
    type: String,
    required: [true, "Please Insert Upline ID"],
    default: "Hi",
  },
  profileImg: String,
  unit: {
    type: Number,
    default: 0,
  },
  promotionUnit: {
    type: Number,
    default: 0,
  },
  gameUnit: {
    type: Number,
    default: 0,
  },
  userLevel: String,
  status: {
    type: Boolean,
    default: true,
  },
  loginTime: {
    type: Date,
    default: () => moment().tz("Asia/Yangon").format(),
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExipre: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined; // Update to 'confirmPassword'
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

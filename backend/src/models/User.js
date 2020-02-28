const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }, // For all world
  password: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  verify: {
    type: Boolean,
    required: true,
    default: false
  },
  verifyToken: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", UserSchema);

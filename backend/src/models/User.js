const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  code: String,
  phone: String, // For all world
  password: {
    type: String,
    required: true,
    select: false
  }
});

// UserSchema.pre("save", async next => {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

module.exports = mongoose.model("User", UserSchema);

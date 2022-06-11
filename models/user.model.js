const mongoose = require("mongoose");
const { roles } = require("../config/constants");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    requierd: true,
  },
  last_name: {
    type: String,
    requierd: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    max: 100,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.user],
    default: roles.user,
  },
  token: { type: String },
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = new mongoose.model("User", UserSchema);
module.exports = User;

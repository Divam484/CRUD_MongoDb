const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
  },
  deleted: {
    type:Boolean,
    default:false
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  deleted_at:{
    type: Date,
  }
});




const Users = mongoose.model("User", usersSchema);

module.exports = Users;

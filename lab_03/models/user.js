const mongoose = require("mongoose")
const {Schema} = require("mongoose");

const User = mongoose.model('User', new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    sex: { type: String, default: "other"  },
    age: { type: Number, default: -1 },
}));

module.exports = User;
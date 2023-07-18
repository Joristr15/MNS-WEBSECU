const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true, index : true },
    password: { type: String, required: true, minLength : 6 },
    roles: { type: [String] , enum : ['user','admin'], default: 'user' },
});

module.exports = mongoose.model("User", userSchema)
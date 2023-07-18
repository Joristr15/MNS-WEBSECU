const mongoose = require('mongoose');
const {Schema} = mongoose;

const posteSchema = new Schema({
    idcreator: { type: String, required: true, index : true },
    datepost: { type: Date, required: true},
    textpost: { type: String , required: true},
    arraylike: { type: Array},
});

module.exports = mongoose.model("Poste", posteSchema)
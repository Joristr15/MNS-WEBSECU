const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/api",{
            pass: "api_PASS",
            user: "api_USER"
        })
        mongoose.set('debug', true);
        console.log("Connecté a la DB")
    } catch (err) {
        console.error("Erreur connection DB", err);
        process.exit(1);
    }
}

module.exports = connectDB;
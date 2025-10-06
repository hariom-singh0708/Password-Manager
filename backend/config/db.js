const mongoose = require("mongoose");

const connectDB = async(mongoUri) => {
    try{
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected Successfully");
    } catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
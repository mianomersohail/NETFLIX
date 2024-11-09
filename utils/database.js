require('dotenv').config();
const mongoose = require('mongoose');

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = DatabaseConnection;

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./utils/database');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3003;
database();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//all routes are here
const Register =require('./Routes/userRoute')
app.use('/api/v1/user',Register)
app.listen(port, function() {

    console.log(`Your app is listening on port ${port}`);
});

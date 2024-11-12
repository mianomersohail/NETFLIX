require('dotenv').config()
const jwtSecret = process.env.jwtSecret;
const UserSchemas = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(401).json({ message: 'Invalid Data', success: false })
        }
        const user = await UserSchemas.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email/Password", success: false })
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(401).json({ message: "Invalid Email/Password", success: false })
        }
        const tokendata = {
            id: user._id
        }
        const token = jwt.sign(tokendata, jwtSecret, { expiresIn: "1d" })

        return res.status(200).cookie('token', token, { secure: true, sameSite: 'None', maxAge: 30 * 24 * 60 * 60 * 1000 }).json({ message: `welcome back ${user.fullName}`, user, success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error", error, success: false });
    }
}
const Logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(0), 
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }).json({ message: "Logout Successfully", success: true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error", error, success: false });
    }
}
const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Invalid Data", success: false });
        }
        const user = await UserSchemas.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "This Email is Already in Use", success: false });
        }
        const hashpassword = await bcrypt.hash(password, 16)
        const newUser = new UserSchemas({ fullName, email, password: hashpassword });
        await newUser.save();
        return res.status(201).json({ message: "Account Created Successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", error, success: false });
    }
};
module.exports = { Login, Logout, Register };

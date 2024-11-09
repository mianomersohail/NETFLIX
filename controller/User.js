const UserSchemas = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(401).json({ message: 'Invalid Data', success: false })
        }
        const user = await UserSchemas.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email/Password", success: false })
        }
        const ismatch=bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(401).json({message:"Invalid Email/Password",success:false})

        }

        const token=jwt.sign('toke','')

    } catch (error) {
        console.log(error)
    }
}
const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Invalid Data", success: false });
        }

        const user = await UserSchemas.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "This Email is Already in Use", success: false });
        }
        const hashpassword = await bcrypt.hash(password, 16)

        const newUser = new UserSchemas({ fullname, email, password: hashpassword });
        await newUser.save();
        return res.status(201).json({ message: "Account Created Successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", error, success: false });
    }
};

module.exports = { Register };

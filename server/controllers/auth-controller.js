// ***********
// Registration logic
// *********

const User = require('../models/user-model');
const bcrypt = require('bcryptjs')

const home = async(req, res) => {

    try {
        res.status(200).send("work in  controller and this is home page");

    } catch (error) {
        console.log(error);
    }
}
const register = async(req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;


        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "email already exist" });
        }

        // hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        res.status(200).send({
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });
    } catch (error) {
        res.status(400).send({ msg: "page not found" })
    }
};

// ***********
// login logic
// *********
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or passord " });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
// ***********
// get user imformation logic
// *********

const user = async(req, res) => {
    try {
        // const userData = await User.find({});
        const userData = req.user;
        // console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(` error from user route ${error}`);
    }
};

module.exports = { home, register, login, user };
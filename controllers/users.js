const jwt = require('jsonwebtoken');
const dev = require('../config')

const { securePassword } = require("../helpers/bcryptPassword");
const User = require('../models/users');

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.fields;
        const {image} = req.files;

        if(!name || !email || !phone || !password) {
            return res.status(404).json({
                message: "name, email, phone or password is missing"
            })
        }

        if (password.length < 6) {
            return res.status(404).json({
                message: 'minimum length for password is 6'
            })
        }
        if (image && image.size > 10000000) {
            return res.status(404).json({
                message: 'maximum size for image is 1Mb'
            })
        }

        const isExist = await User.findOne({email: email})
        if(isExist){
            return res.status(404).json({
                message: 'user with email already exists'
            })
        }

        const hashedPassword = await securePassword(password);
        //store the data
        const token = jwt.sign(
                {name, email, phone, hashedPassword, image}, 
                dev.app.jwtSecretKey
            );
            console.log(token);
            

            res.status(200).json({
                token: token,
            });


        //res.status(200).json({message: 'user is created'})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {registerUser}
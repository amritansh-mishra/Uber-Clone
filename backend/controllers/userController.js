//let's see how we perform authentication
const userModel = require('../models/user-models');
//service that will interact with database and perform user registration i.e (userService.js)
const userService = require('../services/userService');
const { validationResult } = require('express-validator');




module.exports.registerUser = async (req, res) => {  //iske ander user ko register krne ka logic likhna hai
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body); //logging the request body to console for debugging

    const {fullname, email, password } = req.body; //destructuring the request body to get user details

    const hashedPassword = await userModel.hashPassword(password); //hashing the password using userModel method

    const user = await userService.createUser({ //creating a new user using userService
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword //storing the hashed password
    });

    const token = user.generateAuthToken(); //generating auth token for the user
    res.status(201).json({ token, user}); //sending the token and user details in response
    
}; 

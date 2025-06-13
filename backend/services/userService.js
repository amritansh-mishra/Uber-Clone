const userModel = require('../models/user-models');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
};

//is function ka bas usercreate krne ka kaam hai
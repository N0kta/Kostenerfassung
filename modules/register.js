const User = require ('../models/user.js');
const userExist = require('../models/userExist');
const validator = require('validator');

const register = async function (IName, IPass, IEmail, IAccount) {
    if(validator.isEmail(IEmail)) {
        console.log('Valid Email');
        if(await userExist.emailExist(IEmail)) {
            console.log('email Taken');
        } else {
            console.log('User Available');
            if(validator.isStrongPassword(IPass)) {
                console.log('Strong Password!');

                const user = new User({
                    userName: IName,
                    userPass: IPass,
                    userEmail: IEmail,
                    userAccount: IAccount
                  });
                  
                  console.log('Registered new email')
                user.save();
                 
          

            } else {
                console.log('Password too weak.');
            }
        }
    } else {
        console.log('Invalid Email');
    }
}

module.exports.register = register;
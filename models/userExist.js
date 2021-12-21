const User = require ('./user');

const emailExist = Email => User.findOne({userEmail: Email}).lean().exec();

module.exports.emailExist = emailExist;
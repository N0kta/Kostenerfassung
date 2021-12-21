const User = require ('./user');

const logUser = (Email, Pass) => User.findOne({userEmail: Email, userPass: Pass}).lean().exec();

module.exports.logUser = logUser;
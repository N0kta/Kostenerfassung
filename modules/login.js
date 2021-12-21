/* const User = require ('../models/user.js');
const bcrypt = require('bcrypt');


const login = async function (email, pass) {

  User.findOne({userEmail: email}, async function (err, doc) {
    if(err){
      console.log('Versuchen sie es nochmal')
      console.log(err.message);
    } else {
      try {
        const passCheck = await bcrypt.compare(pass, doc.userPass)
        if(passCheck) {

          console.log('abouta return')
          return[doc._id, true]

        } else {
          console.log('Email/Password falsche.')
        }
      } catch (error) {
        console.log('registriere sie sich bevor sie sichdich einloggen')
        console.log(error.message)
      }
    }
  })
}

module.exports.login = login;
 */
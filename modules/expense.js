const Expenses = require('../models/expenses.js');
const User = require('../models/user.js');

const expense = async function (id, amount, des, exp) {

  const Expense = new Expenses({

    userID: id,
    amount: amount,
    description: des,
    expense: exp
  });
  
  try {
    Expense.save();
    console.log('Registered new Expense')
  } catch (error) {
    cosnole.log(error.message)
  }
  

  let Namount = 0;

  
  await User.findById(id, async function(err, doc) {
    if (err) {
      console.log(err)
    } else {
      Namount = doc.userAccount;
      console.log("Vorherige: "+ doc.userAccount)
    }

    let update;
    if (exp == "Kosten") {
      update = {userAccount: (Namount-0) - (amount-0)};
    } else if (exp == "Einkommen") {
      update = {userAccount: (Namount-0) + (amount-0)};
    }
  
    await User.findByIdAndUpdate(id, update, {
      new: true
    });

    //Nicht nötig-----------------
    await User.findById(id, async function(err, doc) {
      if(err){
        console.log(err)
      } else {
        console.log(doc.userAccount)
      }
    }).clone()
    //Nicht nötig------------------

  }).clone()
}

module.exports.expense = expense;
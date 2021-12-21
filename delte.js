const mongoose = require ('mongoose');
const Expenses = require ('./models/expenses.js');

const connectionString = 'mongodb+srv://user:secret.password@node.ixftk.mongodb.net/Database?retryWrites=true&w=majority'
mongoose.connect(connectionString);

Expenses.deleteMany({}, function (err) {
  console.log(err)
  }
);

//Lösche alle expenses
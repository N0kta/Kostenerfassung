const Expenses = require ('../models/expenses.js');
const mongoose = require ('mongoose')

const connectionString = 'mongodb+srv://user:secret.password@node.ixftk.mongodb.net/Database?retryWrites=true&w=majority'
mongoose.connect(connectionString);


const queryAllUsers = () => {
  //Where User is you mongoose user model
  Expenses.find({} , (err, ex) => {
      if(err) {
        console.log('na ja')
      } else {//do something...
        ex.map(exp => {
            console.log(exp)
        })
    }
  })
}

queryAllUsers();





/*async function findall() {
  for await (const doc of User.find([{ $sort: { userName: '123' } }])) {
    console.log(doc.name + "hic bisey yok");
  }
}

findall(); */
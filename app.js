const register = require('./modules/register');
/* const login = require('./modules/login'); */
const expense = require('./modules/expense');
const http = require('http');
const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require ('./models/user.js');
const Expenses = require ('./models/expenses.js');
const bcrypt = require('bcrypt');


const connectionString = 'mongodb+srv://user:secret.password@node.ixftk.mongodb.net/Database?retryWrites=true&w=majority'
mongoose.connect(connectionString);

app.use(express.static("client"));
app.use(bodyParser.json());
var sess = {
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: false,
  cookie:{}
}
app.use(session(sess))

app.set('views', './client/ejs');
app.set('view engine', 'ejs');

const server = http.createServer(app);
server.listen(3000);

app.get("/" , function(req, res) {
  res.render("index.ejs");
})

app.get("/register", function(req, res) {
  res.render("register.ejs");
})

app.get("/login", function(req, res) {
  res.render("login.ejs");
})

app.get("/logout", function(req, res) {
  sess.log = false;
})

app.get("/main" , function(req, res) {
  try {
    if(sess.log) {
      console.log('Go ahead')
      res.render('main.ejs')
    } else {
      console.log('NO')
      res.redirect('/')
    }
  } catch (error) {
    console.log(error)
  }
})

app.get("/stand", async function(req,res) {
  await User.findById(sess.userID, async function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      res.send(doc.userAccount + '');
    }
  }).clone()
})

app.get("/list", async function(req,res) {
  await Expenses.find({userID: sess.userID}, async function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      res.send(doc.toString());
    }
  }).clone()
})

app.post("/api/register", async function(req, res) {
  console.log(req.body);
  const name = req.body.name,
        email = req.body.email,
        pass = req.body.password,
        account = req.body.account
  try {
    await register.register(name, pass, email, account)
  } catch (error) {
    if(error.code === 11000) {
      console.log('User account already taken.')
    }
  }
})

app.post("/api/action", async function(req, res) {
  console.log(req.body);
  console.log(sess.userID)
  const amount = req.body.amount,
        desc = req.body.desc,
        type = req.body.type
  try {
    res.send(await expense.expense(sess.userID ,amount, desc, type));
  } catch (error) {
    if(error) {
      console.log(error.message)
    }
  }
})

app.post("/api/login", async function(req, res) {
  console.log(req.body);
  const email = req.body.email
  const pass = req.body.password

  if (sess.log != true) {
    sess.log = false;
  }

  User.findOne({userEmail: email}, async function (err, doc) {
    if(err){
      console.log('Versuchen sie es nochmal')
      console.log(err.message);
    } else {
      try {
        const passCheck = await bcrypt.compare(pass, doc.userPass)
        if(passCheck) {
          if (mongoose.isValidObjectId(doc._id)) {
            console.log("valid id")
            sess.userID = doc._id;
          }
          sess.log = true;
          res.send(sess);

        } else {
          console.log('Email/Password falsche.')
        }
      } catch (error) {
        console.log('registriere sie sich bevor sie sichdich einloggen')
        console.log(error.message)
      }
    }
  })
})
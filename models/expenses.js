const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    userID: {
        type: mongoose.ObjectId,
        required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    expense: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Expenses = mongoose.model('expense', ExpenseSchema);

module.exports = Expenses;
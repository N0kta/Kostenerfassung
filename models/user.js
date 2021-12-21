const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userPass: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userAccount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        const hashed = await bcrypt.hash(this.userPass, 10)
        console.log('saved user with hashed password.')
        this.userPass = hashed
        next();
    } catch {
        next(error)
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
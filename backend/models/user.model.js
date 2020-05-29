const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: { type: String, required: true }
},
{
    timestamps: true
});

userSchema.methods = {
    checkPassword: function (inputPassword) {
        if(inputPassword == this.password){
            return true;
        } 
        else{
            return false;
        }
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
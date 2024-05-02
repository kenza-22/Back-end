var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');

var UserSchema = new Schema({
    Firstname: {
        type: String,
        required: [true, 'Please enter your firstname.']
    },
    Lastname: {
        type: String,
        required: [true, 'Please enter your lastname.']
    },
    Title: {
        type: String,
        required: [true, 'Please enter your title.']
    },
    Email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email.']
    },
    Role:{
       type: String,
        enum: ['user', 'admin'],
      default: 'user'
  },
  Password: {
        type: String,
        minlength: 8,
        required: [true, 'Please enter a password.'],
       
    },

});


module.exports = mongoose.model ('user', UserSchema);
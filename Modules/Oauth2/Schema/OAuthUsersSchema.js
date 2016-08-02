var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        default: ''
    }
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        default: ''
    },
    clientId: {
        type: String
    },
    clientSecret: {
        type: String
    },
    accessTokens: [{
        token: String,
        expires: Date
    }],
    refreshTokens: [{
        token: String,
        expires: Date
    }]
}, {
    collection: 'users'
});
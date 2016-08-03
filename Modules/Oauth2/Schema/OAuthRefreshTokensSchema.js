var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    refreshTokens: [{
        token: String,
        expires: Date
    }],
    clientId: {
        type: String
    },
    userId: {
        type: String
    }
}, {
    collection: 'users'
});
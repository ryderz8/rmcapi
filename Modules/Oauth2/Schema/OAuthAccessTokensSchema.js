var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
module.exports = new Schema({
    accessTokens: [{
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
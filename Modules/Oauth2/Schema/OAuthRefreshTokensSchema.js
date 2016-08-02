var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    refreshToken: {
        type: String
    },
    clientId: {
        type: String
    },
    userId: {
        type: String
    },
    expires: {
        type: Date
    }
});
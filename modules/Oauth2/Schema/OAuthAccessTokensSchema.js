var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
module.exports = new Schema({
    accessToken: {
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
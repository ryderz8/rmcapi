var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    clientId: {
        type: String
    },
    clientSecret: {
        type: String
    },
    redirectUri: {
        type: String
    }
});
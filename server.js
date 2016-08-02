CONFIG = require('./config.js');
var async = require('async');
var initiateCalls = require('./initiateCalls.js')
SERVER = {};
async.waterfall([function(callback) {
    initiateCalls.initiateDB(callback);
}, function(callback) {
    initiateCalls.initiateServer(callback);
}], function(error, data) {
    if (error) {
        console.log('some error occured');
    }
});
CONFIG = require('./Config.js');
var async = require('async');
var initiateCalls = require('./InitiateCalls.js')
SERVER = {};
async.waterfall([function(callback) {
    initiateCalls.initiateDB(callback);
}, function(callback) {
    initiateCalls.initiateServer(callback);
}, function(callback) {
    initiateCalls.initiateListen(callback);
}], function(error, data) {
    if (error) {
        console.log('some error occured');
    }
});
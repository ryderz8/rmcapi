/**
 *@file
 *@copyright raremediacompany
 *@desc
 *This file is the entry point for the system. It defines the
 *Server we are running. It runs an async utility(waterfall)
 *and initializes server in the following order 
 * <pre>
 * 	1) Initiate the db that is going to be used.
 *	2) Initiate the server
 *	3) Initiate the routes on the server
 *	4) Start listening the server
 * </pre>
 *@since 0.0.1
 *@requires async
 *@requires module:./Config.js
 *@requires module:./InitiateCalls.js
 *@author Shashank Kapoor shashank.kapoor@raremediacompany.in
 */
/** 
 * @constant
 * @global
 */
CONFIG = require('./Config.js');
var async = require('async');
var initiateCalls = require('./InitiateCalls.js');
/**
 * This variable is representing the server running
 * @global 
 */
SERVER = {};
async.waterfall([function(callback) {
    initiateCalls.initiateDB(callback);
}, function(callback) {
    initiateCalls.initiateServer(callback);
}, function(callback) {
    initiateCalls.initiateRoutes(callback);
}, function(callback) {
    initiateCalls.initiateListen(callback);
}], function(error, data) {
    if (error) {
        console.log('some error occured');
    }
});
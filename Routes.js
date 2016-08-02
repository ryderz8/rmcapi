/*
 * All the routes that need to be connected will be found here
 */
module.exports.initiateOuth = function(callback) {
    var Oauth2 = require('./Modules/Oauth2/Controller/Oauth2Controller.js');
    Oauth2.applyapplyRoutes(SERVER);
    callback();
}
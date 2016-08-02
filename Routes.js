/*
 * All the routes that need to be connected will be found here
 */
module.exports.initiateRoutes = function(callback) {
    var Oauth2 = require('./Modules/Oauth2/Controller/Oauth2Controller.js');
    Oauth2.applyRoutes(SERVER);
    SERVER.oauth = Oauth2.oauth;
    SERVER.get('/', SERVER.oauth.authorise(), function(req, res, next) {
        res.send('Secret area');
        next();
    });
    callback();
}
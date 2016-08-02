Model = module.exports;
var Oauth2Lib = require('../Lib/Oauth2Lib.js');
var winston = require('winston');
Model.getAccessToken = function(bearerToken, callback) {
    winston.log('info', 'GET-BEARER-TOKEN', {
        bearerToken: bearerToken
    });
    Oauth2Lib.getOauthAccessTokenModel().findOne({
        accessToken: bearerToken
    }, callback);
}
Model.getClient = function(clientId, clientSecret, callback) {
    winston.log('info', 'GET-CLIENT', {
        clientId: clientId,
        clientSecret: clientSecret
    });
    Oauth2Lib.getOAuthClientsModel().findOne({
        clientId: clientId,
        clientSecret: clientSecret
    }, callback);
}
Model.grantTypeAllowed = function(clientId, grantType, callback) {
    var authorizedClientIds = ['s6BhdRkqt3', 'toto', 'thom'];
    winston.log('info', 'GRANT-TYPE', {
        clientId: clientId,
        grantType: grantType
    });
    if (grantType === 'password') {
        return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
    }
    callback(false, true);
}
Model.saveAccessToken = function(token, clientId, expires, userId, callback) {
    winston.log('info', 'SAVE-ACCESS-TOKEN', {
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });
    new(Oauth2Lib.getOauthAccessTokenModel())({
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    }).save(callback);
};
Model.getUser = function(username, password, callback) {
    winston.log('info', 'GET-USER', {
        username: username,
        password: password
    });
    Oauth2Lib.getOAuthUsersModel().findOne({
        username: username,
        password: password
    }, callback)
}
Model.saveRefreshToken = function(token, clientId, expires, userId, callback) {
    winston.log('info', 'SAVE-REFRESH-TOKEN', {
        token: token,
        clientId: clientId,
        expires: expires,
        userId: userId
    });
    var OAuthRefreshTokensModel = Oauth2Lib.getOAuthRefreshTokensModel();
    var refreshToken = new OAuthRefreshTokensModel({
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });
    refreshToken.save(callback);
}
Model.getRefreshToken = function(refreshToken, callback) {
    winston.log('info', 'GET-REFRESH-TOKEN', {
        refreshToken: refreshToken
    });
    Oauth2Lib.getOAuthRefreshTokensModel().findOne({
        refreshToken: refreshToken
    }, callback)
}
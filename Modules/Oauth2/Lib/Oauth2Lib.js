var mongoose = require('mongoose');
var getOauthAccessTokenModel = function() {
    var OAuthAccessTokensSchema = require('../Schema/OAuthAccessTokensSchema.js');
    OAuthAccessTokensSchema.virtual('expires').get(function() {
        return this.accessTokenExpires
    });
    var model = mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
    return model;
}
var getOAuthRefreshTokensModel = function() {
    var OAuthRefreshTokensSchema = require('../Schema/OAuthRefreshTokensSchema');
    OAuthRefreshTokensSchema.virtual('expires').get(function() {
        return this.refreshTokenExpires
    });
    var model = mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
    return model;
}
var getOAuthClientsModel = function() {
    var OAuthClientsSchema = require('../Schema/OAuthClientsSchema');
    var model = mongoose.model('OAuthClients', OAuthClientsSchema);
    return model;
}
var getOAuthUsersModel = function() {
    var OAuthUsersSchema = require('../Schema/OAuthUsersSchema');
    var model = mongoose.model('OAuthUsers', OAuthUsersSchema);
    return model;
}
module.exports = {
    getOauthAccessTokenModel: getOauthAccessTokenModel,
    getOAuthRefreshTokensModel: getOAuthRefreshTokensModel,
    getOAuthClientsModel: getOAuthClientsModel,
    getOAuthUsersModel: getOAuthUsersModel
}
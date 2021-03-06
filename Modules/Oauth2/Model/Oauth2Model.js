var Model = module.exports;
var Oauth2Lib = require('../Lib/Oauth2Lib.js');
var winston = require('winston');
var jwt = require('jsonwebtoken');
var fs = require("fs");
var path = require("path");
Model.getAccessToken = function(bearerToken, callback) {
    var cert = fs.readFileSync(path.join(__dirname, '../', 'Files/JWTcert.pem'));
    jwt.verify(bearerToken, cert, function(err, decoded) {
        console.log(err);
        console.log(decoded) // bar
    });
    winston.log('info', 'GET-BEARER-TOKEN', {
        bearerToken: bearerToken
    });
    OAuthAccessTokensModel = Oauth2Lib.getOauthAccessTokenModel();
    OAuthAccessTokensModel.aggregate([{
        $match: {
            accessTokens: {
                $elemMatch: {
                    "token": bearerToken
                }
            }
        }
    }, {
        $unwind: '$accessTokens'
    }, {
        $match: {
            "accessTokens.token": bearerToken
        }
    }, {
        $project: {
            clientId: '$clientId',
            userId: '$userId',
            accessToken: '$accessTokens.token',
            expires: '$accessTokens.expires'
        }
    }], function(error, documents) {
        if (error) {
            callback(error, false);
        } else {
            console.log(documents);
            callback(false, documents[0]);
        }
    });
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
        expires: expires
    });
    var OAuthAccessTokensModel = Oauth2Lib.getOauthAccessTokenModel();
    OAuthAccessTokensModel.findOneAndUpdate({
        clientId: clientId
    }, {
        $push: {
            accessTokens: {
                token: token,
                expires: expires
            }
        }
    }, {
        new: true
    }, function(error, documents) {
        if (error) {
            callback(error);
        } else {
            callback(false);
        }
    })
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
        expires: expires
    });
    var OAuthRefreshTokensModel = Oauth2Lib.getOAuthRefreshTokensModel();
    OAuthRefreshTokensModel.findOneAndUpdate({
        clientId: clientId
    }, {
        $push: {
            refreshTokens: {
                token: token,
                expires: expires
            }
        }
    }, {
        new: true
    }, function(error, documents) {
        if (error) {
            callback(error);
        } else {
            callback(false);
        }
    })
}
Model.generateToken = function(type, req, callback) {
    var key = fs.readFileSync(path.join(__dirname, '../', 'Files/JWTkey.pem'));
    var token = jwt.sign({
        dummy: 'data'
    }, key, {
        algorithm: 'RS256'
    });
    callback(false, token);
}
Model.getRefreshToken = function(refreshToken, callback) {
    winston.log('info', 'GET-REFRESH-TOKEN', {
        refreshToken: refreshToken
    });
    OAuthRefreshTokensModel = Oauth2Lib.getOAuthRefreshTokensModel();
    OAuthRefreshTokensModel.aggregate([{
        $match: {
            refreshTokens: {
                $elemMatch: {
                    "token": refreshToken
                }
            }
        }
    }, {
        $unwind: '$refreshTokens'
    }, {
        $match: {
            "refreshTokens.token": refreshToken
        }
    }, {
        $project: {
            clientId: '$clientId',
            userId: '$clientId',
            refreshToken: '$refreshTokens.token',
            expires: '$refreshTokens.expires'
        }
    }], function(error, documents) {
        if (error) {
            callback(error, false);
        } else {
            console.log(documents);
            callback(false, documents[0]);
        }
    });
}
var router = new(require('restify-router').Router)();
var oauthServer = require('oauth2-server-restify');
router.oauth = oauthServer({
    model: require('../Model/Oauth2Model.js'),
    grants: ['password', 'refresh_token', 'authorization_code', 'client_credentials'],
    debug: true,
    accessTokenLifetime: 43200,
    refreshTokenLifetime: 1209600,
    passthroughErrors: true
});
router.post('/Oauth2/Token', router.oauth.grant());
module.exports = router;
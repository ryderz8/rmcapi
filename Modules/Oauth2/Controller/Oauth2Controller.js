var router = new(require('restify-router').Router)();
var oauthServer = require('oauth2-server-restify');
router.oauth = oauthServer({
    model: require('../Model/Oauth2Model.js'),
    grants: ['password'],
    debug: true
});
router.post('/Oauth2/Token', router.oauth.grant());
module.exports = router;
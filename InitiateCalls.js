var winston = require('winston');
module.exports.initiateDB = function(callback) {
    var mongoose = require('mongoose');
    var uristring = process.env.TEST ? (CONFIG.dbconfig.testUrl + '/' + CONFIG.dbconfig.testDatabase) : '';
    mongoose.Promise = global.Promise;
    mongoose.connect(uristring, function(error, response) {
        if (error) {
            winston.error(error);
            callback(error);
        } else {
            winston.log('info', 'MONGO-CONNECT', {
                uristring: uristring,
                timeStamp: new Date().getTime()
            });
            callback(false);
        }
    });
}
module.exports.initiateServer = function(callback) {
    var restify = require('restify');
    var bunyan = new require('bunyan');
    var bodyParser = require('body-parser');
    SERVER = restify.createServer({
        log: bunyan.createLogger({
            name: "myapp",
            serializers: {
                req: bunyan.stdSerializers.req
            }
        }),
        name: 'RMC - API',
        formatters: require('./ErrorHandler.js'),
        version: process.env['npm_package_version']
    });
    SERVER.use(restify.authorizationParser());
    SERVER.use(bodyParser.urlencoded({
        extended: true
    }));
    SERVER.use(restify.dateParser());
    SERVER.use(restify.queryParser());
    SERVER.use(restify.gzipResponse());
    SERVER.pre(function(request, response, next) {
        request.log.info({
            req: request
        }, 'REQUEST');
        next();
    });
    callback(false);
}
module.exports.initiateRoutes = function(callback) {
    require("./Routes.js").initiateRoutes(callback);
}
module.exports.initiateErrorHandler = function(callback) {
    require('./ErrorHandler').initiateErrorHandler(callback);
}
module.exports.initiateListen = function(callback) {
    SERVER.listen(process.env.PORT || CONFIG.test.PORT, function() {
        winston.log('info', 'SERVER-LISTEN', {
            port: process.env.PORT || CONFIG.test.PORT,
            timeStamp: new Date().getTime()
        })
    });
}
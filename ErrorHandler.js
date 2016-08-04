module.exports = {
    'application/json': function(request, response, body, callback) {
        if (body instanceof Error) {
            callback(null, JSON.stringify({
                message: body.message,
                code: body.body.code,
                statusCode: body.statusCode
            }));
        } else {
            callback(null, JSON.stringify(body));
        }
    }
}
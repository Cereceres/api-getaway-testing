const LambdaTest = require('aws-lambda-testing');
const execLambda = new LambdaTest();
module.exports = (handler) => (req, res) => {
    const params = {
        queryStringParameters: req.query,
        pathParameters: req.params,
        headers: req.headers,
        body: req.body,
        httpMethod: req.method,
        path: req.path,
        requestContext:{},
        stageVariables:{}
    };
    execLambda
        .setHandler(handler)
        .exec(params)
        .then(({ body = '', headers = {}, statusCode = 200 }) => {
            res.set(headers);
            res.status(statusCode);
            res.send(body);
        })
        .catch(({ stack, message = stack, body = message, headers = {}, statusCode = 500 }) => {
            res.headers(headers);
            res.status(statusCode);
            res.send(body);
        });
};

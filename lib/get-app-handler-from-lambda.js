const LambdaTest = require('aws-lambda-testing');
const execLambda = new LambdaTest();
module.exports = (handler) => (req, res) => {
    console.log('req.originalUrl ', req.originalUrl);
    console.log('req.path ', req.path);
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
            console.log('body ', body);
            console.log('headers ', headers);
            res.set(headers);
            const response = typeof body === 'string' ? body : JSON.stringify(body);
            console.log('response ', response);
            res.status(statusCode);
            res.send(body);
        })
        .catch(({ message = '', body = message, headers = {}, stack, statusCode = 500 }) => {
            console.log('message ', message);
            console.log('stack ', stack);
            for (const header in headers) {
                if (headers.hasOwnProperty(header)) {
                    res.header(header, headers[header]);
                }
            }
            res.status(statusCode);
            res.send(typeof body === 'string' ? body : JSON.stringify(body));
        });
};

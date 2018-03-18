# api-getaway-testing
api-getaway testing server
 
# Usage
 
```js
const assert = require('assert');

const supertest = require('supertest');

const apiGetway = require('api-getaway-testing');

const api = apiGetway({
    '/test':(event, ctx, cb) => {
        assert(event.queryStringParameters);
        assert(event.pathParameters);
        assert(event.headers);
        assert(event.body.test === 'test');
        assert(event.httpMethod);
        assert(event.path);
        assert(event.requestContext);
        assert(event.stageVariables);

        cb(null, {
            statusCode:202,
            body:'response',
            headers:{
                'Content-Type':'application/text'
            }
        });
    },

    '/test/other/:params':{
        post: (event, ctx, cb) => {
            assert(event.queryStringParameters.query === 'query');
            assert(event.pathParameters.params === 'params');
            assert(event.headers);
            assert(event.body.data === 'data');
            assert(event.httpMethod === 'POST');
            assert(event.path === '/test/other/params');
            assert(event.requestContext);
            assert(event.stageVariables);

            cb(null, {
                statusCode:201,
                body: { response:'response' },
                headers:{
                    'Content-Type':'application/json'
                }
            });
        }
    }
}, 4000);

const agent = supertest(api);


const res = await agent.get('/test')
    .send({test:'test'})
    .expect(202);
assert(res.text === 'response');


const res = await agent.post('/test/other/params')
    .query({ query:'query' })
    .send({ data:'data' })
    .expect(201);
assert.deepEqual(res.body, { response :'response' });
assert(res.headers['content-type'] === 'application/json; charset=utf-8');
```

# API getApiGetawayTesting(object, port = 3000, app = express()) -> appServer


Receive a object what is a map between path and lambda handler:

    {
        path: handler
    }

or 

    {
        path: {
            method: handler,
            otherMethod: otherHandler
        }
    }

You can pass a express instance with all middleware already attached.

The only middleware attached by getApiGetawayTesting is body-parser.

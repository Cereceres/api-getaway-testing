const assert = require('assert');

const supertest = require('supertest');

const apiGetway = require('../index');

const api = apiGetway({
    '/test':(event, ctx, cb) => {
        assert(event.queryStringParameters);
        assert(event.pathParameters);
        assert(event.headers);
        assert(event.body);
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

describe('test to api getaway', () => {
    it('should return headers, body and statusCode', async() => {
        const res = await agent.get('/test')
            .send('testing')
            .expect(202);
        assert(res.text === 'response');
    });

    it('should return headers, body and statusCode', async() => {
        const res = await agent.get('/test')
            .send('testing')
            .expect(202);
        assert(res.text === 'response');
        assert(res.headers['content-type'] === 'application/text; charset=utf-8');
    });

    it('should return headers, body and statusCode', async() => {
        const res = await agent.post('/test/other/params')
            .query({ query:'query' })
            .send({ data:'data' })
            .expect(201);
        assert.deepEqual(res.body, { response :'response' });
        assert(res.headers['content-type'] === 'application/json; charset=utf-8');
    });
});

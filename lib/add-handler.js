const getHandlerFromLambda = require('./get-app-handler-from-lambda');
const express = require('express');

module.exports = (app, pathToLambdaHadlerMap) => {
    for (const path in pathToLambdaHadlerMap) {
        if (pathToLambdaHadlerMap.hasOwnProperty(path)) {
            let handler = pathToLambdaHadlerMap[path];

            if (typeof handler !== 'function' && handler) {
                for (const method in handler) {
                    if (handler.hasOwnProperty(method)) {
                        handler = handler[method];
                        const router = express.Router();
                        if (typeof handler !== 'function') continue;
                        if (router[method]) router[method](path, getHandlerFromLambda(handler));
                        app.use('/', router);
                    }
                }
                continue;
            }

            const router = express.Router();
            router.all(path, getHandlerFromLambda(handler));
            app.use('/', router);
        }
    }
};

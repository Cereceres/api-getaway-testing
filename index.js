const express = require('express');
const bodyParser = require('body-parser');
const addHandler = require('./lib/add-handler');

module.exports = (pathToLambdaHadlerMap = {}, port = 3000, app = express()) => {
    app.use(bodyParser());
    addHandler(app, pathToLambdaHadlerMap);
    app.listen(port, () => console.log('Server started on port ', port));

    return app;
};

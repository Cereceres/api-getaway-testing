const express = require('express');
const bodyParser = require('body-parser');
const addHandler = require('./lib/add-handler');
const morgan = require('morgan')
 module.exports = (pathToLambdaH adlerMap = {}, port = 3000, app = express()) => {
    app.use(morgan('tiny'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    addHandler(app, pathToLambdaHadlerMap);
    app.listen(port, () => console.log('Server started on port ', port));

    return app;
};

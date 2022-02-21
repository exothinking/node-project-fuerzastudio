const express = require('express');

// app definition
const app = express();
const bodyParser = require('body-parser');
const port  = 3000;
const {appUrl} = require('./helpers/utils');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
const indexRouter = require('./routes/api/index');
const postsRouter = require('./routes/api/posts');
// index routes
app.use('/', indexRouter);
app.use(appUrl, indexRouter);
// posts routes
app.use(appUrl, postsRouter);

// init
app.listen(port);
console.log('server online');

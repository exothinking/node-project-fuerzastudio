const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.json({message: 'Wellcome'}));

module.exports = indexRouter;
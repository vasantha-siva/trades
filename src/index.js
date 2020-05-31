const express = require('express');
const constant = require('./utils/constant');
const bodyParser = require('body-parser');
const cors = require('cors');
//Setting Server
const app = express();
const http = require('http');
const db = require('./db.js');
const router = express.Router();

//swagger integration
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);

app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(cors());


//Routes to Controller
app.use('/auth', require('./controller/auth-controller'));
app.use('/users', require('./controller/user-controller'));
app.use('/trades', require('./controller/trade-controller'));
app.use('/stocks', require('./controller/stock-controller'));



process.on('uncaughtException', function(err) {
    console.log('Fatal Error', err);
    console.log('Caught exception:', err.stack);
});

app.listen(constant.PORT, () => {
    console.log(`Listening to the port ${constant.PORT}`);
})
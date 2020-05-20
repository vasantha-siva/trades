const mongoose = require('mongoose');
const express = require('express');
const constant = require('./utils/constant');
const bodyParser = require('body-parser');
const cors = require('cors');
//Setting Server
const app = express();
const http = require('http');

//Connecting mongodb
mongoose.connect(constant.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log('MongoDB connection error', error);
    } else {
        console.log(`MongoDB connected successfully.`);
    }
});

app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(cors());


//Routes to Controller
app.use('/auth', require('./controller/auth-controller'));
app.use('/users', require('./controller/user-controller'));
app.use('/trades', require('./controller/trade-controller'));
app.use('/stocks', require('./controller/trade-controller'));



process.on('uncaughtException', function(err) {
    console.log('Fatal Error', err);
    console.log('Caught exception:', err.stack);
});

app.listen(constant.PORT, () => {
    console.log(`Listening to the port ${constant.PORT}`);
})
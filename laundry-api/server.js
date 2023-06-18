require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./app/models');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static("app/public")); // folder public dalam folder app akan di define sebagai file static

//Set app config
const port = process.env.PORT;

// code ini merupakan bahasa native dari module CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // '*' disini artinya semua domain bisa mengakses API ini
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

require('./app/router/router.js')(app);

app.listen(port, () => console.log("server run on " + port))
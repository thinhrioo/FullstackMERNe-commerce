//khai bao thu vien
const express = require('express');
const mogan = require('morgan');
const bodyParser = require('body-parser');
const httpErrors = require('http-errors');
require('dotenv').config();
const Db = require('./model');

//khoi taoj web server bang express
const app = express();

//khoi tao middleware de kiem soat cac request
app.use(mogan('dev'));
app.use(bodyParser.json());

app.get('/', async(req, res, next) => {
    res.status(200).json({"message": "Welcome to RESTFul APi Server"});
});

// thêm middleware kiểm soát lỗi trên : request và responses

// kiểm soát lỗi bất kỳ 4x 5x
app.use(async (err, req, res, next) => {
    // lay staus cod thực tế gặp phải
    res.status(err.status || 500);
    res.send({error: {"status": err.status, "message": err.message}});
})
// app.use('/customer', customerRoute);


const HOST = process.env.HOST_NAME || 'localhost';
const PORT = process.env.PORT || 9999;
app.listen(PORT, HOST, async() => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
    await Db.connect();
});

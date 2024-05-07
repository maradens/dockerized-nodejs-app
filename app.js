const express = require('express');
const mongoose = require('mongoose');

const app = express();

//middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://mymongodb:27017/RestAPI').then(() => {
    console.log('Mongodb connected ...');
});

/*
app.all('/test', (req,res) => {
    console.log(req.query);
    console.log(req.query.name);
    res.send(req.query);
});
*/

/*
app.all('/test/:id/:name/:price', (req,res) => {
    console.log(req.params);
    res.send(req.params);
});
*/

app.all('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

const ProductRoute = require('./Routes/Product.route.js');
app.use('/products', ProductRoute);

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

//Error handler 404
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(3000, () => {
    console.log('Server started and listening on port 3000 ...');
});

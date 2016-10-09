'use strict';

var express = require('express');
var app = express();
var routers = require('./routes');

var jsonParser = require("body-parser").json;
var logger = require("morgan");

app.use(logger("dev"));
app.use(jsonParser());

var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;

db.on('error', function(err){
    console.error("db connection error: ", err);
});

db.once("open", function(){
    console.log("db connection on");
    // all db comunications here
});

app.use('/questions', routers);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Erroe handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message 
    });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Express listening port", port);
});
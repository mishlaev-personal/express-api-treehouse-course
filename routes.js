'use strict';

var express = require('express');
var router = express.Router();

//GET /questions
//collect all questions
router.get("/", function(req, res){
    res.json({
        response: "This is GET request"
    });
});

//POST /questions
// create new questions
router.post("/", function(req, res){
    res.json({
        response: "This is POST request",
        body: req.body
    });
});

//GET /questions/"id"
//collect specific question
router.get("/:id", function(req, res){
    res.json({
        response: "This is GET request for ID " + req.params.id
    });
});

module.exports = router;
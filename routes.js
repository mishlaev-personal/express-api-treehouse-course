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

//GET /questions/qID"
//collect specific question
router.get("/:qID", function(req, res){
    res.json({
        response: "This is GET request for qID " + req.params.qID
    });
});


//POST /questions/:qID/answers
// create a new answers
router.post("/:qID/answers", function(req, res){
    res.json({
        response: "This is POST  to /answers",
        questionId: req.params.qID,
        body: req.body
    });
});

//PUT /questions/:id/answers/:aID
// edit a new answers
router.post("/:qID/answers/:aID", function(req, res){
    res.json({
        response: "This is PUT  to /answers",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
});

//DELETE /questions/:id/answers/:aID
// Delete a specifit answers
router.delete("/:qID/answers/:aID", function(req, res){
    res.json({
        response: "This is DELETE /answer",
        questionId: req.params.qID,
        answerId: req.params.aID
    });
});

//POST /questions/:id/answers/:aID/vote-up
//POST /questions/:id/answers/:aID/vote-down
// Vote on a specifit answers
router.post("/:qID/answers/:aID/vote-:dir", function(req, res, next){
    if(req.params.dir.search(/^(up|down)$/) === -1) {
        var err = new Error("Not fount vote");
        err.status = 404;
        next(err);
    } else {
        next();
    }
},  function(req, res){
    res.json({
        response: "This is POST /answer to /vote-" +req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});

module.exports = router;
// Create web server
// -----------------

// Import modules
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Import models
var Comments = require('../models/comments');

// Configure router
router.use(bodyParser.json());

// Define routes
router.route('/')
    // Get all comments
    .get(function(req, res, next) {
        Comments.find({}, function(err, comments) {
            if (err) throw err;
            res.json(comments);
        });
    })
    // Post a new comment
    .post(function(req, res, next) {
        Comments.create(req.body, function(err, comment) {
            if (err) throw err;
            console.log('Comment created!');
            var id = comment._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the comment with id: ' + id);
        });
    })
    // Delete all comments
    .delete(function(req, res, next) {
        Comments.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

router.route('/:commentId')
    // Get a comment by id
    .get(function(req, res, next) {
        Comments.findById(req.params.commentId, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })
    // Update a comment by id
    .put(function(req, res, next) {
        Comments.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, {
            new: true
        }, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })
    // Delete a comment by id
    .delete(function(req, res, next) {
        Comments.findByIdAndRemove(req.params.commentId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

// Export router
module.exports = router;
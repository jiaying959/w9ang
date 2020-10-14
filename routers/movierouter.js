var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    //task 8
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },


    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },

    //task 1
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },
    //task 4
    deleteFromActorList: function (req,res){
        Actor.findOne({_id:req.params.actorId},function(err,actor){
                if (!actor) return res.status(404).json(err+"no actor");
                if(err)return res.status(400).json(err);
                Movie.findOne({_id:req.params.movieId},function(err,movie){
                    if (!movie) return res.status(404).json(err+"no movie");
                    if(err)return res.status(400).json(err);
                    movie.actors.remove(actor._id);
                    movie.save(function(err){
                        if(err)return res.status(500).json(err);
                        res.json(movie);
                    })
            })

        })
    },

    //task 5
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    },

    //task 6 
    getBetweenYears: function(req,res){
        Movie.where('year').gt(req.params.year2).lt(req.params.year1)
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    //task 9 
    deleteBetweenYears: function(req,res){
        Movie.deleteMany({year:{$gt:req.body.year2,$lt:req.body.year1}},function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json(err);
            res.json(movie);
        });
    },

    //week 9 lab task 3 
    deleteBeforeYear: function (req, res) {
        let year = req.params.year;
        
        Movie.deleteMany({year: {$lte: year}}, function(err, movie) {
            if (err) {
                return res.status(500).json(err);
            }
            if (!movie) {
                return res.status(404).json(err); 
            }
            res.json(movie);
        });
    },

    //task 4 
    addAnActortoMovie : function(req,res){
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.params.actorId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            })
        });
    }

};
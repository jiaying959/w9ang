const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    //task 7
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },

    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();

        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },

    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },


    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });
    },


    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },

    //task 2
    deleteOneAndMovies: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err,actor) {
            if (!actor) return res.status(404).json(err+"no actor");
            if(err)return res.status(400).json(err);
            res.json();
            let actorID = new mongoose.Types.ObjectId(req.params.id);
            Movie.deleteMany({actors:actorID},function(err,movie){
                if(err) return res.status(400).json(err);
                if(!movie) return res.status(404).json(err+"no movie");
                res.json(movie);
            })
        });
    },

    //task 3
    deleteFromMoiveList: function (req,res){
        Movie.findOne({_id:req.params.movieId},function(err,movie){
                if (!movie) return res.status(404).json(err+"no movie");
                if(err)return res.status(400).json(err);
                Actor.findOne({_id:req.params.actorId},function(err,actor){
                    if (!actor) return res.status(404).json(err+"no actor");
                    if(err)return res.status(400).json(err);
                    actor.movies.remove(movie._id);
                    actor.save(function(err){
                        if(err)return res.status(500).json(err);
                        res.json(actor);
                    })
            })

        })
    },
    //extra task
    deleteAllMovies: function(req,res){
        Actor.findOne({ _id: req.params.id }, function (err,actor) {
            if (!actor) return res.status(404).json(err+"no actor");
            if(err)return res.status(400).json(err);
            actor.movies.splice(0, actor.movies.length);
            actor.save(function(err){
                if(err)return res.status(500).json(err);
                res.json(actor);
            })
        });
    }
};
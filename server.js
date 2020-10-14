const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actorrouter');
const movies = require('./routers/movierouter');
const path = require('path');
const app = express();

app.listen(8081);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serve static asset 
app.use("/",express.static(path.join(__dirname,"dist/w9ang")));
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true},function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//lab tasks 2 delete actor and all its movies
app.delete('/actors/:id/deletemovies',actors.deleteOneAndMovies);
//task 3 
app.delete('/actors/:actorId/:movieId',actors.deleteFromMoiveList);
//extra task 
app.put('/actors/:id/deleteAllmovies',actors.deleteAllMovies);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//task 1 delete movie by id
app.delete('/movies/:id',movies.deleteOne);
//task 4 
app.delete('/movies/:movieId/:actorId',movies.deleteFromActorList);
//task 5 
app.post('/movies/:id/actors', movies.addActor);
//task 6 
app.get('/movies/:year1/:year2',movies.getBetweenYears);
//task 9
app.delete('/movies',movies.deleteBetweenYears);


//week 9 lab 
app.delete('/movies/delete/before/:year/',movies.deleteBeforeYear);

app.put('/movies/:movieId/actor/:actorId', movies.addAnActortoMovie);
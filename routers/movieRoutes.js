const express = require('express');
const { addMovie, getMovie, getMovieByTitle, updateMovieDetails, deleteMovieById, getRandomMoviesWithVerticalBanner } = require('../controllers/movieControllers');


const route = express.Router();


route.post('/add',addMovie);
route.get('/getMovie',getMovie);
route.get('/title/:title',getMovieByTitle);
route.put('/update/:id', updateMovieDetails);
route.delete('/delete/:id', deleteMovieById);
route.get('/getverticalbanner',getRandomMoviesWithVerticalBanner)

module.exports = route;  
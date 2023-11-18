const Movie = require("../models/MovieModel");

const getMovie = async (req ,res, next ) =>{
    try {
        const movies = await Movie.find();
        return res.status(200).json({ movies });
    } catch (err) {
        return res.status(404).json({ error: err });
    }
}


const getMovieByTitle = async (req, res, next) => {
    const { title } = req.params; 
    try {
        const movie = await Movie.findOne({ title: title });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ movie });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const updateMovieDetails = async (req, res, next) => {
    const { id } = req.params;
    const {updateData} = req.body;
    console.log(updateData)
    try {const options = { new: true, runValidators: true };

        const updatedMovie = await Movie.findByIdAndUpdate({_id:id}, updateData, options);

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ movie: updatedMovie });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};


const deleteMovieById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};



const addMovie = async (req ,res, next ) => {

    const {title,
        director,
        releaseYear,
        language,
        description,
        genre,
        actors,
        runtime,
        country,
        posterURL,
        verticalBanner
    } = req.body;

    const movie = new Movie({title,
        director,
        releaseYear,
        language,
        description,
        genre,
        actors,
        runtime,
        country,
        posterURL,
        verticalBanner
    })

    try{
        const response = await movie.save();
        return res.status(201).json({message:response})
    }catch(err){
        return res.status(404).json({error:err})
    }
}

const getRandomMoviesWithVerticalBanner = async (req, res, next) => {
    try {
      const movies = await Movie.aggregate([
        { $match: { verticalBanner: { $ne: null } } },
        { $sample: { size: 5 } },
        {
          $project: {
            _id: 0,
            title: 1,
            verticalBanner: 1,
          },
        },
      ]);
  
      res.status(200).json({ movies });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.addMovie = addMovie;
exports.getMovie = getMovie;
exports.getMovieByTitle =getMovieByTitle;
exports.updateMovieDetails = updateMovieDetails; 
exports.deleteMovieById = deleteMovieById;
exports.getRandomMoviesWithVerticalBanner = getRandomMoviesWithVerticalBanner;
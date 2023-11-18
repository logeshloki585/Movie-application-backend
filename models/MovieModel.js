const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default:0
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    actors: [
        {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
            }
        }
    ],
    runtime: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    posterURL: {
        type: String,
        // required: true
    },
    verticalBanner:{
        type: String,
    },
    
},{
    timestamps: true
});

module.exports = mongoose.model("Movie", MovieSchema);

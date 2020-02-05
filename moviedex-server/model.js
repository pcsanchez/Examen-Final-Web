let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */

const movieCollection = mongoose.Schema({
    id: {type: String},
    title: {type: String},
    year: {type: Number},
    rating: {type: Number}
});

const Movie = mongoose.model('movies', movieCollection);

const MovieController = {
    getAll: function() {
        return Movie.find()
            .then(movies => {
                return movies;
            })
            .catch(error => {
                throw Error(error);
            })
    },
    create: function(newMovie) {
        return Movie.create(newMovie)
            .then(nMovie => {
                return nMovie;
            })
            .catch(error => {
                throw Error(error);
            })
    }
}

module.exports = {MovieController};
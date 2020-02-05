let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let {MovieController} = require('./model');
let uuid = require('uuid');

let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

app.get('/api/moviedex', jsonParser, (req, res) => {
	return MovieController.getAll()
	.then(movies => {
		return res.status(200).json(movies);
	})
	.catch(error => {
		res.statusMessage = 'DB error';
		return res.status(500).send();
	})
})

app.post('/api/moviedex', jsonParser, (req, res) => {
	const {title, year, rating} = req.body;

	if(!title || !year || !rating) {
		res.statusMessage = 'No se enviaron los campos necesarios para agregar una pelicula nueva al servidor';
		return res.status(406).send();
	}

	const newMovie = {
		id: uuid.v4(),
		title: title,
		year: year,
		rating, rating
	}

	return MovieController.create(newMovie)
		.then(nMovie => {
			return res.status(201).json(nMovie);
		})
		.catch(error => {
			res.statusMessage = 'DB error';
			return res.status(500).send();
		})
})

let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}
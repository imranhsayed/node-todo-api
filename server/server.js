// Require express js and body-parser libraries.
let express = require( 'express' );
let bodyParser = require( 'body-parser' );
/**
 * We are using the ES6 destructuring down below to create a variable out of its property name and setting
 * it equal to the object that comes back frm require(). The value of mongoose will be equal to
 * to the property value of the object that comes back from require()
 * And requiring mongoose object from db/mongoose.js file. Similarly for Todo and User.
 */
let {mongoose} = require( './db/mongoose' );
let {Todo} = require( './models/todo' );
let {User} = require( './models/user' );
let {ObjectID} = require( 'mongodb' );

// Create a server using express js.
let app = express();

// If the process.env.PORT is there we will use that otherwise we will use port 3000
const port = process.env.PORT || 3000;

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.json() );

/**
 * Set up a post route for Create post request,
 * '/todos' is the url
 * body-parser module included above will convert the JSON data, convert it into an object and attach it to 'req' below
 */
app.post( '/todos', ( req, res ) => {
	/**
	 * body gets stored inside the req.body by bodyParser as an object
	 * And to get the text property value of this object, we use req.body.text
	 * Create a new instance of Todo model set the values of the properties(fields)
	 */
	let todo = new Todo({
		text: req.body.text
	});

	/**
	 * By calling a method save on the new instance 'todo' of Todo model, we save the this data into Todo collection.
	 * Because save() returns a promise, we can call a then() which will be execute after the data is saved.
	 */
	todo.save().then( ( result ) => {
		// res.send will send result if the data is inserted
		res.send( result );
	}, ( error ) => {
		// res.send will send error if the data is not inserted and there was an error with the status of 400(bad request)
		res.status(400).send( error );
	});
} );

/**
 * Set the get route to get all Todos
 *
 */
app.get( '/todos', ( req, res ) => {
	Todo.find().then( ( todos ) => {
		res.send( { todos } );
	}, ( error ) => {
		res.status( 400 ).send(error);
	} )
} );

/**
 * Set the get route with an ID.
 * :id will create an id variable which will be available on the req object in req.params.id
 */
app.get( '/todos/:id', ( req, res ) => {
	let id = req.params.id;
	if ( ! ObjectID.isValid( id ) ) {
		return res.status( 404 ).send();
	}
	Todo.findById( id ).then( ( todo ) => {
		if ( ! todo ) {
			return res.status( 404 ).send();
		}
		res.send( {todo} );
	}).catch( ( err ) => {
		res.status( 400 ).send();
	} )
});

app.listen( port, () => {
	console.log( `Started on port ${port}` );
} );
// Export the app so that its available to other file when they require this file.
module.exports = {app};

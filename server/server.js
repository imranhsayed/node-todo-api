// Require lodash, express js and body-parser libraries.
const _ = require( 'lodash' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
/**
 * We are using the ES6 destructuring down below to create a variable out of its property name and setting
 * it equal to the object that comes back frm require(). The value of mongoose will be equal to
 * to the property value of the object that comes back from require()
 * And requiring mongoose object from db/mongoose.js file. Similarly for Todo and User.
 */
const {mongoose} = require( './db/mongoose' );
const {Todo} = require( './models/todo' );
const {User} = require( './models/user' );
const {ObjectID} = require( 'mongodb' );

// Create a server using express js.
const app = express();

// If the process.env.PORT is there we will use that otherwise we will use port 3000
const port = process.env.PORT || 3000;

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.json() );

/**
 * CRUD: CREATE
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
 * CRUD: READ
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
 * CRUD: READ
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

/**
 * CRUD: DELETE
 * Set a route for deleting an document with its ID
 */
app.delete( '/todos/:id', ( req, res ) => {
	// Get the id from url using req.params.id
	let id = req.params.id;

	// If the id is invalid send the response as 404 and do not proceed
	if ( ! ObjectID.isValid( id ) ) {
	    return res.status( 404 ).send();
	}

	/**
	 * If the id was valid find the document by id and remove it
	 * doc will contain the document/item deleted.
	 * if document was not found send response as 404 , 200 otherwise.
	 */
	Todo.findByIdAndRemove( id ).then( ( doc ) => {
		if ( ! doc ) {
			return res.status( 404 ).send();
		} else {
			return res.status( 200 ).send();
		}
	} ).catch( ( e ) => {
		res.status( 400 ).send();
	} );
});

/**
 * CRUD: UPDATE
 * Set a route for updating an document with its ID
 */
app.patch( '/todos/:id', ( req, res ) => {

	// Get the id from url using req.params.id
	let id = req.params.id;

	// If the id is invalid send the response as 404 and do not proceed
	if ( ! ObjectID.isValid( id ) ) {
		return res.status( 404 ).send();
	}

	/**
	 * body will store all the request updates
	 * _.pick() is a lodash module function is used to pick up the properties that user want to update, if those property exist.
	 * _.pick() takes first parameter as req.body and second as an object containing the property names you want to update.
	 */
	let body = _.pick( req.body, [ 'text', 'completed' ] );

	/**
	 * If the entered value for completed is boolean, and if its true.
	 */
	if ( _.isBoolean( body.completed ) && body.completed ) {
		// getTime() returns unique timestamp
	    body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		// if you want to remove a value from the database you set it to null
		body.completedAt = null;
	}

	/**
	 * Update the document
	 * by setting $set equal to body we will update the database with the values inside of body var.
	 * setting new: true, will give us the new updated object in todo var
	 */
	Todo.findByIdAndUpdate( id, { $set: body }, { new: true } ).then( ( todo ) => {
		if ( ! todo ) {
		    return res.status( 404 ).send();
		}

		res.send( { todo } );
	} ).catch( ( e ) => {
		res.status( 400 ).send();
	} );
} );


/**
 * CRUD: CREATE
 * Set up a post route for Create users request,
 * '/users' is the url
 * body-parser module included above will convert the JSON data, convert it into an object and attach it to 'req' below
 */
app.post( '/users', ( req, res ) => {

	let body = _.pick( req.body, [ 'email', 'password' ] );
	/**
	 * Create a new instance of Todo model set the values of the properties(fields)
	 * body contains both email and password values, hence we are passing body as param when creating a new document.
	 */
	let user = new User( body );

	/**
	 * By calling a method save on the new instance 'todo' of Todo model, we save the this data into Todo collection.
	 * Because save() returns a promise, we can call a then() which will be execute after the data is saved.
	 */
	user.save().then( () => {

		return user.generateAuthToken();

	}, ).then( ( token ) => {

		/**
		 * res.header().send() will send the user data
		 * in header() param key is the header name and value is token value,
		 * when you prefix a header with x , you are creating a custom header.
		 */

		res.header( 'x-auth', token ).send( user );
	} ).catch( ( e ) => {
			// res.send will send error if the data is not inserted and there was an error with the status of 400(bad request)
			res.status(500).send( e );
	} );
} );


app.listen( port, () => {
	console.log( `Started on port ${port}` );
} );
// Export the app so that its available to other file when they require this file.
module.exports = {app};

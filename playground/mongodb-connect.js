// const MongoClient = require( 'mongodb' ).MongoClient;
/**
 * This will create a new variable called MongoClient ( which is actually one of the
 * properties of mongodb object library.
 * By wrapping the MongoClient property in curly braces and
 * setting it equal to the object itself ( require( 'mongodb' ) ),
 * we create a new variable MongoClient, whose value will be equal to the property value
 * of MongoClient in mongodb Object.
 * this code identical to the code above.
 * In the same way we are creating a variable for ObjectID method of mongodb object.
 *
 */
const {MongoClient, ObjectID } = require( 'mongodb' );

/**
 * Here 27017 is the port no, ToDoApp is the database name.
 * In live site 'localhost:27017' will be replaced by the site url.
 * err is the error and db is the database object.
 * We are using the return function so that the next set of code will not be
 * executed if the database connection fails.
 */
MongoClient.connect( 'mongodb://localhost:27017/ToDoApp', ( err, db ) => {
	if ( err ) {
		return console.log( 'unable to connect to MongoDB sever' );
	}
	
	console.log( 'connected to mongoDB server' );

	db.collection( 'Users' ).insertOne( {
		name: 'Amy',
		age: 24,
		location: 'London'
	}, ( err, result ) => {
		if ( err ) {
			return console.log( 'Unable to insert Users ', err );
		}
		/**
		 * On Successful insertion of the data.
		 * The ops attribute in result.ops will contain all the docs( row/record )  that were inserted.
		 * Also 'undefined' is for the second parameter filter function and '2' is the indentation.
		 */
		console.log( JSON.stringify( result.ops, undefined, 2 ) );

		/**
		 * Here result.ops contains the entire array of key value pairs of the record inserted.
		 * We get the first item in the array which is the id and call the getTimeStamp function on that.
		 * get the timestamp for the id, to know when the record was created.
		 */
		console.log( result.ops[0]._id.getTimestamp() );
	} );

	// Closes the mongoDB connection to the database server.
	db.close();
}, );
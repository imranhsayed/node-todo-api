// Include mongoose library
const mongoose = require( 'mongoose' );

// Set mongoose promise
mongoose.Promise = global.Promise;
/**
 * Connect to the database
 * Here mongodb is the protocol,
 * //localhost:27017 is site url at port 27017 and TodoApp is the database name.
 */
mongoose.connect( 'mongodb://localhost:27017/TodoApp' );



// Create a new instance of Todo model set the values of the properties(fields)
let user = new User({
	email: 'email@gmail.com'
});

user.save().then( ( result ) => {
	console.log( JSON.stringify( result, undefined, 1 ) );
}, ( error ) => {
	console.log( 'Cound not save the data.', error );
});



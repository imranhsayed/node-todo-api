/**
 * We are using the ES6 destructuring down below to create a variable out of its property name and setting
 * it equal to the object that comes back frm require(). The value of mongoose will be equal to
 * to the property value of the object that comes back from require()
 */
let {ObjectID} = require( 'mongodb' );
let {mongoose} = require( '../server/db/mongoose' );
let {Todo} = require( '../server/models/todo' );

let id = '5b41ea13a0e1a27b4756b9538';

// Checks if the id is not valid
if ( ! ObjectID.isValid( id ) ) {
    console.log( 'ID is not valid' );
}

/**
 * find() gives you the all matched documents(records) with the given id
 * Here we don't have to convert the string id into an object like before because Mongoose is going to convert the string into id for us.
 * catch() method would get you the error if the id was invalid
 */
Todo.find( {
	_id: id
}).then( ( todos ) => {
	console.log( 'Todos', todos );
} ).catch( ( error ) => console.log( error ));

/**
 * findOne() gives you the first match document(record) with the given id
 */
Todo.findOne( {
	_id: id
}).then( ( todo ) => {
	console.log( 'Todo', todo );
} ).catch( ( error ) => console.log( error ));

/**
 * findById() gives you the matched document(record) with the given id. This method is preferred when you want to find one document by ID.
 */
Todo.findById( id ).then( ( todo ) => {
	if ( ! todo ) {
	    console.log( 'Match not found' );
	}
	console.log( 'Todo by Id', todo );
} ).catch( ( error ) => console.log( error ));
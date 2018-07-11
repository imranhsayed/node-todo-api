/**
 * We are using the ES6 destructuring down below to create a variable out of its property name and setting
 * it equal to the object that comes back frm require(). The value of mongoose will be equal to
 * to the property value of the object that comes back from require()
 */
let {ObjectID} = require( 'mongodb' );
let {mongoose} = require( '../server/db/mongoose' );
let {Todo} = require( '../server/models/todo' );
let {User} = require( '../server/models/user' );

/**
 * Remove everything from the Todo collection
 * If you pass an empty object as first param in Todo.remove(), it will delete all data from Todo Collection.
 * Does not return the document that was remove but only the count of items removed in result variable.
 */
// Todo.remove( {} ).then( ( result ) => {
// 	console.log( result );
// } );

/**
 * Remove a single matched item, we put our query as first param. In below e.g find a document with given id and text and remove it.
 * Also returns the document that was removed in todo variable
 */
// Todo.findOneAndRemove( { _id: '5b45a5660c08d68bbe876250', text: 'This is my datas' } ).then( ( todo ) => {
// 	console.log( todo );
// } );

/**
 * Remove a single document/item by id
 * Also returns the document that was removed in todo variable
 */
Todo.findByIdAndRemove( '5b45a5660c08d68bbe876250' ).then( ( todo ) => {
	console.log( todo );
} );
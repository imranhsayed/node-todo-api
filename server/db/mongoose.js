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

/**
 * We are using module.exports and setting it equal to mongoose, so that it can be available in other file that requires this file.
 * Below line is equivalent to module.exports = { mongoose: mongoose } . We are using ES6 convention below to shorten the same.
 */
module.exports = { mongoose };
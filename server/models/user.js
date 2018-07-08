let mongoose = require( 'mongoose' );

/**
 * Create a mongoose collection model, so that mongoose knows how to store data.
 * Inside this model we will define the properties/attributes that the Todo collection will have
 * model() is used to create a new model, which takes the following args
 * first arg is the name of the variable 'Todo' that defines various properties for the model.
 * second arg is the object
 */
let User = mongoose.model( 'User', {
	email: { type: String, required: true, minLength: 1, trim: true }
} );

/**
 * We are using module.exports and setting it equal to mongoose, so that it can be available in other file that requires this file.
 * Below line is equivalent to module.exports = { User: User } . We are using ES6 convention below to shorten the same.
 */
module.exports = { User };
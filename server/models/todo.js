let mongoose = require( 'mongoose' );

/**
 * Create a mongoose collection model for a collection name 'Todo', so that mongoose knows how to store data.
 * Inside this model we will define the properties/attributes that the Todo collection will have
 * model() is used to create a new model, which takes the following args
 * first arg is the name of the variable 'Todo' that defines various properties for the model.
 * second arg is the object
 */
let Todo = mongoose.model( 'Todo', {
	/**
	 * By setting required value to true, minLength to 1 and trim to true,
	 * we are setting the validation for text to be required with min value of 1, and trim will trim all
	 * white spaces from the beginning and end of the given text.
	 */
	text: { type: String, required: true, minLength: 1, trim: true },
	/**
	 * By setting default value to false, we are setting the validation for completed,
	 * meaning if no value is give while inserting the data, its default value will be false
	 */
	completed: { type: Boolean, default: false },
	completedAt: { type: Number, default: null }
} );

/**
 * We are using module.exports and setting it equal to mongoose, so that it can be available in other file that requires this file.
 * Below line is equivalent to module.exports = { Todo: Todo } . We are using ES6 convention below to shorten the same.
 */
module.exports = { Todo };

const mongoose = require( 'mongoose' );
const validator = require( 'validator' );
const jwt = require( 'jsonwebtoken' );

/**
 * UserSchema variable is going to store a schema ( collection/table structure ) for the user
 * Schema property of mongoose object lets you define a new schema
 */
let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minLength: 6,
	},
	token: [{
		access: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true
		}
	}]
} );


/**
 * UserSchema.methods is an object on which you can define any methods.
 * We need this keyword which stores individual items, hence we are not using arrow function here.
 */
UserSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = 'auth';
	let token = jwt.sign( { _id: user._id.toHexString(), access }, 'abc123' ).toString();

	// Here we are adding the new access and token variables values to the token property of user created above.
	user.tokens = user.tokens.concat( [ { access, token } ] );
	// user.tokens.push( { access, token } );

	return user.save().then( () => {
				return token;
			} );
};

/**
 * Create a mongoose collection model, so that mongoose knows how to store data.
 * Inside this model we will define the properties/attributes that the Todo collection will have
 * model() is used to create a new model, which takes the following args
 * first arg is the name of the variable 'Todo' that defines various properties for the model.
 * second arg is the object
 * Setting unique to true will ensure we accept a unique email in the database,
 * validate property takes an object containing a method and a message value which will be used if the email was not valid
 * validator.isEmail  will return true if the email is valid
 */
let User = mongoose.model( 'User', UserSchema );

/**
 * We are using module.exports and setting it equal to mongoose, so that it can be available in other file that requires this file.
 * Below line is equivalent to module.exports = { User: User } . We are using ES6 convention below to shorten the same.
 */
module.exports = { User };
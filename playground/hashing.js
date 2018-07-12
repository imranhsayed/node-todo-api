/**
 * Getting a property called SHA256 out of the object returned by requiring crypto js module.
 * 256 is the no of but of the resulting hash
 */
const jwt = require( 'jsonwebtoken' );

let data = {
	id: 5
};

/**
 * jwt.sign() takes the data with the user id and signs it, creates a hash and returns a token value.
 * It takes the data as the first param and the secret as the second and returns a token, which we will
 * send to the user when they sign in or login.
 */
let token = jwt.sign( data, '123abc' );
console.log( token );

/**
 * jwt.sign() takes the token( first param ) and the secret ( second param )
 * and verifies that the data was not manipulated.
 * It returns the decoded( original ) value of the data that was converted into token
 */
let decoded = jwt.verify( token, '123abc' );
console.log( decoded );



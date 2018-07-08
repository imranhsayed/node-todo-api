const {MongoClient, ObjectID } = require( 'mongodb' );

MongoClient.connect( 'mongodb://localhost:27017/ToDoApp', ( err, db ) => {
	if ( err ) {
		return console.log( 'unable to connect to MongoDB sever' );
	}

	console.log( 'connected to mongoDB server' );

	/**
	 * Update the value
	 * findOneAndUpdate() takes
	 * first argument is the conditional query object ( in this case find one with the given id )
	 * second argument is an object containing data you want to update. Here $set is an update operator used to update the document (record)
	 * third argument is an option object. Here when returnOriginal is set to true, it returns the original document object before it was updated.
	 */
	// db.collection( 'Todos' ).findOneAndUpdate(
	// 	{ _id: new ObjectID( '5b41c543d44f4c341e99f821' ) },
	// 	{ $set: { completed: false } },
	// 	{ returnOriginal: false }
	// 	).then( ( result ) => {
	// 		console.log( result );
	// } );

	/**
	 * Update the value
	 * findOneAndUpdate() takes
	 * first argument is the conditional query object ( in this case find one with the given id )
	 * second argument is an object containing data you want to update. Here $set is an update operator used to update the document (record) and $inc increments the value of age by 1
	 * third argument is an option object. Here when returnOriginal is set to true, it returns the original document object before it was updated.
	 */
	db.collection( 'Users' ).findOneAndUpdate(
		{ _id: new ObjectID( '5b41d7e4b9b9789e494ec557' ) },
		{ $set: { name: 'Alexa' },
		  $inc: { age: 1 }
		},
		{ returnOriginal: false }
	).then( ( result ) => {
		console.log( result );
	} );

}, );
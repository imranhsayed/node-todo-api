const {MongoClient, ObjectID } = require( 'mongodb' );

MongoClient.connect( 'mongodb://localhost:27017/ToDoApp', ( err, db ) => {
	if ( err ) {
		return console.log( 'unable to connect to MongoDB sever' );
	}

	console.log( 'connected to mongoDB server' );

	/**
	 * deleteMany()
	 * Here 'Todos' is the collection( table name )
	 * deleteMany() deletes all the records that match the criteria passed as object argument inside of it
	 * then() is a call back executed on completion of the query.
	 * then() has first parameter as function(gets executed on success) which has result param containing the all matched documents(records) that were deleted,
	 * and the second param as an error handler function.
	 */
	// db.collection( 'Users' ).deleteMany({ name: 'Alexa' }).then( ( result ) => {
	// 	console.log( result );
	// }, ( err ) => {
	// 	console.log( 'Could not delete the item', err );
	// } );

	/**
	 * deleteOne()
	 * deleteOne() deletes the first matched document(record)
	 */
	// db.collection( 'Todos' ).deleteOne( { text: 'Travel around' } ).then( ( result ) => {
	// 	console.log( result );
	// } );

	/**
	 * FIND ONE AND DELETE by ID
	 */
	db.collection( 'Users' ).findOneAndDelete( { _id: new ObjectID('5b40e609667618c79df27353') }  ).then( ( docs ) => {
		console.log( 'todos');
		console.log( JSON.stringify( docs, undefined, 2 )  );
	}, ( err ) => {
		console.log( 'Unable to fetch todos', err );
	} );


}, );
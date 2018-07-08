const {MongoClient, ObjectID } = require( 'mongodb' );

MongoClient.connect( 'mongodb://localhost:27017/ToDoApp', ( err, db ) => {
	if ( err ) {
		return console.log( 'unable to connect to MongoDB sever' );
	}

	console.log( 'connected to mongoDB server' );

	/**
	 * Here 'Todos' is the collection( table name )
	 * find() returns a mongodb cursor which is a pointer to all documents( records ), which has a lot of methods like toArray
	 * that can be used to get our documents( records )
	 * toArray() along with find() returns an array of document(record) objects
	 * then() is a call back executed on completion of the query.
	 * then() has first parameter as function(gets executed on success) which has docs param containing the all documents(records),
	 * and the second param as an error handler function.
	 */
	db.collection( 'Users' ).find( { name: 'Alexa' } ).toArray().then( ( docs ) => {
		console.log( JSON.stringify( docs, undefined, 3 ) );
	}, ( err ) => {
		console.log( 'Cound not connect to the database', err );
	} );

}, );
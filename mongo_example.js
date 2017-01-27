"use strict";

// const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  // Another way to say: this is an "entry point" for
  // a database-connected application!


///////////before refactoring////////////////////
  // db.collection('tweets').find({}, (err, results) => {
  // Lazy error handling:
    // if (err) throw err;

  // ==> Fair warning: this is going to log a lot of stuff.
  // console.log('find result: ', result);
  // console.log('type of find result: ', typeof result);

  // ==> We can iterate on the cursor to get results, one at a time:
  // console.log("for each item yielded by the cursor:");
  // results.each((err, item) => console.log("  ", item));

  // ==> We could instead just slurp the items into an array:
    // results.toArray((err, resultsArray) => {
    //   if (err) throw err;

    //   console.log('resuts.toArray: ', resultsArray);
    // });
/////////////////////////////

  function getTweets(callback) {
    db.collection('tweets').find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

// ==> Later it can be invoked REmember even if you pass
//  'getTweets' to another scope, it still has closure over
//  'db', so it will still work.

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet: ");
    for (let tweet of tweets) {
      console.log(tweet);
    }
    // ==> At the end, we close the connection:
    // ==> This is inside this callback now. Think about it:
    // This is now the "end of the program", right?
    db.close();
  });

});
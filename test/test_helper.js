const mongoose = require("mongoose");

// Get a ES6 implementation
mongoose.Promise = global.Promise;

const { MONGO_HOSTNAME } = process.env;

const hostname = MONGO_HOSTNAME || "localhost";

// Assure that we have a connection before execute our tests.
before(done => {
    mongoose.connect(`mongodb://${hostname}/users_test`);
    mongoose.connection
        .once("open", () => {
            console.log("Connected to users_test db.");
            done();
        })
        .on("error", error => console.warn("Warning", error));
});

beforeEach(done => {
    // This is going to tell mocha that we have finished the asyn drop call.
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

const assert = require("assert");
const User = require("../src/user");

describe("Reading user out of the database", () => {
    let joe, alex, maria, zach;

    beforeEach(async () => {
        alex = await new User({ name: "Alex" }).save();
        joe = await new User({ name: "Joe" }).save();
        maria = await new User({ name: "Maria" }).save();
        zach = await new User({ name: "Zach" }).save();
    });

    it("finds all users with the given name", done => {
        User.find({ name: "Joe" }).then(users => {
            assert(users[0]._id.toString === joe._id.toString);
            done();
        });
    });

    it("find a user with a particular id", done => {
        User.findOne({ _id: joe._id }).then(user => {
            assert(user.name === "Joe");
            done();
        });
    });

    it("can skip and limit the result set", async () => {
        const users = await User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2);
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
    });
});

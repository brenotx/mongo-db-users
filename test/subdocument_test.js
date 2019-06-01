const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
    it("can create a subdocument", async () => {
        await new User({ name: "Joe", posts: [{ title: "PostTitle" }] }).save();
        const user = await User.findOne({ name: "Joe" });
        assert(user.posts[0].title === "PostTitle");
    });

    it("can add subdocuments to an existing record", async () => {
        await new User({ name: "Joe", posts: [] }).save();
        const user = await User.findOne({ name: "Joe" });
        user.posts.push({ title: "New Post" });
        await user.save();
        const newUser = await User.findOne({ name: "Joe" });
        assert(newUser.posts[0].title === "New Post");
    });

    it("can remove an existing subdocument", async () => {
        await new User({ name: "Joe", posts: [{ title: "Post 1" }] }).save();
        const user = await User.findOne({ name: "Joe" });
        user.posts[0].remove();
        await user.save();
        const newUser = await User.findOne({ name: "Joe" });
        assert(newUser.posts.length === 0);
    });
});

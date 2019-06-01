const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
    it("postCount returns number of posts", async () => {
        await new User({ name: "Joe", posts: [{ title: "PostTitle" }] }).save();
        const user = await User.findOne({ name: "Joe" });
        assert(user.postCount === 1);
    });
});

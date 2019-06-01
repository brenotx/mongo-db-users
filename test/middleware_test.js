const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
    let joe, blogPost;

    beforeEach(async () => {
        joe = new User({ name: "Joe" });
        blogPost = new BlogPost({
            title: "JS is Great",
            content: "Yep it really is"
        });

        joe.blogPosts.push(blogPost);

        await joe.save();
        await blogPost.save();
    });

    it("users clean up dangling blogpost on remove", async () => {
        await joe.remove();
        const count = await BlogPost.count();
        assert(count === 0);
    });
});

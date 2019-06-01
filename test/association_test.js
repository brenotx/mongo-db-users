const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
    let joe, blogPost, comment;

    beforeEach(async () => {
        joe = new User({ name: "Joe" });
        blogPost = new BlogPost({
            title: "JS is Great",
            content: "Yep it really is"
        });
        comment = new Comment({ content: "Congrats on great post" });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe; // Mongoose set up just the ID for us.

        await joe.save();
        await blogPost.save();
        await comment.save();
    });

    it("save a relation between an user and a blogpost", async () => {
        const user = await User.findOne({ name: "Joe" }).populate("blogPosts");
        assert(user.blogPosts[0].title === "JS is Great");
    });

    it("saves a full relation graph", async () => {
        const user = await User.findOne({ name: "Joe" }).populate({
            path: "blogPosts",
            populate: {
                path: "comments",
                model: "comment",
                populate: {
                    path: "user",
                    model: "user"
                }
            }
        });
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "JS is Great");
        assert(
            user.blogPosts[0].comments[0].content === "Congrats on great post"
        );
        assert(user.blogPosts[0].comments[0].user.name === "Joe");
    });
});

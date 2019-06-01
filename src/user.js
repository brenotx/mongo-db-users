const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: name => name.length > 2,
            message: "Name must be longer than 2 characters."
        },
        required: [true, "Name is required."]
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "blogPost"
        }
    ]
});

UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
});

UserSchema.pre("remove", async function() {
    const BlogPost = mongoose.model("blogPost");

    // It goes through all BlogPost collections and remove the IDs
    // which is also inside the user.blogPost list
    await BlogPost.remove({ _id: { $in: this.blogPosts } });
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

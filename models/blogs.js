const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Provide Blog title"],
      unique: [true, "Title already exists. Provide another title"],
    },
    blogImage: {
      type: String,
      required: [true, "Image Url is required"],
    },
    description: {
      type: String,
      required: [true, "Describe the blog!"],
    },
    blogBody: {
      type: String,
      required: [true, "Blog body is required"],
    },
    tags: {
      type: String,
      enum: [
        "Technology",
        "Sports",
        "Religion",
        "Politics",
        "Economy",
        "Nature",
      ],
      required: [true, "Select a category from the list"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Author's name is required"],
    },
    state: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    read_count: {
      type: Number,
    },
    reading_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogsSchema);

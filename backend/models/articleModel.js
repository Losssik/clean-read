const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    tags: {
      type: [String],
      validate: {
        validator: (tags) => tags.length <= 5,
        message: "Maximum 5 tags! no more please!",
      },
      // this run before saving to DB
      set: (tags) => tags.map((tag) => tag.trim().toLowerCase()),
    },
    readLaterList: {
      type: Boolean,
      default: false,
    },
    //sourceUrl: String,
  },

  { timestamps: true }
);
//for finding text
articleSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Article", articleSchema);

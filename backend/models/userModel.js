const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "wrong mail!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },

  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],

  readLaterList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article", // points to Article model
    },
  ],
  // to embed the document we need to create ARRAY
  // readLaterList: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Article",
  //   },
  // ],
});

// "statics" methods "this refers to model"
// "methods" <-- for a single document of colelction User in this case
userSchema.statics.signup = async function (name, email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (password.length < 3) {
    throw Error("Password must be at least 3 characters long");
  }

  if (!name || !email || !password) {
    throw Error("please fill all the fields!");
  }

  // hashing password  - "10" = how hard to break the password. higher number = harder to break and longer time during loging
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

//statics for login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("please fill all the fields!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email!");
  }

  // password = plane text
  // user.password = hashed
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("incorrect password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

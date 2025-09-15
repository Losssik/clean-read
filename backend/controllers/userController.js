const { findByIdAndUpdate } = require("../models/articleModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    //send token back to client to be able to compare it with server later
    res.status(200).json({
      email: user.email,
      token,
      name: user.name,
      id: user._id,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);

    //create token
    const token = createToken(user._id);

    //send token back to client to be able to compare it with server later
    res.status(200).json({ email, token, name });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// add article to favourites
const addOnReadLaterList = async (req, res) => {
  const userId = req.user._id; // z middleware requireAuth
  const articleId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Sprawdź, czy artykuł już jest na liście ulubionych
    if (user.favourites.includes(articleId)) {
      return res.status(400).json({ message: "Already on your list! xd" });
    }

    // Dodaj do ulubionych (bez duplikatów)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favourites: articleId } },
      { new: true }
    );

    res.status(200).json({
      message: "Added to favourites",
      favourites: updatedUser.favourites,
      userId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete from favourite list

const deleteFromReadLaterList = async (req, res) => {
  const articleId = req.params.id;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favourites: articleId } },
      { new: true }
    );

    res.status(200).json({
      message: "Deleted from your list",
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get favourite list
const getReadLaterList = async (req, res) => {
  try {
    const userId = req.user._id; // from middleware requireAuth

    // Pobierz użytkownika i załaduj artykuły z favourites
    const user = await User.findById(userId).populate("favourites");

    res.status(200).json({
      favourites: user.favourites,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  addOnReadLaterList,
  getReadLaterList,
  deleteFromReadLaterList,
};

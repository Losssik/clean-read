const Article = require("../models/articleModel");
const mongoose = require("mongoose");

// get all articles
const getAllArticles = async (req, res) => {
  // pagination
  const page = req.query.page || 0;
  // number of visible articles per page
  const articlesPerPage = 10;
  try {
    //getting articles based on tag if this exists
    const tags = req.query.tags;
    let query = {};

    if (tags) {
      query.tags = { $in: tags };
    }

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .skip(page * articlesPerPage)
      .limit(articlesPerPage);

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single article
const getSingleArticle = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "article with this id doesnt exist" });
  }
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// post an article
const createArticle = async (req, res) => {
  const { title, content, author, tags } = req.body;

  try {
    const article = await Article.create({ title, content, author, tags });
    res.status(201).json({
      success: true,
      data: article,
      message: "added :)",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
// delete an article
const deleteArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found :(",
      });
    }
    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      data: article,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//update article
const updateArticle = async (req, res) => {
  id = req.params.id;

  try {
    const article = await Article.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found :(",
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// add article to save on later list
const saveOnLaterArticle = async (req, res) => {
  const id = req.params.id;

  try {
    //from middleware requireAuth
    const user_id = req.user._id;
    const article = await Article.findByIdAndUpdate(
      { _id: id },
      {
        readLaterList: true,
      }
    );

    res.status(200).json({
      article,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// remove from save on later list

// const removeArticleFromSaveOnLaterList = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const article = await Article.findByIdAndUpdate(
//       { _id: id },
//       { readLaterList: false }
//     );

//     if (!article) {
//       return res.status(404).json({
//         success: false,
//         message: "Article not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Article removed from read later list",
//       article,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while removing the article from the list",
//       error: err.message,
//     });
//   }
// };

// get all articles that belongs to "read later list"

const getSaveOnLaterArticles = async (req, res) => {
  const article = await Article.aggregate([
    {
      $match: { readLaterList: true },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  res.status(200).json(article);
};

// search article based on text

const searchArticle = async (query) => {
  try {
    const results = await Article.find({ $text: { $search: query } });
    return results;
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
};

const searchArticleRouteHandler = async (req, res) => {
  const query = req.query.q;

  if (!query || query === "") {
    return res.status(400).json({ error: "Query string (q) is required." });
  }

  try {
    const articles = await searchArticle(query);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to search articles." });
  }
};

// DELETE ALL DOCS
const DELETEALL = async (req, res) => {
  try {
    await Article.deleteMany({});
    res.status(200).json({ message: "all deleted" });
  } catch (err) {
    res.status(500).json({
      message: "error while deleting",
      error: err.message,
    });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
  saveOnLaterArticle,
  getSaveOnLaterArticles,
  searchArticleRouteHandler,
  DELETEALL,
};

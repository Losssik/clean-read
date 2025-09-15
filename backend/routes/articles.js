const express = require("express");
const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  deleteArticle,
  updateArticle,
  saveOnLaterArticle,
  getSaveOnLaterArticles,

  DELETEALL,
  addToFavourites,
  searchArticleRouteHandler,
} = require("../controllers/articleController");
const validateTags = require("../middlewares/validateTags");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// protect all these things below
// router.use(requireAuth);

// get all articles
router.get("/", getAllArticles);

//get read on later list of articles
router.get("/read-later", getSaveOnLaterArticles);

//search for article based on input text
router.get("/search", searchArticleRouteHandler);

// post an article
router.post("/", validateTags, requireAuth, createArticle);

// delete an article
router.delete("/:id", deleteArticle);

//DELETE ALL ARTICLES!
router.delete("/delete-all", DELETEALL);

//update
router.patch("/:id", updateArticle);

//add to 'save on later list'
router.patch("/read-later/:id", requireAuth, saveOnLaterArticle);

// get a single article
router.get("/:id", getSingleArticle);

//delete from 'save on later list'

//router.post("/favourites/:id", requireAuth, addToFavourites);

module.exports = router;

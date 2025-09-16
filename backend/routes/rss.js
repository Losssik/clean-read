const express = require("express");
const {
  parseWPFeed,
  parseSportPoland,
  parseTechnology,
} = require("../controllers/rssController");

const router = express.Router();

// get news from WP.pl
router.get("/top-news-poland", parseWPFeed);

// get TOP SPORT news from Przeglad Sportowy
router.get("/top-news-poland/sport", parseSportPoland);

//get TECHNOLGY articles
router.get("/technology", parseTechnology);

module.exports = router;

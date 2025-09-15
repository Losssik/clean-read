const express = require("express");
const {
  parseWPFeed,
  parseSportPoland,
} = require("../controllers/rssController");

const router = express.Router();

// get news from WP.pl
router.get("/top-news-poland", parseWPFeed);

// get TOP SPORT news from Przeglad Sportowy
router.get("/top-news-poland/sport", parseSportPoland);

module.exports = router;

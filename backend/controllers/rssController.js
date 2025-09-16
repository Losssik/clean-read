const mongoose = require("mongoose");
const RSSParser = require("rss-parser");

// parsing class
class ParseArticle {
  constructor(urlFeed) {
    this.urlFeed = urlFeed;
    this.parser = new RSSParser();
  }

  async parseFeed() {
    try {
      const feed = await this.parser.parseURL(this.urlFeed);

      const articles = feed.items.map((item) => ({
        title: item.title,
        content: item.description || item.contentSnippet || item.summary,
        link: item.link,
      }));

      return articles;
    } catch (err) {
      console.error(`Błąd podczas parsowania ${this.feedURL}:`, err);
      throw err;
    }
  }
}

// PARSE TOP ARTICLES FROM WP.PL
const wpParser = new ParseArticle("https://wiadomosci.wp.pl/rss.xml");
const parseWPFeed = async (req, res) => {
  try {
    const articles = await wpParser.parseFeed();
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PARSE TOP SPORT ARTICLES FROM POLAND
const sportParser = new ParseArticle("https://przegladsportowy.onet.pl/.feed");
const parseSportPoland = async (req, res) => {
  try {
    const articles = await sportParser.parseFeed();
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PARSE TECHNOLOGY ARTICLES FROM PAP
const technologyParser = new ParseArticle(
  "https://pap-mediaroom.pl/kategoria/nauka-i-technologie/rss.xml"
);

const parseTechnology = async (req, res) => {
  try {
    const articles = await technologyParser.parseFeed();
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  parseWPFeed,
  parseSportPoland,
  parseTechnology,
};

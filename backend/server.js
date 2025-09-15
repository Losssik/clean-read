require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const articleRoutes = require("./routes/articles");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contactForm");
const aiRoutes = require("./routes/ai");
const rssRoutes = require("./routes/rss");
// epxress app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes

app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/contact", contactRoutes);
app.use("/api/rss/", rssRoutes);
app.use("/contact", (req, res, next) => {
  console.log("Request body:", req.body); // To sprawdzi, co otrzymujesz
  next();
});

// connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`conntected to DB and listening on ${process.env.PORT} port`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

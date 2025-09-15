const express = require("express");
const {
  signupUser,
  loginUser,
  addOnReadLaterList,
  getReadLaterList,
  deleteFromReadLaterList,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

//add to favurite
router.post("/read-later/:id", requireAuth, addOnReadLaterList);

//delete from favourite
router.patch("/read-later/:id", requireAuth, deleteFromReadLaterList);

//get favourites
router.get("/read-later", requireAuth, getReadLaterList);

module.exports = router;

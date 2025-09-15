module.exports = (req, res, next) => {
  const inputTags = req.body.tags;

  //checking if user added a tag, decided to use a loose operator as it covers more cases, not sure if my idea is good? xd
  if (inputTags == "") {
    return res.status(400).json({
      message: "please provide at least 1 TAG!",
    });
  }

  //checking if each words end with ","
  for (let inputTag of inputTags) {
    const lastCharacter = inputTag.charAt(inputTag.length - 1);

    const lastTag = inputTags[inputTags.length - 1];
    lastCharacterOfLastTag = lastTag.charAt(inputTag.length - 1);
    console.log(lastCharacterOfLastTag);

    //check if last tag contains white space
    if (" \t\n\r\v".indexOf(lastTag) > -1) {
      return res.status(400).json({
        message: "last tag cannot end with whitespace!",
      });
    }

    if (lastCharacter === ",") {
      return res.status(400).json({
        message: "please don't use comma at the end of TAGS!",
      });
    }
  }

  next();
};

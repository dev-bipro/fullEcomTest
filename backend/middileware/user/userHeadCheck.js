const userHead = async (req, res, next) => {
  //   res.send(req.headers.authorization);
  if (req.headers.authorization != "passThikAche") {
    res.status(401).send("invalid user");
  } else {
    next();
  }
};
module.exports = userHead;

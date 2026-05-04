const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("not login! please login");
    }

    const decodeddata = jwt.verify(token, "secretkeyhawww");

    const { userid } = decodeddata;

    const user = await User.findById(userid);

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ error: "Auth failed: " + err.message });
  }
};

module.exports = auth;
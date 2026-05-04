const express = require('express');
const authroutes = express.Router();
const { validatesignupdata } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

authroutes.post("/signup", async (req, res) => {
  try {
    validatesignupdata(req);

    const passwordhash = await bcrypt.hash(req.body.password, 10);

    const userobj = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordhash,
    });

    await userobj.save();

    return res.json({ message: "user created successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
});

authroutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const passmatch = await user.validatepassword(password);

    if (!passmatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.json({
      message: "login successful",
      user: safeUser,
    });

  } catch (err) {
    return res.status(500).json({
      message: "login failed",
      error: err.message,
    });
  }
});

authroutes.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "logout successful" });
  } catch (err) {
    return res.status(500).json({
      message: "logout failed",
      error: err.message,
    });
  }
});



module.exports = authroutes;  
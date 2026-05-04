const express = require('express');
const profileroutes = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const { validateprofiledata, validatepassword } = require('../utils/validation');
const bcrypt = require('bcrypt');

profileroutes.get("/profile/view", auth, async (req, res) => {
  try {
    return res.json(req.user);
  } catch (err) {
    return res.status(400).json({ error: "profile error: " + err.message });
  }
});

profileroutes.patch("/profile/edit", auth, async (req, res) => {
  try {
    validateprofiledata(req);

    const user = req.user;
    const data = req.body;

    Object.keys(data).forEach((key) => {
      user[key] = data[key];
    });

    await user.save();

    return res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (err) {
    return res.status(400).json({ error: "profile update error: " + err.message });
  }
});

profileroutes.patch("/profile/forgotpass", auth, async (req, res) => {
  try {
    validatepassword(req);

    const user = req.user;
    const passwordhash = await bcrypt.hash(req.body.password, 10);

    user.password = passwordhash;
    await user.save();

    return res.json({ message: "password updated successfully" });

  } catch (err) {
    return res.status(400).json({ error: "password update error: " + err.message });
  }
});

module.exports = profileroutes;
const User = require("../models/userModel");
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body
  const hashPassword = await bcrypt.hash(password, 12)
    try {
      const user = await User.create({
        username,
        password: hashPassword
      });
      res.json({
        status: "success",
        data: {
            user,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        error
      });
    }
  };

exports.logIn = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({
      username,
    });

    if(!user) {
      return res.status(400).json({
        status: "error",
        error: "User not found"
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password)
    if(!isCorrect) {
      return res.status(400).json({
        status: "error",
        error: "Wrong passowrd"
      });
    }

    res.json({
      status: "success",
      data: {
          user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error
    });
  }
};
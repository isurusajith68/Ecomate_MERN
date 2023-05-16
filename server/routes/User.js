const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).json({ message: "success", data: user });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, phonenumber, password } = req.body;
    if (!name || !email || !phonenumber || !password) {
      return res.status(400).json({ message: " fields are empty" });
    }
    const exists = await User.findOne({ $or: [{ name }, { email }] });
    if (exists) {
      return res.status(409).json({ message: "name or email already sssssssssssssssssss" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phonenumber,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User created successfully", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "fields are empty" });
    }

    // Find user by name
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid name" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        type:user.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      msg: "Login Successful...!",
      name: user.name,
      token,
      type: user.type,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
  // const { name, password } = req.body;

  // try {
  //   User.findOne({ name })
  //     .then((user) => {
  //       bcrypt
  //         .compare(password, user.password)
  //         .then((passwordCheck) => {
  //           if (!passwordCheck)
  //             return res.status(400).send({ error: "Don't have Password" });

  //           // create jwt token
  //           const token = jwt.sign(
  //             {
  //               userId: user._id,
  //               name: user.name,
  //             },
  //             ENV.JWT_SECRET,
  //             { expiresIn: "24h" }
  //           );

  //           return res.status(200).send({
  //             msg: "Login Successful...!",
  //             name: user.name,
  //             token,
  //           });
  //         })
  //         .catch((error) => {
  //           return res.status(400).send({ error: "Password does not Match" });
  //         });
  //     })
  //     .catch((error) => {
  //       return res.status(404).send({ error: "name not Found" });
  //     });
  // } catch (error) {
  //   return res.status(500).send({ error });
  // }
});

module.exports = router;

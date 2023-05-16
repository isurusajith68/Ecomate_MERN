const express = require("express");
const router = express.Router();
const Resource = require("../model/Resource");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

// router.get("/", async (req, res) => {
//   const resource = await Resource.find();
//   res.status(200).json({ message: "success", data: resource });
// });

router.get("/post", async (req, res) => {
  res.json(await Resource.find().sort({ createdAt: -1 }).limit(20));
});

router.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;

  if (!title || !summary || !content) {
    return res.status(400).json({ message: " fields are empty" });
  }
  const postDoc = await Resource.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res
    .status(201)
    .json({ message: "Resource created successfully", data: postDoc });
});

router.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id, title, summary, content } = req.body;

  if (!title || !summary || !content) {
    return res.status(400).json({ message: " fields are empty" });
  }
  const postDoc = await Resource.findById(id);
  await postDoc.updateOne({
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });
  res
    .status(201)
    .json({ message: "Resource update successfully", data: postDoc });

  return;
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Resource.findById(id);
  res.json(postDoc);
});

router.get("/postclient/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Resource.findById(id);
  res.json(postDoc);
});

router.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  await Resource.findByIdAndDelete(id);
  res.status(201).json({ message: "delete successfully" });
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/userroutes");
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use("/users", router);
app.use("/files", express.static("files"));

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:E9B9Duanfery5rXz@cluster0.zurgm.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));

// Register Model
require("./Model/Regsitermodel");
const User = mongoose.model("Registermodel");

app.post("/Register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await User.create({ username, email, password });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found" });
    if (user.password === password) return res.json({ status: "ok" });
    return res.json({ error: "Incorrect password" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PDF Upload Setup
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './files'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const pdfUpload = multer({ storage: pdfStorage });

require("./Model/PdfModel");
const PdfModel = mongoose.model("PdfModel");

app.post("/uploadfile", pdfUpload.single("file"), async (req, res) => {
  const title = req.body.title;
  const pdf = req.file.filename;

  try {
    await PdfModel.create({ title, pdf });
    res.status(200).send({ status: "ok" });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).send({ status: "error" });
  }
});

app.get("/getFile", async (req, res) => {
  try {
    const data = await PdfModel.find({});
    res.send({ status: "ok", data });
  } catch (err) {
    console.error("Error in Getting File", err);
    res.status(500).send({ status: "error" });
  }
});

// Image Upload Setup
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'files')), // Ensure this directory exists
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const imageUpload = multer({ storage: imageStorage });

require("./Model/Imagemodel");
const ImgModel = mongoose.model("Imagemodel");

app.post("/UploadImg", imageUpload.single("image"), async (req, res) => {
  const imageName = req.file.filename;

  try {
    await ImgModel.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Image upload error:", error);
    res.json({ status: "error", message: error.message });
  }
});

// Display Images
app.get("/getImage", async (req, res) => {
  try {
    const data = await ImgModel.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


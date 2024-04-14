const express = require("express");
const multer = require("multer");
const paperRouter = express.Router();
const { createPaper, getPapers, getPaperById } = require("../controller/paper");
const { authenticateToken } = require("../middleware/middleware");

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // rename file to avoid conflicts
  }
});

const upload = multer({ storage: storage });

// Route for creating a paper with multer middleware for file upload
paperRouter.post("/create-paper", authenticateToken, upload.single('Image'), createPaper); 
// Route for fetching all papers
paperRouter.get("/get-paper", getPapers); 
// Route for fetching a paper by ID
paperRouter.get("/get-paper/:id", getPaperById); 

module.exports = { paperRouter };

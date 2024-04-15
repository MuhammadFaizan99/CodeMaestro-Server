const express = require("express");
const paperRouter = express.Router();
const { createPaper, getPapers, getPaperById } = require("../controller/paper");
const { authenticateToken } = require("../middleware/middleware");
const { createReadStream } = require('fs');
const { Blob } = require('@vercel/node');
const { Storage } = require('@vercel/storage-api');
const multer = require("multer");

const storage = new Storage({
  token: process.env.VERCEL_STORAGE_TOKEN, // Replace with your Vercel storage token
});

// Multer setup for handling file uploads
const upload = multer();

// Route for creating a paper with Vercel Blob for file upload
paperRouter.post("/create-paper", authenticateToken, upload.single('Image'), async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const { Image } = req.file;

    // Upload image to Vercel Blob
    const imageStream = createReadStream(Image.path);
    const { Key } = await storage.bucket('code-maestro-server-blob').upload(imageStream, {
      contentType: Image.mimetype,
    });

    // Create new paper document
    const newPaper = new paperModel({
      Title,
      Description,
      Image: Key,
      createdBy: req.user.userId,
    });

    // Save the paper to the database
    await newPaper.save();

    res.status(201).json({ message: "Paper created successfully" });
  } catch (error) {
    console.error("Error creating paper:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching all papers
paperRouter.get("/get-paper", getPapers); 

// Route for fetching a paper by ID
paperRouter.get("/get-paper/:id", getPaperById); 

module.exports = { paperRouter };
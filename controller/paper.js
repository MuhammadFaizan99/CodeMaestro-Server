const { paperModel } = require("../model/paperSch");

const createPaper = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const Image = req.file.path; // path to the uploaded image

    // Get the logged-in user's ObjectId from the request
    const createdBy = req.user.userId;

    // Create new paper document
    const newPaper = new paperModel({
      Title,
      Description,
      Image,
      createdBy, // Assign createdBy field with the ObjectId of the logged-in user
    });

    // Save the paper to the database
    await newPaper.save();

    res.status(201).json({ message: "Paper created successfully" });
  } catch (error) {
    console.error("Error creating paper:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPapers = async (req, res) => {
  try {
    // Fetch all papers from the database
    const papers = await paperModel.find();

    res.status(200).json(papers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPaperById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find paper by ID and populate the createdBy field with the Name of the user
    const paper = await paperModel.findById(id).populate('createdBy', 'Name');

    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }

    res.status(200).json(paper);
  } catch (error) {
    console.error("Error fetching paper by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createPaper, getPapers, getPaperById };

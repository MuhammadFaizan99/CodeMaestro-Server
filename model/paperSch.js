const mongoose = require("mongoose");
const { Schema } = mongoose;

const paperSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User" // Reference to the User model
    },
  },
  { timestamps: true }
);

const paperModel = mongoose.model("Paper", paperSchema);

module.exports = { paperModel };

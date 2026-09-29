const express = require("express");
const Notice = require("../models/Notice");

const router = express.Router();


// GET all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      publishDate: -1,
      createdAt: -1,
    });

    res.json(notices);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notices",
      error: error.message,
    });
  }
});


// GET single notice
router.get("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notice",
      error: error.message,
    });
  }
});


// CREATE notice
router.post("/", async (req, res) => {
  try {
    const notice = await Notice.create(req.body);

    res.status(201).json({
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create notice",
      error: error.message,
    });
  }
});


// UPDATE notice
router.patch("/:id", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json({
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update notice",
      error: error.message,
    });
  }
});


// DELETE notice
router.delete("/:id", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(
      req.params.id
    );

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete notice",
      error: error.message,
    });
  }
});


module.exports = router;

const express = require("express");
const Teacher = require("../models/Teacher");

const router = express.Router();


// GET all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({
      createdAt: -1,
    });

    res.json(teachers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
});


// GET single teacher
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(
      req.params.id
    );

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
});


// CREATE teacher
router.post("/", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create teacher",
      error: error.message,
    });
  }
});


// UPDATE teacher
router.patch("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.json({
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update teacher",
      error: error.message,
    });
  }
});


// DELETE teacher
router.delete("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(
      req.params.id
    );

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
});


module.exports = router;

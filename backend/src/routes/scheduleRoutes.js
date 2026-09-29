const express = require("express");
const Schedule = require("../models/Schedule");

const router = express.Router();

// GET all active schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find({
      status: "Active",
    }).sort({
      startDate: 1,
      createdAt: -1,
    });

    res.json(schedules);
  } catch (error) {
    console.error("Fetch schedules error:", error);

    res.status(500).json({
      message: "Failed to fetch schedules",
    });
  }
});


// GET single schedule
router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(
      req.params.id
    );

    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Fetch schedule error:", error);

    res.status(500).json({
      message: "Failed to fetch schedule",
    });
  }
});


// CREATE schedule
router.post("/", async (req, res) => {
  try {
    const schedule = new Schedule(req.body);

    const savedSchedule = await schedule.save();

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error("Create schedule error:", error);

    res.status(400).json({
      message: "Failed to create schedule",
      error: error.message,
    });
  }
});


// UPDATE schedule
router.put("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Update schedule error:", error);

    res.status(400).json({
      message: "Failed to update schedule",
      error: error.message,
    });
  }
});


// DELETE schedule
router.delete("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(
      req.params.id
    );

    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    res.json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Delete schedule error:", error);

    res.status(500).json({
      message: "Failed to delete schedule",
    });
  }
});

module.exports = router;

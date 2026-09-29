const express = require("express");
const Fee = require("../models/Fee");

const router = express.Router();

// GET all fees
router.get("/", async (req, res) => {
  try {
    const fees = await Fee.find().sort({ className: 1 });

    res.json(fees);
  } catch (error) {
    console.error("Get fees error:", error);

    res.status(500).json({
      message: "Failed to fetch fee structures",
    });
  }
});

// GET single fee structure
router.get("/:id", async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    res.json(fee);
  } catch (error) {
    console.error("Get fee error:", error);

    res.status(500).json({
      message: "Failed to fetch fee structure",
    });
  }
});

// CREATE fee structure
router.post("/", async (req, res) => {
  try {
    const fee = new Fee(req.body);

    const savedFee = await fee.save();

    res.status(201).json(savedFee);
  } catch (error) {
    console.error("Create fee error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Fee structure for this class already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create fee structure",
    });
  }
});

// UPDATE fee structure
router.put("/:id", async (req, res) => {
  try {
    const updatedFee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    res.json(updatedFee);
  } catch (error) {
    console.error("Update fee error:", error);

    res.status(500).json({
      message: "Failed to update fee structure",
    });
  }
});

// DELETE fee structure
router.delete("/:id", async (req, res) => {
  try {
    const deletedFee = await Fee.findByIdAndDelete(
      req.params.id
    );

    if (!deletedFee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    res.json({
      message: "Fee structure deleted successfully",
    });
  } catch (error) {
    console.error("Delete fee error:", error);

    res.status(500).json({
      message: "Failed to delete fee structure",
    });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "timing",
        "holiday",
        "vacation",
        "academic",
        "event",
        "timetable",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Calendar dates
    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    // Timing
    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    // Timetable fields
    className: {
      type: String,
      default: "",
      trim: true,
    },

    day: {
      type: String,
      enum: [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      default: "",
    },

    period: {
      type: String,
      default: "",
      trim: true,
    },

    subject: {
      type: String,
      default: "",
      trim: true,
    },

    teacher: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
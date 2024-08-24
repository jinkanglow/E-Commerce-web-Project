const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activityLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activityType: {
    type: String,
    enum: ["register", "login", "logout", "password_reset", "forgot_password"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

module.exports = ActivityLog;

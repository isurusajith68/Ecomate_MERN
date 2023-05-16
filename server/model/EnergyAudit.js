const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EnergyAuditSchema = new Schema(
  {
    appliance: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    h: {
      type: Number,
    },
    p: {
      type: Number,
    },
    kwh: {
      type: Number,
    },
    uid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ResourceModelModel = model("EnergyAudit", EnergyAuditSchema);

module.exports = ResourceModelModel;


const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ResourceSchema = new Schema(
  {
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    content: {
      type: String,
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ResourceModel = model("Resource", ResourceSchema);

module.exports = ResourceModel;
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    icon: String,
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Category', categorySchema);

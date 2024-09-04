// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema(
//   {
//     userId: String,
//   },
//   {
//     _id: false,
//     timestamps: true,
//     versionKey: false,
//   },
// );

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    username: String,
    avartar: String,
    phone: String,
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', UserSchema);

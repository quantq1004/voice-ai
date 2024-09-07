const daoUtils = require('./utils');
const User = require('../models/user');

const createUser = async ({
  email,
  password,
  name,
  username,
  avatar,
  phone,
}) => {
  const user = await User.create({
    email,
    password,
    name,
    username,
    avatar,
    phone,
  });
  return user;
};

const findUsers = async (queryFields) => {
  const { documents: sentences, total } = await daoUtils.findAll(
    User,
    queryFields,
  );
  return { sentences, total };
};

const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateUser = async (id, updateFields) => {
  const user = await User.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
  return user;
};

module.exports = {
  createUser,
  findUsers,
  findUserByUsername,
  findUserById,
  updateUser,
};

// const findUser = async (condition) => {
//   if (ObjectId.isValid(condition)) {
//     const user = await User.findById(condition);
//     return user;
//   }

//   if (typeof condition === 'object' && condition !== null) {
//     const user = await User.findOne(condition);
//     return user;
//   }

//   return null;
// };

// // Hàm tìm kiếm user trong database dựa trên googleId
// const findUserByGoogleId = async (googleId) => {
//   try {
//     const user = await User.findOne({ googleId });
//     return user; // Trả về user nếu tìm thấy, hoặc null nếu không
//   } catch (err) {
//     console.error(err);
//     throw new Error('Error finding user by googleId'); // Ném ra một lỗi nếu có lỗi xảy ra
//   }
// };

// // Hàm tạo mới một user trong database
// const createUserGoogle = async (newUser) => {
//   try {
//     const user = await User.create(newUser);
//     return user; // Trả về user đã được tạo nếu thành công
//   } catch (err) {
//     console.error(err);
//     throw new Error('Error creating user'); // Ném ra một lỗi nếu có lỗi xảy ra
//   }
// };

// const findUserById = async (id) => {
//   try {
//     const user = await User.findById(id);
//     return user; // Trả về user nếu tìm thấy, hoặc null nếu không
//   } catch (err) {
//     console.error(err);
//     throw new Error('Error finding user by ID'); // Ném ra một lỗi nếu có lỗi xảy ra
//   }
// };

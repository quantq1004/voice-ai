const userService = require('../services/user');

const register = async (req, res) => {
  const { email, password, name, username, phone, avatar } = req.body;
  let user = await userService.register({
    email,
    password,
    name,
    username,
    phone,
    avatar,
  });

  if (user.toObject) user = user.toObject();
  delete user.password;
  return res.send({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await userService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
};

module.exports = { register, login };

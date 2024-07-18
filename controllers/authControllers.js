import authServices from '../services/authServices.js';

const registerUser = async (req, res) => {
  const user = await authServices.register(req.body);
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const loginUser = async (req, res) => {
  const user = await authServices.login(req.body);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const currentUser = async (req, res) => {
  const { email } = req.user;
  const user = await authServices.current(email);
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const logoutUser = async (req, res) => {
  await authServices.logout(req.user);
  res.status(204).json({
    message: 'Logout success',
  });
};

const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const user = await authServices.updateSubscription(
    req.user,
    subscription
  );
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const changeAvatar = async (req, res) => {
  const { avatarUrl } = await authServices.updateAvatar(
    req
  );
  res.json({
    avatarUrl,
  });
};

export default {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
  changeSubscription,
  changeAvatar,
};

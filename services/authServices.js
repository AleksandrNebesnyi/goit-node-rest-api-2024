import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/usersSchemas.js';
import HttpError from '../helpers/HttpError.js';
import sendEmail from '../helpers/sendEmail.js';
import gravatar from 'gravatar';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

// Завантаження змінних середовища з файлу .env
dotenv.config();

// Setup __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define avatars directory
const avatarsDir = join(
  __dirname,
  '../',
  'public',
  'avatars'
);

const { sign } = jwt;
const { hash } = bcrypt;
const { BASE_URL } = process.env;

// Register User
const register = async requestBody => {
  const { email, password } = requestBody;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const hashPassword = await hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...requestBody,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);
  return newUser;
};

// verify  User
const verify = async requestParams => {
  const { verificationToken } = requestParams;
  const user = await findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

const resendEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email not found');
  }
  if (user.verify) {
    throw new HttpError(
      400,
      'Verification has already been passed'
    );
  }
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);
  return user;
};
// Login User
const login = async requestBody => {
  const { email, password } = requestBody;
  const { SECRET_KEY } = process.env;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(
    password,
    user.password
  );
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password invalid');
  }
  const payload = {
    id: user._id,
  };

  const token = sign(payload, SECRET_KEY, {
    expiresIn: '23h',
  });
  return await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
};

const current = async email => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401);
  }
  return user;
};

const logout = async currentUser => {
  const { _id, email } = currentUser;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401);
  }

  await User.findByIdAndUpdate(_id, { token: '' });
};

const updateSubscription = async (
  currentUser,
  subscription
) => {
  const { _id, email } = currentUser;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401);
  }

  return await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
};
const updateAvatar = async req => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = join('avatars', filename);
  return await User.findByIdAndUpdate(
    _id,
    { avatarUrl },
    { new: true }
  );
};

export default {
  register,
  verify,
  resendEmail,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
};

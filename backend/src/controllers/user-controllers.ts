import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import User from '../models/User.js';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(401)
        .json({ message: 'ERROR', cause: 'User already registered' });

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // NOTE create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: 'OK', id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'ERROR', cause: 'User not registered' });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: 'ERROR', cause: 'Invalid credentials' });
    }

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: 'OK', id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

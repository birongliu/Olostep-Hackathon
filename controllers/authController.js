import { signupSchema, loginSchema } from '../middleware/validationMiddleware.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  validationResult = signupSchema.safeParse({ username, email, password });

  if (!validationResult.success) {
    return res.status(400).json({ status: 400, data: validationResult.error.errors });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ status: 400, data: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, data: 'Server error'});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const validationResult = loginSchema.safeParse({ email, password });

  if (!validationResult.success) {
    return res.status(400).json({ status: 400, data: validationResult.error.errors });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status:400, data: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, data: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, data: "Internal Error"});
  }
};

const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();
const User = require('../Models/user');

router.post(
  '/register',
  [
    check('name', 'please enter your name')
      .not()
      .isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter a password')
      .not()
      .isEmpty(),
    check('role', 'wrong role mate').isIn(['Buyer', 'Seller', 'Admin']),
    check('phone', 'phone number must contain exactly 8 numbers').isLength({
      min: 8,
      max: 8
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { name, email, password, role, phone } = req.body;
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json('email already exists');
      }

      user = new User({
        name,
        email,
        password,
        role,
        phone
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const token = user.generateAuthToken();
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'enter a valid email').isEmail(),
    check('password', 'enter a password')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send('Invalid email or password.');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password.');
      }
      const token = user.generateAuthToken();
      res.json({ token });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
);

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', [auth, admin], async (req, res) => {
  try {
    users = await User.find();
    return res.send(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).send('The user with the given ID was not found.');

    res.send('user removed');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

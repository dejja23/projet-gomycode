const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const seller = require('../middlewares/seller');

const router = express.Router();
const Category = require('../models/category');

// @route    Get categories/
// @desc     get categories
// @access   Public
router.get('/', async (req, res) => {
  try {
    const categories = req.query.manufacturer
      ? await Category.find({
          manufacturer: req.query.manufacturer
        })
      : await Category.find();

    res.send(categories);
  } catch (error) {
    res.status(500).send('Server erorr');
  }
});

// @route    GET categories/:id
// @desc     get a category
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send({ msg: 'The category with the given ID was not found.' });
    res.send(category);
  } catch (error) {
    res.status(500).send('Server erorr');
  }
});

// @route    POST categories/
// @desc     add a category
// @access   Private
router.post(
  '/',
  [
    auth,
    admin,
    check('manufacturer', 'please enter the car manufacturer')
      .not()
      .isEmpty(),
    check('model', 'please enter the car model')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { manufacturer, model } = req.body;
      const category = new Category({
        manufacturer,
        model
      });
      await category.save();
      res.send(category);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server erorr');
    }
  }
);

// @route    PUT categories/
// @desc     update a category
// @access   Private
router.put(
  '/:id',
  [
    auth,
    admin,
    check('manufacturer', 'please enter the car manufacturer')
      .not()
      .isEmpty(),
    check('model', 'please enter the car model')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!category)
        return res
          .status(404)
          .send({ msg: 'The category with the given ID was not found.' });
      res.send(category);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE categories/
// @desc     delete a category
// @access   Private
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .send({ msg: 'The category with the given ID was not found.' });
    res.send('category removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

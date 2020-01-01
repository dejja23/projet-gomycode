const express = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const seller = require('../middlewares/seller');

const router = express.Router();
const Category = require('../models/category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send('Server erorr');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send('The category with the given ID was not found.');
    res.send(category);
  } catch (error) {
    res.status(500).send('Server erorr');
  }
});

router.post('/', [auth, admin], async (req, res) => {
  try {
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
});

router.put('/:id', [auth, admin], async (req, res) => {
  try {
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!category)
      return res
        .status(404)
        .send('The category with the given ID was not found.');
    res.send(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .send('The category with the given ID was not found.');
    res.send('category removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

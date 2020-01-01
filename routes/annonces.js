const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const buyer = require('../middlewares/buyer');
const seller = require('../middlewares/seller');

const router = express.Router();
const Annonce = require('../Models/annonce');

router.get('/', async (req, res) => {
  try {
    const annonces = await Annonce.find().select('title image category price');

    if (!annonces) return res.status(404).send('There are no ads yet');

    return res.send(annonces);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id).populate(
      'user',
      '-password'
    );
    if (!annonce)
      return res.status(404).send('The ad with the given ID was not found.');

    return res.send(annonce);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [
    auth,
    seller,
    check('title', 'please enter your ad title')
      .not()
      .isEmpty(),
    check('descerption', 'please enter your ad descerption')
      .not()
      .isEmpty(),
    check('image', 'please enter your car image')
      .not()
      .isEmpty(),
    check('category.manufacturer', 'please enter your car manufacturer')
      .not()
      .isEmpty(),
    check('category.model', 'please enter your car model')
      .not()
      .isEmpty(),
    check('price', 'please enter your car price')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { title, descerption, image, category, price } = req.body;
      const annonce = new Annonce({
        user: req.user._id,
        title,
        descerption,
        image,
        category,
        price
      });
      annonce.save();
      res.status(201).send(annonce);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

router.put(
  '/:id',
  [
    auth,
    seller,
    check('title', 'please enter your ad title')
      .not()
      .isEmpty(),
    check('descerption', 'please enter your ad descerption')
      .not()
      .isEmpty(),
    check('image', 'please enter your car image')
      .not()
      .isEmpty(),
    check('category.manufacturer', 'please enter your car manufacturer')
      .not()
      .isEmpty(),
    check('category.model', 'please enter your car model')
      .not()
      .isEmpty(),
    check('price', 'please enter your car price')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      let annonce = await Annonce.findById(req.params.id);
      if (!annonce)
        return res.status(404).send('The ad with the given ID was not found.');

      if (annonce.user.toString() !== req.user._id)
        return res.status(403).send('you are not the one');
      annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      annonce.populate('user');
      res.send(annonce);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/:id', [auth, seller], async (req, res) => {
  try {
    let annonce = await Annonce.findById(req.params.id);
    if (!annonce)
      return res.status(404).send('The ad with the given ID was not found.');
    if (annonce.user !== req.user._id)
      return res.status(403).send('you are not the one');
    annonce = await Annonce.findByIdAndDelete(req.params.id);
    res.send('ad removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.delete('/admin/:id', [auth, admin], async (req, res) => {
  try {
    let annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce)
      return res.status(404).send('The ad with the given ID was not found.');
    res.send('ad removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;

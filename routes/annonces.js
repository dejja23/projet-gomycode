const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const buyer = require('../middlewares/buyer');
const seller = require('../middlewares/seller');

const router = express.Router();
const Annonce = require('../Models/annonce');

// @route    GET annonces/
// @desc     get ads
// @access   Public
router.get('/', async (req, res) => {
  try {
    const annonces = req.query.user_id
      ? await Annonce.find({ user: req.query.user_id })
      : req.query.manufacturer && req.query.model
      ? await Annonce.find({
          $and: [
            { 'category.manufacturer': req.query.manufacturer },
            { 'category.model': req.query.model }
          ]
        }).populate('user', '-password')
      : req.query.manufacturer
      ? await Annonce.find({
          'category.manufacturer': req.query.manufacturer
        }).populate('user', '-password')
      : await Annonce.find().populate('user', '-password');

    if (!annonces) return res.status(404).send({ msg: 'There are no ads yet' });

    return res.send(annonces);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    GET annonces/
// @desc     get  recent 5 ads
// @access   Public
router.get('/recent', async (req, res) => {
  try {
    const annonces = await Annonce.find()
      .limit(4)
      .sort({ date: -1 });

    if (!annonces) return res.status(404).send({ msg: 'There are no ads yet' });

    return res.send(annonces);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    GET annonces/:id
// @desc     get an ad
// @access   Public i guess
router.get('/:id', async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id)
      .populate('user', '-password')
      .populate('Comments.user', '-password');

    if (!annonce)
      return res
        .status(404)
        .send({ msg: 'The ad with the given ID was not found.' });

    return res.send(annonce);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    POST annonces/
// @desc     add an ad
// @access   Private
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

// @route    PUT annonces/:id
// @desc     update an ad
// @access   Private
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
        return res
          .status(404)
          .send({ msg: 'The ad with the given ID was not found.' });

      if (annonce.user.toString() !== req.user._id)
        return res.status(403).send({ msg: 'you are not authorized' });
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

// @route    DELETE annonces/:id
// @desc     delete an ad
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let annonce = await Annonce.findById(req.params.id);
    if (!annonce)
      return res
        .status(404)
        .send({ msg: 'The ad with the given ID was not found.' });
    if (annonce.user.toString() !== req.user._id && req.user.role !== 'Admin')
      return res.status(403).send({ msg: 'unauthorized' });
    annonce = await Annonce.findByIdAndDelete(req.params.id);
    res.send('ad removed');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT annonces/like/:id
// @desc     like an ad
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (
      annonce.likes.filter(like => like.user.toString() === req.user._id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Ad already liked' });
    }
    annonce.likes.unshift({ user: req.user._id });

    await annonce.save();

    res.json(annonce);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT annonces/unlike/:id
// @desc     unlike an ad
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    if (
      annonce.likes.filter(like => like.user.toString() === req.user._id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Ad has not yet been liked' });
    }

    const removeIndex = annonce.likes
      .map(like => like.user.toString())
      .indexOf(req.user._id);

    annonce.likes.splice(removeIndex, 1);

    await annonce.save();

    res.json(annonce);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST annonces/comment/:id/:comment_id
// @desc     add a comment
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    buyer,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const annonce = await Annonce.findById(req.params.id);

      const newComment = {
        user: req.user._id,
        text: req.body.text
      };

      annonce.Comments.unshift(newComment);

      await annonce.save();

      res.json(annonce.Comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE annonces/comment/:id/:comment_id
// @desc     delete a comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);

    const comment = annonce.Comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user._id && req.user.role !== 'Admin') {
      return res.status(401).json({ msg: 'unauthorized' });
    }

    const removeIndex = annonce.Comments.map(comment => comment.id).indexOf(
      req.params.comment_id
    );

    annonce.Comments.splice(removeIndex, 1);

    await annonce.save();

    res.json(annonce.Comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;

const express = require('express');
const { Category, validate } = require('../models/categoriesModel');
const router = express.Router();



// GET all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

// POST a category
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name
  });

  await category.save();
  res.send(category);
});

// UPDATE a category
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category) return res.status(404).send('Category not found');
  res.send(category);
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send('Category not found');

  res.send(category);
});

// GET category by ID
router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send('Category not found');

  res.send(category);
});


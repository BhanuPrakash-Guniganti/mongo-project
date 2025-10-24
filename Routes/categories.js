/*
const express = require('express');
const mongoose = require('mongoose');
const Joe = require('joi');
const router = express.Router();

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
        }
    });

const Category = mongoose.model('Category', CategorySchema);
    

/*
const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
];



router.get('/categories', async (req, res) => {
    let categories = await Category.find()
    res.send(categories);
});

router.post('/categories', async (req, res) => {
    const {error} = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const category = new Category({
        name: req.body.name
    })
    await category.save();
    res.send(category);  // ✅ changed from req.send(category)
});



router.put('/categories/:id', async (req, res) => {
    const {error} = validateData(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true }, (err, category) => {
    });
   // const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');   

    //  if (error) return res.status(400).send(error.details[0].message);
    category.name = req.body.name;
    res.send(category);
});



router.delete('/categories/:id', async (req, res) => {
  //  const category = categories.find(c => c.id === parseInt(req.params.id));
  const category = await Category.findByIdAndRemove(req.params.id)
    if (!category) return res.status(404).send('Category not found');   

    res.send(category);
});

router.get('/categories/:id', async (req, res) => {
    const category = Category.findById(req.params.id));
    if (!category) return res.status(404).send('Category not found');
    res.send(category); 
});


function validateData(category) {
    const schema = Joe.object({
        name: Joe.string().min(3).required()
    });
   // return schema.validate(category);
}



module.exports = router;

*/



const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const Category = mongoose.model('Category', CategorySchema);

// GET all categories
router.get('/categories', async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

// POST a category
router.post('/categories', async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name
  });

  await category.save();
  res.send(category);
});

// UPDATE a category
router.put('/categories/:id', async (req, res) => {
  const { error } = validateData(req.body);
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
router.delete('/categories/:id', async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send('Category not found');

  res.send(category);
});

// GET category by ID
router.get('/categories/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send('Category not found');

  res.send(category);
});

// Joi validation
function validateData(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
  });
  return schema.validate(category);
}

module.exports = router;

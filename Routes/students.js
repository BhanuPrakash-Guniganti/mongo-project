const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }

  isEnrolled{
    type: Boolean,
    default: false
}

Phone {
  type: String,
  required: true,
  minlength: 10,
  maxlength: 15
}
});

const Category = mongoose.model('Category', CategorySchema);

// GET all categories
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// POST a category
router.post('/', async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = new Student({
    name: req.body.name,
    isEnrolled: req.body.isEnrolled,
    Phone: req.body.Phone
  });

  await student.save();
  res.send(student);
});

// UPDATE a category
router.put('/:id', async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true },
    isEnrolled: req.body.isEnrolled,
    Phone: req.body.Phone,
  );

  if (!student) return res.status(404).send('Category not found');
  res.send(student);
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send('Category not found');

  res.send(student);
});

// GET category by ID
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send('Category not found');

  res.send(category);
});

// Joi validation
function validateData(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    Phone: Joi.string().min(10).max(50).required(),
    isEnrolled: Joi.boolean()
  });
  return schema.validate(category);
}

module.exports = router;

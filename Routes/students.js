const express = require('express');
const { Student, validate} = require('../models/studentsModel');
const router = express.Router();


// GET all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// POST a student
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({
    name: req.body.name,
    isEnrolled: req.body.isEnrolled,
    Phone: req.body.Phone
  });

  student= await student.save();
  res.send(student);
});

// UPDATE a student
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name ,
    isEnrolled: req.body.isEnrolled,
    Phone: req.body.Phone
    },

    { new: true },
  
  );

  if (!student) return res.status(404).send('Category not found');
  res.send(student);
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).send('Category not found');

  res.send(student);
});

// GET student by ID
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send('student not found');

  res.send(student);
});



module.exports = router;

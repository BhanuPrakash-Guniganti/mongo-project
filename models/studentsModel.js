const mongoose = require('mongoose');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },

  isEnrolled: {
    type: Boolean,
    default: false
},

Phone: {
  type: String,
  required: true,
  minlength: 10,
  maxlength: 15
},

});

const Student = mongoose.model('Student', studentSchema);

// Joi validation
function validateData(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    Phone: Joi.string().min(10).max(15).required(),
    isEnrolled: Joi.boolean()
  });
  return schema.validate(student);
}

exports.Student = Student;
exports.validate = validateData;
const express = require('express')
const mongoose = require('mongoose');
const categories = require('./Routes/categories');
const app = express()


mongoose.connect('mongodb://localhost:27017/LearningPlatform')
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(categories)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

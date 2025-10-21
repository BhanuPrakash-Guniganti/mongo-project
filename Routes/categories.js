const express = require('express');
const router = express.Router();

const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
];

router.get('/categories', (req, res) => {
    res.send(categories);
});

router.post('/categories', (req, res) => {
    const category = {
        id: categories.length + 1,
        name: req.body.name
    }
    categories.push(category);
    res.send(category);  // ✅ changed from req.send(category)
});

router.put('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');   

    //  if (error) return res.status(400).send(error.details[0].message);
    category.name = req.body.name;
    res.send(category);
});

router.delete('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');   

    const index = categories.indexOf(category); 
    categories.splice(index, 1);

    res.send(category);
});

router.get('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');
    res.send(category);  // ✅ fixed from res,send(category)
});

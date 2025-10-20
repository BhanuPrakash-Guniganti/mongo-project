const express = require('express')

const app = express()
app.use(express.json());

const category = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },

]
app.get('/categories', (req, res) => {
    res.send(categories);
});

app.post('/categories', (req, res) => {

    const category = {
        id: categories.length + 1,
        name: req.body.name
    }
    categories.push(category);
    req.send(category);
});

app.put('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');   

  //  if (error) return res.status(400).send(error.details[0].message);
    category.name = req.body.name;
    res.send(category);
});

app.delete('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');   

    const index = categories.indexOf(category); 
    categories.splice(index, 1);

    res.send(category);
});

app.get('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).send('Category not found');
    res,send(category);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
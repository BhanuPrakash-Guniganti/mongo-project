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
*/


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


/*
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

*/

function validateData(category) {
    const schema = Joe.object({
        name: Joe.string().min(3).required()
    });
   // return schema.validate(category);
}



module.exports = router;